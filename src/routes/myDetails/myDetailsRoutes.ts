import { getToken } from "@/utils/auth-utils";

const commonUrl = "/api/my_details";

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

export async function update_my_details(details: myDetails) {
  try {
    const res = await fetch(`${commonUrl}/update_my_details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(details),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function get_my_details() {
  try {
    const res = await fetch(`${commonUrl}/get_my_details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${getToken()}`, // Uncomment if you need to send a token
      },
    });
    const data = await res.json();
    return data as myDetails;
  } catch (error) {
    return error;
  }
}
