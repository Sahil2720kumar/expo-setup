const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const createPayment = async ( orderId: number,sessionToken: string) => {
  try {
    const res = await fetch(`${API_URL}/payments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionToken!,
      },
      body: JSON.stringify({ orderId }),
    });

    if (!res.ok) {
      const error = await res.json(); // Read error response
      throw error;
    }

    
    const data = await res.json();
    // console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
};
