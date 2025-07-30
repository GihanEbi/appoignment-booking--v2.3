import { NextResponse } from "next/server";

// -------------services-----------------
import { connectDB } from "../../../../../lib/db";
import AppointmentModel from "../../../../../models/appointmentModel";

export async function POST(req: Request) {
  const { phoneNo, appointmentStartTime, appointmentEndTime } = await req.json();

  //   no token authentication
  // appointment will created by webhook in n8n

  //   --------- connect to database ---------
  await connectDB();

  // ------------ Check if phoneNo is provided -----------
  if (!phoneNo || phoneNo.trim() === "") {
    return NextResponse.json(
      { success: false, message: "Phone number is required" },
      { status: 400 },
    );
  }

  // ------------ Check if appointment exists -----------
  const appointment = await AppointmentModel.find({ phoneNo: phoneNo });
  if (!appointment || appointment.length === 0) {
    return NextResponse.json(
      { success: false, message: "Appointment not found" },
      { status: 404 },
    );
  }

  // ------------ Update date and time -----------
  appointment[0].appointmentStartTime = appointmentStartTime;
  appointment[0].appointmentEndTime = appointmentEndTime;

  try {
    await appointment[0].save();
    return NextResponse.json(
      {
        success: true,
        message: "Date and time updated successfully",
        data: appointment,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error updating date and time", error },
      { status: 500 },
    );
  }
}
