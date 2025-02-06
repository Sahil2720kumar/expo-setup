const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const insertContact = async (
  formData: FormData, // Accept FormData instead of plain object
) => {
  try {
    // console.log(formData);
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      body: formData,
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
