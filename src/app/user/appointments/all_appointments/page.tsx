"use client";

import AppointmentCard from "@/components/AppointmentCard/AppointmentCard";
import { Loader } from "@/components/Loader/Loader";
import { get_appointment_by_user_id } from "@/routes/appointment/appointmentRoutes";
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

      const data = await get_appointment_by_user_id();
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
    <div className="flex flex-col items-center h-screen">
      {" "}
      {loading && (
        <div className="fixed top-1/2 left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
          <Loader size={40} className="text-blue-500" />
        </div>
      )}
      <div className="text-lg font-bold">All Appointments</div>
      <div className="flex-col space-x-4 mt-5 sm:flex-row xs:justify-center">
        {appointments.map((appointment, index) => (
          <div key={index} className="w-full max-w-md">
            <AppointmentCard appointment={appointment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
