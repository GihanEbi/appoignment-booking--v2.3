import { NextResponse } from "next/server";

// -------------services-----------------
import { connectDB } from "../../../../../lib/db";
import AppointmentModel from "../../../../../models/appointmentModel";

export async function POST(req: Request) {
  const { phoneNo } = await req.json();

  //   no token authentication
  // appointment will created by webhook in n8n
  //   --------- connect to database -----------
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
      { success: true, message: "No appointment in this number" },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "Appointment found",
      },
      { status: 400 },
    );
  }
}
