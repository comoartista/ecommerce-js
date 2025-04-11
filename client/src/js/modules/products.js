let productsList = [];

// Fetches products from the API and caches the result
export async function fetchProducts() {
  if (productsList.length === 0) {
    try {
      const response = await fetch(
        import.meta.env.PROD
          ? "https://ecommerce-js-2rb5.onrender.com/api/products"
          : "http://localhost:5001/api/create-checkout-session"
      );

      if (!response.ok) {
        throw new Error("Error loading data");
      }

      const result = await response.json();

      productsList = result.data;
    } catch (error) {
      console.error(error.message);
    }
  }

  return productsList;
}
