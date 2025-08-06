import { NextResponse } from "next/server";

// -------------services-----------------
import { connectDB } from "../../../../../lib/db";
import AppointmentModel from "../../../../../models/appointmentModel";
import n8nChatHistoryModel from "../../../../../models/n8nChatHistoryModel";

export async function POST(req: Request) {
  const { appointmentId, message } = await req.json();

  try {
    await connectDB();

    const appointments = await AppointmentModel.find({ ID: appointmentId });
    const appointment = appointments[0];
    if (!appointment) {
      return NextResponse.json({
        success: false,
        message: "Appointment not found",
      });
    }

    // get data in n8n chat history based on session id
    const chatHistory = await n8nChatHistoryModel.findOne({
      sessionId: appointment.phoneNo,
    });

    // add new data object to n8n chat history message array
    if (chatHistory) {
      chatHistory.messages.push({
        type: "ai",
        data: {
          content: message,
        },
      });
      await chatHistory.save();
    }

    await fetch(
      `https://n8n.srv824466.hstgr.cloud/webhook-test/send-message-to-clinet?phoneNo=${appointment.phoneNo}&message=${message}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
