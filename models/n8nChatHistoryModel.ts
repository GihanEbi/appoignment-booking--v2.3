import { any } from 'joi';
import mongoose, { Schema, Document } from 'mongoose';

export interface IChatHistory extends Document {
  sessionId: string;
  messages: string;
}
const chatHistorySchema = new Schema<IChatHistory>(
  {
    sessionId: { type: String, required: true, unique: true },
    messages: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.n8n_chat_histories ||
  mongoose.model<IChatHistory>('n8n_chat_histories', chatHistorySchema);
