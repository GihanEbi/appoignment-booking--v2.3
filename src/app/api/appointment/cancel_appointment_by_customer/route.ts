import { NextResponse } from "next/server";

// -------------services-----------------
import { connectDB } from "../../../../../lib/db";
import AppointmentModel from "../../../../../models/appointmentModel";
import { appointment_constants } from "@/constants/appointment_constants";
import allAppointmentModel from "../../../../../models/allAppointmentModel";

export async function POST(req: Request) {
  const { phoneNo } = await req.json();

  //   no token authentication
  // appointment will created by webhook in n8n

  //   --------- connect to database -----------
  await connectDB();

  // ------------ Check if phone number is provided -----------
  if (!phoneNo || phoneNo.trim() === "") {
    return NextResponse.json(
      { success: false, message: "Phone number is required" },
      { status: 400 }
    );
  }

  // ------------ Check if appointment exists -----------
  const appointment = await AppointmentModel.find({ phoneNo: phoneNo });
  if (!appointment || appointment.length === 0) {
    return NextResponse.json(
      { success: false, message: "Appointment not found" },
      { status: 404 }
    );
  }

  try {
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
        appointment_constants.APPOINTMENT_STATUS_OBJECT.cancelled_by_user,
      reminder: appointment[0].reminder,
      userCreated: appointment[0].userCreated,
      userModified: appointment[0].userModified,
    });
    await allAppointment.save();
    // ------------ Delete appointment from AppointmentModel -----------
    await AppointmentModel.deleteOne({ phoneNo: phoneNo });

    return NextResponse.json(
      {
        success: true,
        message: "Appointment cancelled successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error updating appointment status", error },
      { status: 500 }
    );
  }
}
