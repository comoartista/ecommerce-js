import { fetchProducts } from "./products.js";

// Function to fetch and display new arrival products in the Swiper slider
export async function displayNewArrivals() {
  console.log("displayNewArrivals function called");

  const paginationEl = document.querySelector("#product-pagination");
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  // Check if necessary DOM elements exist
  if (!paginationEl || !swiperWrapper) {
    console.log("Pagination or swiperWrapper not found, exiting function.");
    return;
  }

  console.log("Pagination element found. Proceeding with creating slides...");

  try {
    const results = await fetchProducts(); // Fetch product data
    const fragment = document.createDocumentFragment(); // Use fragment for better performance

    results.forEach(({ name, description, slug, imageUrl, price }) => {
      const div = document.createElement("div");
      div.classList.add("swiper-slide");

      div.innerHTML = `
        <a href="product-details.html?id=${slug}" class="product-card">
          <div class="product-card__item">
            <img src="${imageUrl[0]}" alt="${name}" loading="lazy" />
            <div class="product-card__label d-flex flex-column gap-1">
              <div class="product-card__label-item badge text-bg-light">New</div>
              <div class="product-card__label-item badge text-bg-success">Sale</div>
            </div>
            <button class="product-card__btn btn btn-dark btn-opacity is-visible">Add to cart</button>
          </div>
          <div class="product-card__content text-start mt-1">
            <h5 class="product-card__title fs-6 fw-bold">${name}</h5>
            <p class="product-card__new-price fs-6 fw-bold">${price}€</p>
          </div>
        </a>
      `;

      fragment.appendChild(div);
    });

    swiperWrapper.appendChild(fragment);

    // Initialize Swiper slider
    new Swiper(".swiper-newproducts", {
      slidesPerView: 1.5,
      spaceBetween: 16,
      pagination: {
        el: "#product-pagination",
        clickable: true,
        type: "progressbar",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2.5, spaceBetween: 16 },
        768: { slidesPerView: 3.5, spaceBetween: 16 },
        1024: { slidesPerView: 4.5, spaceBetween: 24 },
      },
    });

    console.log("Swiper initialized successfully.");
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}