"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Loader } from "@/components/Loader/Loader";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const page = () => {
  const router = useRouter();

  // --------- form for user details ----------
  const [form, setForm] = useState({
    detailedDocument: "",
    aboutMyBusiness: "",
    availableTimeSlots: "",
  });
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);
  return (
    <div className="h-auto min-h-screen w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
      {loading && (
        <div className="fixed top-1/2 left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
          <Loader size={40} className="text-blue-500" />
        </div>
      )}
      <div className="mb-5">
        <div></div>
        <div className="text-2xl font-bold text-center text-blue-700">
          Create my details
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <div>
          <div className="flex items-center">
            <div className="font-bold">Name :</div>
            <div className="ml-2">Gihan Piumal</div>
          </div>
          <div className="flex items-center">
            <div className="font-bold">Email :</div>
            <div className="ml-2">gihan@example.com</div>
          </div>
          <div className="flex items-center">
            <div className="font-bold">Phone :</div>
            <div className="ml-2">+94 123 456 789</div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <div>
          <div className="flex items-center">
            <div className="font-bold">Detailed Document :</div>
            <div className="ml-2">Gihan Piumal</div>
          </div>

          <div className="grid w-full gap-2 mt-2">
            <Label htmlFor="message" className="font-bold">
              About my business :
            </Label>
            <Textarea
              className="min-h-48"
              placeholder="Enter details about your business..."
              id="message"
            />
          </div>
          <div className="mt-5">
            <div className="font-bold">Available time slots :</div>
            <div className="bg-blue-100 border-gray-300 p-3 rounded-lg border-1 shadow-sm">
              <div className="flex items-center justify-between mb-2 text-blue-700 cursor-pointer">
                <div className="font-semibold text-blue-700">Monday</div>
                <div className="flex items-center">
                  <PlusIcon className="mr-2 h-4 w-4 text-blue-700" />
                  <span className="hidden md:block">Add Available Time</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="10:30:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
                <div className="font-semibold text-blue-700">To</div>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="00:00:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="10:30:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
                <div className="font-semibold text-blue-700">To</div>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="00:00:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
