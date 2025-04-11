let productsList = [];

// Retry fetch helper
async function fetchWithRetry(url, options = {}, retries = 3, delay = 2000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Fetch failed");
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${3 - retries + 1})`);
      await new Promise((res) => setTimeout(res, delay));
      return fetchWithRetry(url, options, retries - 1, delay);
    } else {
      console.error("All retries failed:", error);
      throw error;
    }
  }
}

// Fetches products from the API and caches the result
export async function fetchProducts() {
  if (productsList.length === 0) {
    try {
      const apiUrl =
        process.env.NODE_ENV === "production"
          ? `${process.env.PROD_API_URL}/products`
          : "http://localhost:5001/api/products";

      const result = await fetchWithRetry(apiUrl);

      productsList = result.data;
    } catch (error) {
      console.error("Failed to load products:", error.message);
    }
  }

  return productsList;
}
