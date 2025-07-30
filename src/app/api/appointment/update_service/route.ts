import { NextResponse } from "next/server";

// -------------services-----------------
import { connectDB } from "../../../../../lib/db";
import AppointmentModel from "../../../../../models/appointmentModel";
import { appointment_constants } from "@/constants/appointment_constants";
import n8nChatHistoryModel from "../../../../../models/n8nChatHistoryModel";

export async function POST(req: Request) {
  const { phoneNo, service } = await req.json();

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

  // ------------ Update service -----------
  appointment[0].service = service;
  appointment[0].appointmentStatus =
    appointment_constants.APPOINTMENT_STATUS_OBJECT.confirmed;

  try {
    await appointment[0].save();
    //  delete the n8n_chat_history
    await n8nChatHistoryModel.deleteOne({ sessionId: phoneNo });
    return NextResponse.json(
      {
        success: true,
        message: "Service updated successfully",
        data: appointment,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error updating service", error },
      { status: 500 }
    );
  }
}
