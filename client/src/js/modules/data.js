let products = [];

export async function fetchData() {
  if (products.length === 0) {
    try {
      const response = await fetch("http://localhost:5001/api/products");
      if (!response.ok) {
        throw new Error("Error loading data");
      }
      const result = await response.json();
      products = result.data;
    } catch (error) {
      console.error(error.message);
    }
  }
  return products;
}
