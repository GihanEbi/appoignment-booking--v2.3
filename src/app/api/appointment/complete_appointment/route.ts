// -------------services-----------------
import { CheckUserAccess } from "@/services/auth-services/auth-service";
import { connectDB } from "../../../../../lib/db";
import appointmentModel from "../../../../../models/appointmentModel";
import { access_levels } from "@/constants/access_constants";
import { NextResponse } from "next/server";
import { appointment_constants } from "@/constants/appointment_constants";
import allAppointmentModel from "../../../../../models/allAppointmentModel";

type isValidTokenTypes = {
  success: boolean;
  access: string;
  status?: number;
  // Optional userId if needed for further processing
  userId?: string;
};

export async function POST(req: Request) {
  //   --------- Appointment values ----------
  const { searchParams } = new URL(req.url);
  const appointmentID = Number(searchParams.get("appointmentID"));

  // ------------ Check if appointmentID is provided -----------
  if (!appointmentID || isNaN(appointmentID)) {
    return NextResponse.json(
      { success: false, message: "Appointment ID is required" },
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
    access_levels.CompleteAppointment
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
    // check if appointment exists
    const appointment = await appointmentModel.find({ ID: appointmentID });
    if (!appointment) {
      return NextResponse.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    }

    // check if appointmentStatus is in Confirmed
    if (
      appointment[0].appointmentStatus !==
      appointment_constants.APPOINTMENT_STATUS_OBJECT.confirmed
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment cannot be completed as it is not confirmed",
        },
        { status: 400 }
      );
    }

    // update appointment status to completed
    //   ------------ create new appointment record in allAppointmentModel -----------
    const allAppointment = new allAppointmentModel({
      ID: appointment[0].ID,
      userId: appointment[0].userId,
      customerName: appointment[0].customerName,
      phoneNo: appointment[0].phoneNo,
      service: appointment[0].service,
      appointmentStartTime: appointment[0].appointmentStartTime,
      appointmentEndTime: appointment[0].appointmentEndTime,
      appointmentStatus:
        appointment_constants.APPOINTMENT_STATUS_OBJECT.completed,
      reminder: appointment[0].reminder,
      userCreated: appointment[0].userCreated,
      userModified: appointment[0].userModified,
    });
    await allAppointment.save();
    // ------------ Delete appointment from AppointmentModel -----------
    await appointmentModel.deleteOne({ ID: appointmentID });
    return NextResponse.json(
      {
        success: true,
        message: "Appointment completed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error completing appointment", error },
      { status: 500 }
    );
  }
}
