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
    <div className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 font-[var(--font-geist-mono)]">
      {/* <div className="flex flex-col mb-4 rounded-lg border border-gray-200 bg-white p-4"> */}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-6">
          <div className="text-md font-semibold text-gray-800">
            ID: {appointment.ID}
          </div>
          <div className={`text-sm ${appointment.appointmentStatus === "confirmed" ? "bg-green-500" : appointment.appointmentStatus === "pending" ? "bg-yellow-500" : "bg-red-500"} pb-1 px-2 rounded-lg text-white`}>
            {appointment.appointmentStatus}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-gray-600 font-semibold">
            Customer Name:{" "}
            <span className="text-sm text-black font-normal">
              {appointment.customerName}
            </span>
          </div>
          <p className="text-sm text-gray-600 font-semibold">
            Service:{" "}
            <span className="text-sm text-black font-normal">
              {appointment.service}
            </span>
          </p>

          <p className="text-sm text-gray-600 font-semibold">
            Start Time:{" "}
            {/* {new Date(appointment.appointmentStartTime).toLocaleString()} */}
            <span className="text-sm text-black font-normal">
              {formatDateWithTime(appointment.appointmentStartTime)}
            </span>
          </p>
          <p className="text-sm text-gray-600 font-semibold">
            End Time:{" "}
            {/* {new Date(appointment.appointmentEndTime).toLocaleString()} */}
            <span className="text-sm text-black font-normal">
              {formatDateWithTime(appointment.appointmentEndTime)}
            </span>
          </p>
        </div>
        <div>
          <button className="cursor-pointer mt-8 w-full rounded-lg bg-blue-100 py-2 text-blue-700 font-semibold transition-colors hover:bg-blue-200">
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
