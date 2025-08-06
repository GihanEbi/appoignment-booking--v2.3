import { getToken } from "@/utils/auth-utils";

const commonUrl = "/api/chat";
type params = {
  pageNo: number;
  pageSize: number;
};
type searchValue = string | undefined;

export async function get_chat_data_using_phone_number(
  searchValue: searchValue
) {
  try {
    const res = await fetch(`${commonUrl}/get_chat_data_using_phone_number`, {
      method: "POST",
      body: JSON.stringify({ phoneNumber: searchValue }),
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

export async function get_all_chat_numbers(
  params: params,
  searchValue: searchValue
) {
  const queryParams = new URLSearchParams({
    pageNo: params.pageNo.toString(),
    pageSize: params.pageSize.toString(),
  });

  try {
    const res = await fetch(
      `${commonUrl}/get_all_chat_numbers?${queryParams.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${getToken()}`, // Uncomment if you need to send a token
        },
        body: JSON.stringify({ searchValue }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
