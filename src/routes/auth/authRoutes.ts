import { getToken } from '@/utils/auth-utils';

const commonUrl = '/api/auth';

type SignUp = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
};

export async function signup_user(userData: SignUp) {
  try {
    const res = await fetch(`${commonUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // token: `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

type SignIn = {
  email: string;
  password: string;
};

export async function sign_in_user(userData: SignIn) {
  try {
    const res = await fetch(`${commonUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // token: `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
