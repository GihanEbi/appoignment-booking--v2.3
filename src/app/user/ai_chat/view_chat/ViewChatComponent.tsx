"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Loader } from "@/components/Loader/Loader";
import { get_chat_data_using_phone_number } from "@/routes/chat/chatRoutes";
import { AlertDialogDemo } from "@/components/AlertDialog/AlertDialog";
import { send_message_to_client } from "@/routes/appointment/appointmentRoutes";

// -------------types-----------------
type variant = "default" | "destructive";
type Alert = {
  open: boolean;
  message: string;
  description: string;
  variant: variant;
};

const ViewChatComponent = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("phone");
  const appointmentID = searchParams.get("appointmentID");
  // state for backend data
  const [chatData, setChatData] = React.useState<any[]>([]);
  // state for loading
  const [loading, setLoading] = React.useState(false);
  // --------- alert for success and error messages ---------
  const [alert, setAlert] = React.useState<Alert>({
    open: false,
    message: "",
    description: "",
    variant: "default",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchChatHistory();
  }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  const fetchChatHistory = async () => {
    // -------- prevent multiple loading
    if (loading) return;
    try {
      setLoading(true);
      if (!id) {
        setAlert({
          open: true,
          message: "Error",
          description: "No phone number provided in the URL.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      const data = (await get_chat_data_using_phone_number(id)) as any; // Adjust type as necessary
      if (data && data.success) {
        setChatData(data.data.messages || []);
        setLoading(false);
      } else {
        setAlert({
          open: true,
          message: "Error",
          description: "Failed to fetch chat history",
          variant: "destructive",
        });
        setLoading(false);
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Error",
        description: "An error occurred while fetching chat history",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  function extractUserMessage(input: string): string {
    const match = input.match(/User Message:\s*(.+)/);
    return match ? match[1].trim() : "";
  }

  const handleSend = async () => {
    if (!message.trim()) return;
    // -------- prevent multiple submission
    if (loading) return;

    try {
      setLoading(true);
      let data;
      if (!appointmentID) {
        setAlert({
          open: true,
          message: "Error",
          description: "No appointment ID provided.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      data = await send_message_to_client(appointmentID, message);
      if (data && data.success) {
        fetchChatHistory(); // Refresh chat history after sending message
        setLoading(false);
      } else {
        setAlert({
          open: true,
          message: "Error",
          description: "Failed to send message",
          variant: "destructive",
        });
        setLoading(false);
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Error",
        description: "An error occurred while sending the message",
        variant: "destructive",
      });
      return;
    } finally {
      setMessage(""); // Clear the input field after sending
    }
  };

  return (
    <div className="min-h-screen w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
      <div className="flex flex-col items-center">
        {loading && (
          <div className="fixed top-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
            <Loader size={40} className="text-blue-500" />
          </div>
        )}
        <div className="flex flex-col w-full items-center mb-5">
          <div className="text-2xl font-bold text-blue-700">
            Chat History - {id}
          </div>
        </div>
        {chatData && chatData.length > 0 ? (
          <div className="w-full flex flex-col space-y-2 px-4">
            {chatData.map((chat, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-3 rounded-lg ${
                  chat.type === "human"
                    ? "self-start bg-blue-100 text-left"
                    : "self-end bg-green-100 text-right"
                }`}
              >
                <div className="font-bold mb-1">
                  {chat.type === "human" ? "Client:" : chat.type}
                </div>
                <div className="whitespace-pre-wrap">
                  {chat.type === "human"
                    ? extractUserMessage(chat.data.content)
                    : chat.data.content}
                </div>
              </div>
            ))}

            {/* Input area */}
            {appointmentID && (
              <div className="border-t px-4 py-3 bg-white flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500 text-center">
            No chat history available.
          </div>
        )}
        {/* 🔽 Scroll Target */}
        <div ref={bottomRef} />
      </div>
      <AlertDialogDemo
        isOpen={alert.open}
        title={alert.message}
        description={alert.description}
        variant={alert.variant}
        handleCancel={() => {
          setAlert({ ...alert, open: false });
        }}
      />
    </div>
  );
};

export default ViewChatComponent;
