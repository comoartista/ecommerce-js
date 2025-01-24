import { fetchData } from "./data.js";
import { updateProductQuantityInCart } from "./cart.js";
import { upgradeTotalPrice } from "./price.js";

export async function increaseQuantity(productId) {
  const quantityElement = document.querySelector("#quantity");
  const quantity = parseInt(quantityElement.value);

  if (quantity) {
    const results = await fetchData();
    const product = results.find((product) => product.slug === productId);
    if (product) {
      quantityElement.value = quantity + 1;
      updateProductQuantityInCart(productId, quantity + 1);
      upgradeTotalPrice(product.price);
    }
  }
}

export async function decreaseQuantity(productId) {
  const quantityElement = document.querySelector("#quantity");
  const quantity = parseInt(quantityElement.value);

  if (quantity && quantity > 1) {
    const results = await fetchData();
    const product = results.find((product) => product.slug === productId);
    if (product) {
      quantityElement.value = quantity - 1;
      updateProductQuantityInCart(productId, quantity - 1);
      upgradeTotalPrice(product.price);
    }
  }
}
