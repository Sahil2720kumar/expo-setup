import { Order, InsertOrderItem } from "~/types/order";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const insertOrder = async (
  insertedOrderData: {
    order: Pick<Order, 'addressId'>;
    items: InsertOrderItem[];
  },

  userId: string,
  sessionToken: string
) => {
  try {
    console.log('order data', insertedOrderData);

    console.log(userId);
    const res = await fetch(`${API_URL}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionToken!,
      },
      body: JSON.stringify({ ...insertedOrderData }),
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

export const getAllOrders = async (sessionToken: string) => {
  try {
    // console.log('Fetching from:', `${API_URL}/products?page=${page}&pageSize=${pageSize}`);
    const res = await fetch(`${API_URL}/orders/`, {
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


export const getOrderById = async (orderId:number,productId:number,sessionToken: string) => {
  try {
    // console.log('Fetching from:', `${API_URL}/products?page=${page}&pageSize=${pageSize}`);
    const res = await fetch(`${API_URL}/orders/${orderId}/${productId}`, {
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
