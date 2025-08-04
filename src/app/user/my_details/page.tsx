'use client'

import React from "react";
import { FolderEditIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const availableTimeSlots = [
  {
    date: "Monday",
    timeSlots: [
      { time: "9:00 AM - 12:00 PM" },
      { time: "1:00 PM - 3:00 PM" },
      { time: "3:30 PM - 5:00 PM" },
    ],
  },
  {
    date: "Tuesday",
    timeSlots: [
      { time: "9:00 AM - 12:00 PM" },
      { time: "1:00 PM - 3:00 PM" },
      { time: "3:30 PM - 5:00 PM" },
    ],
  },
  {
    date: "Wednesday",
    timeSlots: [
      { time: "9:00 AM - 12:00 PM" },
      { time: "1:00 PM - 3:00 PM" },
      { time: "3:30 PM - 5:00 PM" },
    ],
  },
  {
    date: "Thursday",
    timeSlots: [
      { time: "9:00 AM - 12:00 PM" },
      { time: "1:00 PM - 3:00 PM" },
      { time: "3:30 PM - 5:00 PM" },
    ],
  },
  {
    date: "Friday",
    timeSlots: [
      { time: "9:00 AM - 12:00 PM" },
      { time: "1:00 PM - 3:00 PM" },
      { time: "3:30 PM - 5:00 PM" },
    ],
  },
  {
    date: "Saturday",
    timeSlots: [{ time: "9:00 AM - 12:00 PM" }],
  },
];

const page = () => {
  const router = useRouter();

  return (
    <div className="h-auto min-h-screen w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
      <div className="flex items-center justify-between mb-5">
        <div></div>
        <div className="text-2xl font-bold text-center text-blue-700">
          My Details
        </div>
        <div
          className="flex text-blue-700 cursor-pointer"
          onClick={() => {
            router.push("/user/my_details/create_edit_my_details");
          }}
        >
          <div className="font-bold">
            <FolderEditIcon />
          </div>
          <div className="ml-2">Edit</div>
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
          <div className="flex items-center">
            <div className="font-bold">Detail Document :</div>
            <div className="ml-2 text-blue-700 cursor-pointer">
              Business Doc
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 items-center">
          <div className="font-bold">About my Business</div>
          <div className="ml-2 mt-5 border-1 shadow-sm p-3 rounded-lg text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            necessitatibus ea totam. Exercitationem, ipsa neque sequi, similique
            magnam nostrum sapiente laborum veniam quae a velit! Dicta, placeat.
            Laborum, nostrum quo. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quasi necessitatibus ea totam. Exercitationem,
            ipsa neque sequi, similique magnam nostrum sapiente laborum veniam
            quae a velit! Dicta, placeat. Laborum, nostrum quo. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quasi necessitatibus ea
            totam. Exercitationem, ipsa neque sequi, similique magnam nostrum
            sapiente laborum veniam quae a velit! Dicta, placeat. Laborum,
            nostrum quo. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quasi necessitatibus ea totam. Exercitationem, ipsa neque
            sequi, similique magnam nostrum sapiente laborum veniam quae a
            velit! Dicta, placeat. Laborum, nostrum quo. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quasi necessitatibus ea totam.
            Exercitationem, ipsa neque sequi, similique magnam nostrum sapiente
            laborum veniam quae a velit! Dicta, placeat. Laborum, nostrum quo.
          </div>
        </div>
        <div className="mt-5">
          <div className="font-bold text-center">Available Time Slots</div>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {availableTimeSlots.map((day, index) => (
              <div
                key={index}
                className="bg-blue-100 border-gray-300 p-3 rounded-lg border-1 shadow-sm"
              >
                <div className="font-semibold text-blue-700">{day.date}</div>
                <ul className="list-disc ml-5 text-gray-800">
                  {day.timeSlots.map((slot, slotIndex) => (
                    <li key={slotIndex}>{slot.time}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
