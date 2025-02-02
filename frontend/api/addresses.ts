import useAuthStore from '~/store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getAddresses = async (userId: string, sessionToken: string) => {
  try {
    console.log(userId);
    
    const res = await fetch(`${API_URL}/users/${userId}/addresses/`, {
      method: 'GET',
      headers: {
        Authorization: sessionToken!,
      },
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

export const getAddressById = async (userId: string, addressId: number, sessionToken: string) => {
  try {
    console.log(userId);
    
    const res = await fetch(`${API_URL}/users/${userId}/addresses/${addressId}/`, {
      method: 'GET',
      headers: {
        Authorization: sessionToken!,
      },
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

export const insertAddress = async (
  insertedAddressData: {
    state: string;
    city: string;
    street: string;
    zip: string;
  },
  userId: string,
  sessionToken: string
) => {
  try {
    console.log(insertedAddressData);
    console.log(userId);
    const res = await fetch(`${API_URL}/users/${userId}/addresses/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionToken!,
      },
      body: JSON.stringify({ ...insertedAddressData }),
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


export const updateAddress = async (
  updatedAddressData: {
    state: string;
    city: string;
    street: string;
    zip: string;
  },
  userId: string,
  addressId:number,
  sessionToken: string
) => {
  try {
    console.log("uodatedAddresss: ",updatedAddressData);
    console.log(userId);
    const res = await fetch(`${API_URL}/users/${userId}/addresses/${addressId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionToken!,
      },
      body: JSON.stringify({ ...updatedAddressData }),
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
