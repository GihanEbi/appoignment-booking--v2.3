import { getToken } from "@/utils/auth-utils";

const commonUrl = "/api/appointment";

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

export async function get_appointment_by_user_id() {
  try {
    const res = await fetch(`${commonUrl}/get_appointment_by_user_id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${getToken()}`, // Uncomment if you need to send a token
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
