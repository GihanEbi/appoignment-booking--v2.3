import React from "react";

type User = {
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

const AppointmentCard = ({ appointment }: { appointment: User }) => {
  return (
    <div>
      <div className="flex flex-col mb-4 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="text-md font-semibold text-gray-800">
            ID: {appointment.ID}
          </div>
          <div className="text-sm bg-blue-500 pb-1 px-2 rounded-lg text-white">
            {appointment.appointmentStatus}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-sm text-gray-600">
            Customer Name: {appointment.customerName}
          </div>
          <p className="text-sm text-gray-600">
            Service: {appointment.service}
          </p>

          <p className="text-sm text-gray-600">
            Start Time:{" "}
            {new Date(appointment.appointmentStartTime).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            End Time:{" "}
            {new Date(appointment.appointmentEndTime).toLocaleString()}
          </p>
        </div>
        <div>
          <button className="mt-4 w-full rounded-lg bg-blue-500 py-2 text-white">
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
