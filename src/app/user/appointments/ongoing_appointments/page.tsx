"use client";

import AppointmentCard from "@/components/AppointmentCard/AppointmentCard";
import { Loader } from "@/components/Loader/Loader";
import { get_ongoing_appointment_by_user_id } from "@/routes/appointment/appointmentRoutes";
import React, { useEffect } from "react";

type Appointment = {
  ID: string;
  phoneNo: string;
  appointmentStatus: string;
  reminder: boolean;
  userCreated: string;
  appointmentStartTime: string;
  appointmentEndTime: string;
  customerName: string;
  service: string;
};

const page = () => {
  // state for backend data
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  // state for loading
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  //   fetch appointment data from backend
  const fetchAppointments = async () => {
    // -------- prevent multiple loading
    if (loading) return;
    try {
      setLoading(true);
      console.log("Fetching appointments...");

      const data = await get_ongoing_appointment_by_user_id();
      if (data.success) {
        setAppointments(data.data);
        console.log("Appointments fetched successfully:", data.data);

        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateWithTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const getOrdinal = (n: number) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const isPM = hours >= 12;
    hours = hours % 12 || 12;
    const period = isPM ? "PM" : "AM";

    return `${day}${getOrdinal(
      day
    )} ${month} ${year} - ${hours}:${minutes} ${period}`;
  };
  return (
    <div className="h-screen w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
      <div className="flex flex-col items-center min-h-screen">
        {" "}
        {loading && (
          <div className="fixed top-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
            <Loader size={40} className="text-blue-500" />
          </div>
        )}
        <div className="text-lg font-bold">Ongoing Appointments</div>
        {/* <div className="flex-col space-x-4 mt-5 sm:flex-row xs:justify-center"> */}
        <div className="flex justify-center w-full mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4 ml-7">
            {appointments.map((appointment: Appointment, index) => (
              <div key={index} className="">
                <div className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 font-[var(--font-geist-mono)]">
                  {/* <div className="flex flex-col mb-4 rounded-lg border border-gray-200 bg-white p-4"> */}
                  <div className="p-4 md:p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-md font-semibold text-gray-800">
                        ID: {appointment.ID}
                      </div>
                      <div
                        className={`text-sm ${
                          appointment.appointmentStatus === "confirmed"
                            ? "bg-green-500"
                            : appointment.appointmentStatus === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        } pb-1 px-2 rounded-lg text-white`}
                      >
                        {appointment.appointmentStatus}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col ">
                        <div className="text-sm text-gray-600 font-semibold">
                          Customer Name
                        </div>
                        <div className="text-sm text-black font-bold">
                          {appointment.customerName}
                        </div>
                      </div>
                      <div className="flex flex-col ">
                        <div className="text-sm text-gray-600 font-semibold">
                          Service
                        </div>
                        <div className="text-sm text-black font-bold">
                          {appointment.service}
                        </div>
                      </div>
                      <div className="flex flex-col ">
                        <div className="text-sm text-gray-600 font-semibold">
                          Start Time
                        </div>
                        <div className="text-sm text-black font-bold">
                          {formatDateWithTime(appointment.appointmentStartTime)}
                        </div>
                      </div>
                      <div className="flex flex-col ">
                        <div className="text-sm text-gray-600 font-semibold">
                          End Time
                        </div>
                        <div className="text-sm text-black font-bold">
                          {formatDateWithTime(appointment.appointmentEndTime)}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="cursor-pointer mt-8 w-full rounded-lg bg-blue-100 py-2 text-blue-700 font-semibold transition-colors hover:bg-blue-200">
                        Send a message
                      </button>
                      <button className="cursor-pointer mt-2 w-full rounded-lg bg-blue-100 py-2 text-green-700 font-semibold transition-colors hover:bg-blue-200">
                        Complete
                      </button>
                      <button className="cursor-pointer mt-2 w-full rounded-lg bg-blue-100 py-2 text-red-700 font-semibold transition-colors hover:bg-blue-200">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
