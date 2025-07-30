// -------------services-----------------
import { CheckUserAccess } from "@/services/auth-services/auth-service";
import { connectDB } from "../../../../../lib/db";
import { NextResponse } from "next/server";
import AppointmentModel from "../../../../../models/appointmentModel";

export async function POST(req: Request) {
  const { phoneNo } = await req.json();

  //   no token authentication
  // appointment will checked by webhook in n8n
  //   --------- connect to database -----------
  await connectDB();
  // ------------ Check if phoneNo is provided -----------
  if (!phoneNo || phoneNo.trim() === "") {
    return NextResponse.json(
      { success: false, message: "Phone number is required" },
      { status: 400 }
    );
  }
  // ------------ Check if appointment exists -----------
  const appointment = await AppointmentModel.find({ phoneNo: phoneNo });
  // if appointment available
  // return appointment data
  if (appointment && appointment.length > 0) {
    return NextResponse.json({ data: appointment[0] }, { status: 200 });
  } else {
    return NextResponse.json(
      {
        data: "No ongoing appointment found for this phone number",
      },
      { status: 200 }
    );
  }
}
