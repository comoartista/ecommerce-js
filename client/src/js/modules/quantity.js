import { fetchData } from "./data.js";
import { updateProductQuantityInCart } from "./cart.js";
import { upgradeTotalPrice } from "./price.js";

export async function increaseQuantity(productId) {
  const quantityElement = document.querySelector("#quantity");
  let quantity = parseInt(quantityElement.value);

  if (quantity) {
    const results = await fetchData();
    const product = results.find((product) => product.slug === productId);
    if (product) {
      quantityElement.value = quantity + 1;
      updateProductQuantityInCart(productId, quantity + 1);
      upgradeTotalPrice(product.price);

      // Повертаємо оновлену кількість
      return quantity + 1;
    }
  }

  // Якщо кількість не валідна або продукт не знайдений, повертаємо значення по замовчуванню
  return quantity;
}

export async function decreaseQuantity(productId) {
  const quantityElement = document.querySelector("#quantity");
  let quantity = parseInt(quantityElement.value);

  if (quantity && quantity > 1) {
    const results = await fetchData();
    const product = results.find((product) => product.slug === productId);
    if (product) {
      quantityElement.value = quantity - 1;
      updateProductQuantityInCart(productId, quantity - 1);
      upgradeTotalPrice(product.price);

      // Повертаємо оновлену кількість
      return quantity - 1;
    }
  }

  // Якщо кількість не валідна або зменшити кількість неможливо, повертаємо значення по замовчуванню
  return quantity;
}
