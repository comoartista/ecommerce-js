import { fetchData } from "./data.js";
import { saveToLocalStorage, getFromLocalStorage } from "./localStorage.js";
import { displayModal } from "./modal.js";

// Adds a product to the cart or updates its quantity if it already exists
export async function addToCart(productId, quantity) {
  if (quantity <= 0 || isNaN(quantity)) {
    console.error("Invalid quantity value.");
    return;
  }

  const cart = getFromLocalStorage("cart") || [];

  const results = await fetchData();
  const product = results.find((item) => item.slug === productId);

  if (product) {
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

    saveToLocalStorage("cart", cart);

    
    displayModal(
      {
        name: product.name,
        description: product.description,
        color: product.color,
        imageUrl: product.imageUrl[0],
        price: product.price,
      },
      quantity
    );
  }
}

export function updateProductQuantityInCart(productId, newQuantity) {
  const cart = getFromLocalStorage("cart");
  const product = cart.find((item) => item.slug === productId);
  if (product) {
    product.quantity = newQuantity;
    saveToLocalStorage("cart", cart);
  }
}

export function getCart() {
  return getFromLocalStorage("cart") || [];
}
