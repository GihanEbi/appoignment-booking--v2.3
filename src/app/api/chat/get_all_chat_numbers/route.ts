// -------------services-----------------
import { CheckUserAccess } from "@/services/auth-services/auth-service";
import { connectDB } from "../../../../../lib/db";
import { access_levels } from "@/constants/access_constants";
import { NextResponse } from "next/server";
import n8nChatHistoryModel from "../../../../../models/n8nChatHistoryModel";

type isValidTokenTypes = {
  success: boolean;
  access: string;
  status?: number;
  // Optional userId if needed for further processing
  userId?: string;
};

export async function POST(req: Request) {
  // --------- search value ----------
  const { searchValue } = await req.json();
  //   --------- params data ----------
  const { searchParams } = new URL(req.url);
  const pageNo = Number(searchParams.get("pageNo"));
  const pageSize = Number(searchParams.get("pageSize"));
  // ----------- check if the token provided in headers -----------
  const tokenString = req.headers.get("token");
  if (!tokenString) {
    return NextResponse.json(
      { success: false, message: "Token is required" },
      { status: 401 }
    );
  }
  const checkResult = await CheckUserAccess(
    tokenString,
    access_levels.GetChatHistory
  );
  const isValidToken: isValidTokenTypes = {
    success: checkResult.success,
    access: checkResult.access ?? "",
    userId: checkResult.userId,
  };

  if (!isValidToken.success) {
    return NextResponse.json(
      { success: isValidToken.success, message: "Unauthorized" },
      { status: 403 }
    );
  }

  //   --------- connect to database -----------
  await connectDB();

  // ------------ pagination values -----------
  let skip = 0;
  let limit = 0;
  if (pageNo && pageSize) {
    skip = (pageNo - 1) * pageSize;
    limit = pageSize;
  }
  try {
    const chatNumbers = await n8nChatHistoryModel.aggregate([
      // -------- search value ------
      {
        $match: {
          ...(searchValue !== "" && {
            $or: [
              {
                sessionId: {
                  $regex: new RegExp(searchValue, "i"),
                },
              },
            ],
          }),
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            {
              $project: {
                _id: 0,
                sessionId: 1,
              },
            },
            {
              $sort: {
                createdAt: -1 as -1 | 1, // or 1 for ascending
              },
            },
            { $skip: skip },
            { $limit: limit },
          ],
        },
      },
    ]);

    //  --------- return when pagination values are provided ---------
    if (pageNo && pageSize) {
      let response = {
        details: chatNumbers[0].data,
        noOfPages: Math.ceil(
          chatNumbers[0].metadata.length !== 0
            ? chatNumbers[0].metadata[0].total / pageSize
            : 0
        ),
        noOfRecords:
          chatNumbers[0].metadata.length !== 0
            ? chatNumbers[0].metadata[0].total
            : 0,
      };
      return Response.json(
        {
          success: true,
          message: "Chat numbers data successfully fetched",
          response,
        },
        { status: 200 }
      );
    } else {
      //  --------- return when pagination values are not provided ---------
      return Response.json(
        {
          success: true,
          message: "Chat numbers data successfully fetched",
          Details: chatNumbers[0].data,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching chat numbers:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
