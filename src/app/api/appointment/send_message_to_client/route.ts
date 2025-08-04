import { NextResponse } from "next/server";

// -------------services-----------------
import { connectDB } from "../../../../../lib/db";
import AppointmentModel from "../../../../../models/appointmentModel";

export async function POST(req: Request) {
  const { appointmentId, message } = await req.json();

  try {
    await connectDB();

    const appointment = await AppointmentModel.find({ ID: appointmentId });
    if (!appointment) {
      return NextResponse.json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Send the message (implementation depends on your messaging service)
    // await sendMessage(appointment.phoneNo, message);

    return NextResponse.json(
      {
        success: true,
        message: message,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error sending message", error },
      { status: 500 }
    );
  }
}
