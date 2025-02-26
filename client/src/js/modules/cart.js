import { fetchData } from "./data.js";
import { saveToLocalStorage, getFromLocalStorage } from "./localStorage.js";
import { displayModal } from "./modal.js";

// Adds a product to the cart or updates its quantity if it already exists
export async function addToCart(productId, quantity) {
  if (isNaN(quantity) || quantity <= 0) {
    console.error("Invalid quantity value.");
    return;
  }

  const cart = getFromLocalStorage("cart") || [];

  try {
    const results = await fetchData();
    const product = results.find((item) => item.slug === productId);

    if (!product) {
      console.error("Product not found:", productId);
      return;
    }

    // Checks if the product already exists in the cart
    const existingProduct = cart.find((item) => item.slug === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity; // Updates the quantity
    } else {
      cart.push({
        slug: product.slug,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity,
      });
    }

    saveToLocalStorage("cart", [...cart]);

    displayModal(
      {
        name: product.name,
        description: product.description || "No description available",
        color: product.color || "Unknown",
        imageUrl: Array.isArray(product.imageUrl)
          ? product.imageUrl[0]
          : product.imageUrl,
        price: product.price,
      },
      quantity
    );
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

export function updateProductQuantityInCart(productId, newQuantity) {
  if (isNaN(newQuantity) || newQuantity <= 0) {
    console.error("Invalid quantity value.");
    return;
  }

  const cart = getFromLocalStorage("cart") || [];
  const product = cart.find((item) => item.slug === productId);

  if (product) {
    product.quantity = newQuantity;
    saveToLocalStorage("cart", [...cart]);
  }
}

export function getCart() {
  return getFromLocalStorage("cart") || [];
}
