let productsList = [];

const isProduction = window.location.hostname !== "localhost";

export async function fetchProducts() {
  if (productsList.length === 0) {
    try {
      const API_URL = isProduction
        ? "https://ecommerce-js-2rb5.onrender.com/products"
        : "http://localhost:5001/api/products";

      const result = await fetchWithRetry(API_URL);

      productsList = result.data;
    } catch (error) {
      console.error("Failed to load products:", error.message);
    }
  }

  return productsList;
}
