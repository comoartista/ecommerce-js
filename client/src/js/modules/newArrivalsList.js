import { fetchData } from "./data.js";

export async function newArrivalsList() {
  console.log("newArrivalsList function called");

  const paginationEl = document.querySelector("#product-pagination");

  if (paginationEl) {
    console.log("Pagination element found. Proceeding with creating slides...");

    const results = await fetchData();
    const fragment = document.createDocumentFragment();
    const swiperWrapper = document.querySelector(".swiper-wrapper");

    console.log("swiperWrapper:", swiperWrapper);
    console.log("paginationEl:", paginationEl);

    results.forEach(({ name, description, slug, imageUrl, price }) => {
      const div = document.createElement("div");
      div.classList.add("swiper-slide");

      div.innerHTML = `
        <a href="product-details.html?id=${slug}" class="product-card">
          <div  class="product-card__item">
            <img src="${imageUrl[0]}" alt="product" />
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

    const swiper = new Swiper(".swiper-newproducts", {
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

    console.log("Swiper initialized");
  } else {
    console.log("pagination element not found");
  }
}
