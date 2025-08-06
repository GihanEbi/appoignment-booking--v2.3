import mongoose, { Schema, Document } from "mongoose";

type data = {
  content: string;
};

type message = {
  type: string;
  data: data;
};

export interface IChatHistory extends Document {
  sessionId: string;
  messages: message[];
}
const chatHistorySchema = new Schema<IChatHistory>(
  {
    sessionId: { type: String, required: true, unique: true },
    messages: [
      {
        type: { type: String, required: true },
        data: {
          content: { type: String, required: true },
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.n8n_chat_histories ||
  mongoose.model<IChatHistory>("n8n_chat_histories", chatHistorySchema);
