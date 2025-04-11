import { fetchProducts } from "./products";
import { displayModal } from "../modules/modal.js";
import { getFromLocalStorage, saveToLocalStorage } from "./localStorage.js";

// Add product to cart with specified quantity and show confirmation modal
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

    // Check if product already exists in cart
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

    // Show modal with product details
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

// Update quantity of specific product already in the cart
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

// Return full cart from localStorage
export function getCart() {
  return getFromLocalStorage("cart") || [];
}

// Render cart page: list of items + Stripe checkout button
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

  const isProduction = window.location.hostname !== "localhost";

  const API_URL = isProduction
    ? "https://ecommerce-js-2rb5.onrender.com/api"
    : "http://localhost:5001/api";

  // Handle Stripe checkout request
  checkoutButton.addEventListener("click", async () => {
    const cart = getCart();

    try {
      const response = await fetch(`${API_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

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

  // Handle remove button clicks
  setTimeout(() => {
    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.closest("button").dataset.slug;
        removeFromCart(productId);
      });
    });
  }, 0);
}

// Remove item from cart and update cart view + count
export function removeFromCart(productId) {
  let cart = getFromLocalStorage("cart") || [];
  cart = cart.filter((item) => item.slug !== productId);
  saveToLocalStorage("cart", cart);

  // If on cart page, re-render cart
  const cartSection = document.querySelector("#cart-section");
  if (cartSection) {
    renderCartPage();
  }

  updateCartCount();
}

// Update cart icon counter (total quantity of items)
export function updateCartCount() {
  const cart = getCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCountElement = document.querySelector("#cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity;
  }
}

// Generate cart item HTML markup for rendering
export function createCartItemHTML(
  { slug, name, description, color, imageUrl, price },
  quantity = 1
) {
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
