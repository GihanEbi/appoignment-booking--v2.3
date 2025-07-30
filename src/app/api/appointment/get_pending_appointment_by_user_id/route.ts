// -------------services-----------------
import { CheckUserAccess } from "@/services/auth-services/auth-service";
import { connectDB } from "../../../../../lib/db";
import appointmentModel from "../../../../../models/appointmentModel";
import { access_levels } from "@/constants/access_constants";
import { NextResponse } from "next/server";
import { appointment_constants } from "@/constants/appointment_constants";

type isValidTokenTypes = {
  success: boolean;
  access: string;
  status?: number;
  // Optional userId if needed for further processing
  userId?: string;
};

export async function GET(req: Request) {
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
    access_levels.GetAppointmentByUserId
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

  // Get userId from token
  const userId = isValidToken.userId;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const appointments = await appointmentModel.find({
      userId: userId,
      appointmentStatus:
        appointment_constants.APPOINTMENT_STATUS_OBJECT.pending,
    });

    return NextResponse.json({
      success: true,
      data: appointments,
      message: "Appointments retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error retrieving appointments", error },
      { status: 500 }
    );
  }
}
