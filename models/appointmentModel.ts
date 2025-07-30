import { appointment_constants } from "@/constants/appointment_constants";
import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  ID: string;
  userId: string;
  customerName: string;
  phoneNo: string;
  service: string;
  appointmentStartTime: string;
  appointmentEndTime: string;
  appointmentStatus: string;
  reminder: boolean;

  //   created user details
  userCreated?: string;
  userModified?: string;
}
const appointmentSchema = new Schema<IAppointment>(
  {
    ID: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    customerName: { type: String, required: false },
    phoneNo: { type: String, required: true },
    service: { type: String, required: false },
    appointmentStartTime: { type: String, required: false },
    appointmentEndTime: { type: String, required: false },
    appointmentStatus: {
      type: String,
      default: appointment_constants.APPOINTMENT_STATUS_OBJECT.pending,
      required: true,
      enum: appointment_constants.APPOINTMENT_STATUS,
    },
    reminder: { type: Boolean, required: true, default: false },

    //   created user details
    userCreated: { type: String, required: false },
    userModified: { type: String, required: false },
  },
  { timestamps: true },
);
export default mongoose.models.appointments ||
  mongoose.model<IAppointment>("appointments", appointmentSchema);
