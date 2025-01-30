const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getAllProducts = async (page = 1, pageSize = 6) => {
  try {
    // console.log('Fetching from:', `${API_URL}/products?page=${page}&pageSize=${pageSize}`);
    const res = await fetch(`${API_URL}/products?page=${page}&pageSize=${pageSize}`);

    if (!res.ok) {
      const errorText = await res.text(); // Get the error message from the response
      throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
};


export const getProductById = async (productId:number) => {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`);

    if (!res.ok) {
      const errorText = await res.text(); // Get the error message from the response
      throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
};
