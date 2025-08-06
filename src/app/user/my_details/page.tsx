"use client";

import React, { useEffect } from "react";
import { FolderEditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { get_my_details } from "@/routes/myDetails/myDetailsRoutes";
import { Loader } from "@/components/Loader/Loader";

type availableTimeSlot = {
  startTime: string;
  endTime: string;
};

type timeSlots = {
  date: string;
  availableTime: availableTimeSlot[];
};

type myDetails = {
  ID: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  password: string;
  isActive?: boolean;
  userGroupId: string;
  aboutBusiness?: string;
  detailsDocumentUrl?: string;
  timeSlots?: timeSlots[];
};
type MyDetailsResponse = {
  success: boolean;
  message: string;
  user: myDetails[];
};

const baseUrl = process.env.CLIENT_URL || "http://localhost:3000";

const page = () => {
  const router = useRouter();
  // state for backend data
  const [myDetails, setMyDetails] = React.useState<myDetails | null>(null);
  // state for loading
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetchMyDetails();
  }, []);

  //   fetch my data from backend
  const fetchMyDetails = async () => {
    // -------- prevent multiple loading
    if (loading) return;
    try {
      setLoading(true);
      const data = (await get_my_details()) as MyDetailsResponse;
      if (data && data.success) {
        setMyDetails(data.user[0]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching my details:", error);
    } finally {
      setLoading(false);
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
        <div className="flex w-full items-center justify-between mb-5">
          <div></div>
          <div className="text-2xl font-bold text-blue-700">My Details</div>
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
        </div>{" "}
        <div className="mt-5 flex flex-col">
          <div>
            <div className="flex items-center">
              <div className="font-bold">Name :</div>
              <div className="ml-2">
                {myDetails?.firstName + " " + myDetails?.lastName}
              </div>
            </div>
            <div className="flex items-center">
              <div className="font-bold">Email :</div>
              <div className="ml-2">{myDetails?.email}</div>
            </div>
            <div className="flex items-center">
              <div className="font-bold">Phone :</div>
              <div className="ml-2">{myDetails?.phoneNo}</div>
            </div>
            <div className="flex items-center">
              <div className="font-bold">Detail Document :</div>
              <div className="ml-2 text-blue-700 cursor-pointer">
                {myDetails?.detailsDocumentUrl ? (
                  <a
                    onClick={() =>
                      window.open(
                        baseUrl + myDetails.detailsDocumentUrl,
                        "_blank"
                      )
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Business Doc
                  </a>
                ) : (
                  "No Document Available"
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 items-center">
            <div className="font-bold">About my Business</div>
            <div className="ml-2 mt-5 border-1 shadow-sm p-3 rounded-lg text-justify">
              {myDetails?.aboutBusiness
                ? myDetails.aboutBusiness
                : "No information available."}
            </div>
          </div>
          <div className="mt-5">
            <div className="font-bold text-center">Available Time Slots</div>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {myDetails
                ? myDetails.timeSlots?.map((tSlot, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 border-gray-300 p-3 rounded-lg border-1 shadow-sm"
                    >
                      <div className="font-semibold text-blue-700">
                        {tSlot.date}
                      </div>
                      <ul className="list-disc ml-5 text-gray-800">
                        {tSlot.availableTime
                          ? tSlot.availableTime.map((slot, slotIndex) => (
                              <li key={slotIndex}>
                                {slot.startTime} - {slot.endTime}
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
