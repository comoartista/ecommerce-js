let products = [];

export async function fetchData() {
  if (products.length === 0) {
    const response = await fetch("./data.json");
    if (response.ok) {
      products = await response.json();
    } else {
      console.error("Error loading data");
    }
  }
  return products;
}