// Import required modules for product and cart functionality
import { fetchProducts } from "./products.js";
import { addToCart } from "./cart.js";
import { increaseQuantity, decreaseQuantity } from "./quantity.js";

// Main function to display product details on the page
export async function productDetails() {
  const productId = window.location.search.split("=")[1];

  // Fetch all products and find the selected one by slug
  const results = await fetchProducts();
  const product = results.find((item) => item.slug === productId);

  if (!product) {
    console.error("Product not found.");
    return;
  }

  // Create and insert product details HTML into the page
  const div = document.createElement("div");
  div.classList.add("product__container", "row", "h-100");
  div.innerHTML = createProductDetailsHTML({ ...product, quantity: 1 });

  document.querySelector("#section-product__wrapper").appendChild(div);

  // Initialize image slider (Swiper.js)
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

  // Set initial price based on default quantity
  updateTotalPriceOnLoad(product.price);

  const quantityInput = document.querySelector("#quantity");
  const totalPriceElement = document.querySelector("#total-price");

  // Set up all interactive button events
  setupEventListeners(product, quantityInput, totalPriceElement);
}

// Generate HTML markup for the selected product
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
      <div class="swiper-slide position-relative">
        <div class="swiper-zoom-container">
          <img src="${url}" alt="${name}" class="img-fluid " />
        </div>
      </div>
    `
    )
    .join("");

  return `
    <div class="col-12 col-md-7">
      <div class="swiper mySwiper2">
        <div class="swiper-wrapper">
          ${slidesHTML}
        </div>
      </div>
      <div thumbsSlider="" class="swiper mySwiper">
        <div class="swiper-wrapper ">
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
      <form class="d-flex align-items-center gap-2 mt-3">
        <div class="z-0 input-group border border-dark" style="max-width: 120px;">
          <button type="button" class="btn rounded-0" id="decrease-btn">-</button>
          <input type="number" class="form-control text-center py-2" id="quantity" value="${quantity}" min="1" readonly>
          <button type="button" class="btn rounded-0" id="increase-btn">+</button>
        </div>
        <button type="button" id="add-to-cart" class="btn btn-dark w-100 rounded-0 py-2">
          Añadir a la cesta <span id="total-price">${(
            price * quantity
          ).toLocaleString("de-DE")} €</span> 
        </button>
      </form>
    </div>
  `;
}

// Setup event listeners for +/– buttons and add to cart
function setupEventListeners(product, quantityInput, totalPriceElement) {
  // Handle + button click
  document
    .querySelector("#increase-btn")
    .addEventListener("click", async () => {
      const updatedQuantity = await increaseQuantity(product.slug);
      if (updatedQuantity > 0) {
        quantityInput.value = updatedQuantity;
        updateTotalPriceElement(
          totalPriceElement,
          product.price,
          updatedQuantity
        );
      }
    });

  // Handle – button click
  document
    .querySelector("#decrease-btn")
    .addEventListener("click", async () => {
      const updatedQuantity = await decreaseQuantity(product.slug);
      if (updatedQuantity > 0) {
        quantityInput.value = updatedQuantity;
        updateTotalPriceElement(
          totalPriceElement,
          product.price,
          updatedQuantity
        );
      }
    });

  // Handle Add to Cart button
  document.querySelector("#add-to-cart").addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value) || 1;
    addToCart(product.slug, quantity);
  });
}

// Set initial total price on page load
function updateTotalPriceOnLoad(price) {
  const quantity = parseInt(document.querySelector("#quantity").value);
  const total = price * quantity;
  document.querySelector("#total-price").textContent = `${total.toLocaleString(
    "de-DE"
  )} €`;
}

// Update total price when quantity changes
function updateTotalPriceElement(element, price, quantity) {
  const total = price * quantity;
  element.textContent = `${total.toLocaleString("de-DE")} €`;
}
