import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import UserModel from "../../../../../models/UserModel";
import { CheckUserAccess } from "@/services/auth-services/auth-service";
import { access_levels } from "@/constants/access_constants";

type isValidTokenTypes = {
  success: boolean;
  access: string;
  status?: number;
  // Optional userId if needed for further processing
  userId?: string;
};

export async function POST(req: Request) {
  const { aboutBusiness, timeSlots, detailsDocumentUrl } = await req.json();

  // ----------- check if the token provided in headers -----------
  const tokenString = req.headers.get("token");
  if (!tokenString) {
    return NextResponse.json(
      { success: false, message: "Token is required" },
      { status: 401 }
    );
  }
  const checkResult = await CheckUserAccess(tokenString, access_levels.AddUser);
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

  //   check the user is already exists
  const existingUser = await UserModel.findOne({ ID: isValidToken.userId });
  if (!existingUser) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  try {
    // find and update the user details
    existingUser.aboutBusiness = aboutBusiness;
    existingUser.timeSlots = timeSlots;
    existingUser.detailsDocumentUrl = detailsDocumentUrl;
    await existingUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user: existingUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error updating user" },
      { status: 500 }
    );
  }
}
