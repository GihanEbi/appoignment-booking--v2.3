"use client";

import AppointmentCard from "@/components/AppointmentCard/AppointmentCard";
import { Loader } from "@/components/Loader/Loader";
import { get_cancelled_appointment_by_user_id } from "@/routes/appointment/appointmentRoutes";
import React, { useEffect } from "react";

const page = () => {
  // state for backend data
  const [appointments, setAppointments] = React.useState([]);
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

      const data = await get_cancelled_appointment_by_user_id();
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
  return (
    <div className="h-screen w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
      <div className="flex flex-col items-center min-h-screen">
        {" "}
        {loading && (
          <div className="fixed top-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
            <Loader size={40} className="text-blue-500" />
          </div>
        )}
        <div className="text-lg font-bold">Cancelled Appointments</div>
        {/* <div className="flex-col space-x-4 mt-5 sm:flex-row xs:justify-center"> */}
        <div className="flex justify-center w-full mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4 ml-7">
            {appointments.map((appointment, index) => (
              <div key={index} className="">
                <AppointmentCard appointment={appointment} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
