import { fetchData } from "./data.js";
import { addToCart } from "./cart.js";
import { saveToLocalStorage, getFromLocalStorage } from "./localStorage.js";

import { increaseQuantity, decreaseQuantity } from "./quantity.js";
import { upgradeTotalPrice } from "./price.js";

export async function displayProductDetails() {
  const productId = window.location.search.split("=")[1]; // Extract product ID from URL
  const results = await fetchData(); // Fetch all product data
  const product = results.find((item) => item.slug === productId); // Find the product by its ID

  const cart = getFromLocalStorage("cart") || []; // Retrieve the cart from local storage
  const cartProduct = cart.find((item) => item.slug === productId); // Check if product is already in the cart

  if (product) {
    const div = document.createElement("div");
    div.classList.add("product__container", "row");

    // Render product details
    div.innerHTML = createProductDetailsHTML({
      ...product,
      quantity: 1,
    });

    document.querySelector("#section-product__wrapper").appendChild(div);

    // Initialize Swiper after rendering the HTML
    const swiperThumbs = new Swiper(".mySwiper", {
      spaceBetween: 15,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      direction: "vertical",
      zoom: true,
    });

    new Swiper(".mySwiper2", {
      spaceBetween: 10,
      zoom: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiperThumbs,
      },
    });

    // Logic for the increase/decrease quantity buttons
    const quantityInput = document.querySelector("#quantity");
    const totalPriceElement = document.querySelector("#total-price");

    document
      .querySelector("#increase-btn")
      .addEventListener("click", async () => {
        const updatedQuantity = await increaseQuantity(productId);
        console.log("Updated Quantity (increase):", updatedQuantity); // Логування
        if (updatedQuantity !== undefined && updatedQuantity > 0) {
          quantityInput.value = updatedQuantity;
          updateTotalPrice(totalPriceElement, product.price, updatedQuantity);
        } else {
          console.error("Invalid quantity value");
        }
      });

    document
      .querySelector("#decrease-btn")
      .addEventListener("click", async () => {
        const updatedQuantity = await decreaseQuantity(productId);
        console.log("Updated Quantity (decrease):", updatedQuantity); // Логування
        if (updatedQuantity !== undefined && updatedQuantity > 0) {
          quantityInput.value = updatedQuantity;
          updateTotalPrice(totalPriceElement, product.price, updatedQuantity);
        } else {
          console.error("Invalid quantity value");
        }
      });

    // Update total price on load
    upgradeTotalPrice(product.price);

    // Add to cart logic
    document.querySelector("#add-to-cart").addEventListener("click", () => {
      const quantity = parseInt(quantityInput.value) || 1;
      addToCart(productId, quantity);
    });
  } else {
    console.error("Product not found.");
  }
}

// Updates the total price in the "Añadir a la cesta" button
function updateTotalPrice(element, price, quantity) {
  const totalPrice = (price * quantity).toFixed(2);
  element.textContent = `${totalPrice.toLocaleString("de-DE")} €`;
}

// Generates HTML for product details
function createProductDetailsHTML({
  name,
  description,
  imageUrl,
  color,
  price,
  quantity,
}) {
  const slidesHTML = imageUrl
    .map(
      (url) => `
      <div class="swiper-slide">
      <div class="swiper-zoom-container">
        <img src="${url}" alt="${name}" />
      </div>
      </div>
    `
    )
    .join("");

  return `
  <div class="col-12 col-md-7">
  <div
    class="swiper mySwiper2 ">
    <div class="swiper-wrapper ">
      ${slidesHTML}
    </div>
  </div>

  <div thumbsSlider="" class="swiper mySwiper ">
    <div class="swiper-wrapper">
      ${slidesHTML}
    </div>
  </div>
   </div>
    <div class="d-flex flex-column col-12 col-md-5">
      <span class="mt-3 badge text-dark border border-dark text-uppercase rounded-0 align-self-start">Special Price</span>
      <h4 class="fw-bold mt-2">${name}</h4>
      <p>${description}</p>
      <p class="fs-3 fw-bold">${price.toLocaleString("de-DE")} €</p>
      <hr class="mt-2">
      <span>Color: <span class="text-secondary">${color}</span></span>
      <span class="mt-4 small text-success"><i class="bi bi-truck"></i> En Stock, preparación y envío en 7/10 días laborables</span>
      <form class="d-flex align-items-center gap-2 mt-3 ">
        <div class="z-0 input-group border border-dark  " style="max-width: 120px; ">
          <button type="button" class="btn rounded-0" id="decrease-btn">-</button>
          <input type="number" class="form-control text-center py-2" id="quantity" value="${quantity}" min="1" required>
          <button type="button" class="btn rounded-0" id="increase-btn">+</button>
        </div>
        <button
          type="button" id="add-to-cart" class="btn btn-dark w-100 rounded-0 py-2">
          Añadir a la cesta <span id="total-price">${(
            price * quantity
          ).toLocaleString("de-DE")} €</span> <i class="bi bi-bag"></i>
        </button>
      </form>
    </div>
  `;
}
