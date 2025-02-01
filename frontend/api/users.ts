const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getUserById = async (userId: number) => {
  try {
    const res = await fetch(`${API_URL}/users/${userId}/`);

    if (!res.ok) {
      const error = await res.json(); // Read error response
      throw error;
    }

    const data = await res.json();
    // console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
};
