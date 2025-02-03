import useAuthStore from "~/store/authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getUserById = async (userId: string,sessionToken:string) => {
  try {
    const res = await fetch(`${API_URL}/users/${userId}/`, {
      method: 'GET',
      headers: {
        'Authorization':sessionToken!
      },
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


export const updateUser = async (updatedUser:{profileImg?:string| null,name:string,phone:string},userId: string,sessionToken:string) => {
  try {
    const res = await fetch(`${API_URL}/users/${userId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':sessionToken!
      },
      body: JSON.stringify({ ...updatedUser }),
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
