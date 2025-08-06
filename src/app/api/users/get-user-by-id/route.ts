// -------------services-----------------
import { CheckUserAccess } from "@/services/auth-services/auth-service";
import { connectDB } from "../../../../../lib/db";
import UserModel from "../../../../../models/UserModel";
import { NextResponse } from "next/server";
import { access_levels } from "@/constants/access_constants";

type isValidTokenTypes = {
  success: boolean;
  access: string;
  status?: number;
  // Optional userId if needed for further processing
  userId?: string;
};

export async function POST(req: Request) {
    // --------- search value ----------
  //   --------- pagination values ----------
  const { searchParams } = new URL(req.url);
  const userID = String(searchParams.get("userID"));
  

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
    access_levels.GetUsers
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
    // Fetch user by ID
    const user = await UserModel.find({ ID: userID }).select(
      "-password -__v"
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User fetched successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching user" },
      { status: 500 }
    );
  }
}
