import { getToken } from '@/utils/auth-utils';

const commonUrl = '/api/users';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
};

// export async function get_users(params: params, searchValue: searchValue) {
//   const queryParams = new URLSearchParams({
//     pageNo: params.pageNo.toString(),
//     pageSize: params.pageSize.toString(),
//   });

//   try {
//     const res = await fetch(
//       `${commonUrl}/get-users?${queryParams.toString()}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           token: `${getToken()}`, // Uncomment if you need to send a token
//         },
//         body: JSON.stringify({ searchValue }),
//       },
//     );
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     return error;
//   }
// }

export async function create_user(userData: User) {
  try {
    const res = await fetch(`${commonUrl}/add-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
