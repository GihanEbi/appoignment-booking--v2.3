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
  const { phoneNumber } = await req.json();

  // check if phoneNumber is provided
  if (!phoneNumber) {
    return NextResponse.json(
      { success: false, message: "Phone number is required" },
      { status: 400 }
    );
  }

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

  try {
    // check if user exists with the provided phone number
    const chatHistory = await n8nChatHistoryModel.findOne({
      sessionId: phoneNumber,
    });
    if (!chatHistory) {
      return NextResponse.json(
        {
          success: false,
          message: "No chat history found for this phone number",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: chatHistory,
    });
  } catch (error) {
    console.error("Error fetching chat data:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
