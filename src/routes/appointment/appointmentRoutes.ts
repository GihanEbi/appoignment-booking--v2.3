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

export async function get_ongoing_appointment_by_user_id() {
  try {
    const res = await fetch(`${commonUrl}/get_ongoing_appointment_by_user_id`, {
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

export async function get_cancelled_appointment_by_user_id() {
  try {
    const res = await fetch(
      `${commonUrl}/get_cancelled_appointment_by_user_id`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `${getToken()}`, // Uncomment if you need to send a token
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function get_completed_appointment_by_user_id() {
  try {
    const res = await fetch(
      `${commonUrl}/get_completed_appointment_by_user_id`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `${getToken()}`, // Uncomment if you need to send a token
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function get_pending_appointment_by_user_id() {
  try {
    const res = await fetch(`${commonUrl}/get_pending_appointment_by_user_id`, {
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

//  send message to client
export async function send_message_to_client(
  appointmentId: string,
  message: string
) {
  try {
    const res = await fetch(`${commonUrl}/send_message_to_client`, {
      method: "POST",
      body: JSON.stringify({ appointmentId, message }),
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
