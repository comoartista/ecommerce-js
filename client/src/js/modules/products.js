let productsList = [];

// Fetches products from the API and caches the result
export async function fetchProducts() {
  // Check if the products list is empty before fetching data
  if (productsList.length === 0) {
    try {
      // Fetch product data from the API
      const response = await fetch("http://localhost:5001/api/products");
      
      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Error loading data");
      }
      
      // Parse the JSON data from the response
      const result = await response.json();
      
      // Store the fetched products in the productsList array
      productsList = result.data;
    } catch (error) {
      // Log any errors encountered during the fetch process
      console.error(error.message);
    }
  }
  
  // Return the products list (cached data after the first fetch)
  return productsList;
}