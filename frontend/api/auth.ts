const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const signInUser = async ({ email, password }: { email: string; password: string }) => {
  try {
    console.log('Attempting login:', email, password);

    const res = await fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json(); // Read error response
      throw error;
    }

    const data = await res.json();
    console.log('Fetched data:', data);

    if (!data || !data.user || !data.token) {
      throw new Error('Invalid response from server');
    }

    return data;
  } catch (error) {
    // console.error('Fetch failed:', error);
    throw error;
  }
}; 

export const signUpUser = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    console.log('Attempting signUp:',firstName,lastName, email, password);

    const res = await fetch(`${API_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name:`${firstName} ${lastName}`, email, password }),
    });

    if (!res.ok) {
      const error = await res.json(); // Read error response
      throw error;
    }

    const data = await res.json();
    console.log('Fetched data:', data);

    return data;
  } catch (error) {
     console.error('Fetch failed:', error);
    throw error;
  }
};
