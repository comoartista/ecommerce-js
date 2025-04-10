import { fetchProducts } from "./products.js";
import { updateProductQuantityInCart } from "./cart.js";

export async function changeQuantity(productId, delta) {
  const quantityElement = document.querySelector("#quantity");
  let quantity = parseInt(quantityElement.value);

  if (!quantity || quantity + delta < 1) return quantity;

  const results = await fetchProducts();
  const product = results.find((product) => product.slug === productId);
  if (!product) return quantity;

  const newQuantity = quantity + delta;
  updateProductQuantityInCart(productId, newQuantity);
  return newQuantity;
}

export function increaseQuantity(productId) {
  return changeQuantity(productId, 1);
}

export function decreaseQuantity(productId) {
  return changeQuantity(productId, -1);
}
