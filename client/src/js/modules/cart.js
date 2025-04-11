import { fetchProducts } from "./products";
import { displayModal } from "../modules/modal.js";
import { getFromLocalStorage, saveToLocalStorage } from "./localStorage.js";

export async function addToCart(productId, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    console.error("Invalid quantity value.");
    return;
  }

  const cart = getFromLocalStorage("cart") || [];

  try {
    const products = await fetchProducts();
    const product = products.find((item) => item.slug === productId);

    if (!product) {
      console.error("Product not found:", productId);
      return;
    }

    const existingProduct = cart.find((item) => item.slug === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({
        slug: product.slug,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        description: product.description || "Sin descripción",
        color: product.color || "Sin color",
        quantity,
      });
    }

    saveToLocalStorage("cart", cart);

    displayModal(
      {
        name: product.name,
        description: product.description || "No description available",
        color: product.color || "Unknown",
        imageUrl: Array.isArray(product.imageUrl)
          ? product.imageUrl[0]
          : product.imageUrl,
        price: product.price,
        slug: product.slug,
      },
      quantity
    );
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

export function updateProductQuantityInCart(productId, newQuantity) {
  if (!Number.isInteger(newQuantity) || newQuantity <= 0) {
    console.error("Invalid quantity value.");
    return;
  }

  const cart = getFromLocalStorage("cart") || [];
  const product = cart.find((item) => item.slug === productId);

  if (product) {
    product.quantity = newQuantity;
    saveToLocalStorage("cart", cart);
  }
}

export function getCart() {
  return getFromLocalStorage("cart") || [];
}

export function renderCartPage() {
  const container = document.querySelector("#cart-section");
  const cart = getCart();

  container.innerHTML = cart.length
    ? `${cart
        .map((product) => createCartItemHTML(product, product.quantity))
        .join("")}
  <a id="checkout-btn" class="btn btn-success mt-3 w-100">
    Proceder al Pago con Stripe
  </a>`
    : "<p>Tu carrito está vacío.</p>";

  const checkoutButton = document.querySelector("#checkout-btn");

  if (checkoutButton) {
    checkoutButton.addEventListener("click", async () => {
      const cart = getCart();

      try {
        const response = await fetch(
          process.env.NODE_ENV === "production"
            ? `${process.env.PROD_API_URL}/create-checkout-session`
            : "http://localhost:5001/api/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart }),
          }
        );

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          alert("Error redirecting to Stripe Checkout");
        }
      } catch (error) {
        console.error("Checkout error:", error);
      }
    });
  }
  setTimeout(() => {
    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.closest("button").dataset.slug;
        removeFromCart(productId);
      });
    });
  }, 0);
}

export function removeFromCart(productId) {
  let cart = getFromLocalStorage("cart") || [];
  cart = cart.filter((item) => item.slug !== productId);
  saveToLocalStorage("cart", cart);

  // Оновлення сторінки кошика, якщо вона є
  const cartSection = document.querySelector("#cart-section");
  if (cartSection) {
    renderCartPage();
  }

  updateCartCount();
}

export function updateCartCount() {
  const cart = getCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCountElement = document.querySelector("#cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity;
  }
}

export function createCartItemHTML(
  { slug, name, description, color, imageUrl, price },
  quantity = 1
) {
  console.log(slug, name, description, color, imageUrl, price, quantity);

  const totalPrice = (price * quantity).toFixed(2);

  return `
      <div class="d-flex gap-3">
        <div style="width: 75px; height: 100px">
          <img src="${
            Array.isArray(imageUrl) ? imageUrl[0] : imageUrl
          }" alt="${name}" class="w-100" />
        </div>
        <div class="w-100">
          <div class="pl-1 d-flex justify-content-between align-items-center">
            <h5 class="fs-6 fw-bold my-0">${name}</h5>
            <button class="btn remove-btn" data-slug="${slug}">
              <i class="bi bi-trash3 small"></i> Eliminar
            </button>
          </div>
          <p class="my-0 fw-bold">${description}</p>
          <p class="my-0 small">Color: ${color}</p>
          <div class="d-flex justify-content-between small mt-2">
            <p>Cantidad</p>
            <span class="fw-bold">${quantity}</span>
          </div>
        </div>
      </div>
      <hr />
      <div class="d-flex justify-content-between align-items-center">
        <span>Total</span><span>${totalPrice}€</span>
      </div>
 
    `;
}
