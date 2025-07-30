import { NextResponse } from "next/server";

// -------------services-----------------
import { connectDB } from "../../../../../lib/db";
import AppointmentModel from "../../../../../models/appointmentModel";
import { appointment_constants } from "@/constants/appointment_constants";

export async function POST(req: Request) {
  const { phoneNo, customer_name } = await req.json();

  //   no token authentication
  // appointment will created by webhook in n8n

  //   --------- connect to database -----------
  await connectDB();

  // ------------ Check if phone number is provided -----------
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

  // ------------ Update customer name -----------
  appointment[0].customerName = customer_name;

  try {
    await appointment[0].save();
    return NextResponse.json(
      {
        success: true,
        message: "Customer name updated successfully",
        data: appointment,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error updating customer name", error },
      { status: 500 },
    );
  }
}
