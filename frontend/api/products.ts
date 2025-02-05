const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getAllProducts = async (page = 1, pageSize = 6, filterOptions = {}) => {
  try {
    // Initialize query parameters with pagination
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    console.log(filterOptions);
    

    // Append filter options if they exist
    if (filterOptions) {
      if (filterOptions.categories && filterOptions.categories.length > 0) {
        queryParams.append('categories', JSON.stringify(filterOptions.categories));
      }
      if (filterOptions.colors && filterOptions.colors.length > 0) {
        queryParams.append('colors', JSON.stringify(filterOptions.colors));
      }
      if (filterOptions.brands && filterOptions.brands.length > 0) {
        queryParams.append('brands', JSON.stringify(filterOptions.brands));
      }
      if (filterOptions.genderAndAgeCategories && filterOptions.genderAndAgeCategories.length > 0) {
        queryParams.append('genderAndAgeCategories', JSON.stringify(filterOptions.genderAndAgeCategories));
      }
      if (filterOptions.priceRange && filterOptions.priceRange.length >0) {
        queryParams.append('priceRange', JSON.stringify(filterOptions.priceRange));
      }
    }

    // Construct the final API URL with filters
    const apiUrl = `${API_URL}/products?${queryParams.toString()}`;
    console.log('Fetching from:', apiUrl);

    const res = await fetch(apiUrl);

    if (!res.ok) {
      const errorText = await res.text(); // Get the error message from the response
      throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
};


export const getProductById = async (productId: number) => {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`);

    if (!res.ok) {
      const errorText = await res.text(); // Get the error message from the response
      throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    // console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
};
