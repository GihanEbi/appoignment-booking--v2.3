import mongoose, { Schema, Document } from "mongoose";

type availableTimeSlot = {
  startTime: string;
  endTime: string;
};

type timeSlots = {
  date: string;
  availableTime: availableTimeSlot[];
};

export interface IUser extends Document {
  ID: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  password: string;
  isActive?: boolean;
  userGroupId: string;
  aboutBusiness?: string;
  detailsDocumentUrl?: string;
  timeSlots?: timeSlots[];
}

const userSchema = new Schema<IUser>(
  {
    ID: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phoneNo: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    userGroupId: { type: String, required: true },
    aboutBusiness: { type: String, default: "" },
    detailsDocumentUrl: { type: String, default: "" },
    timeSlots: { type: [Object], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
