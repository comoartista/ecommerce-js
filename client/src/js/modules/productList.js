import { fetchData } from "./data.js";

export async function displayProducts() {
  const results = await fetchData();
  const fragment = document.createDocumentFragment();

  results.forEach(({ name, description, slug, imageUrl, price }) => {
    const div = document.createElement("div");
    div.classList.add("col-sm-6", "col-md-4", "col-lg-3", "mb-3");
    div.style.height = "430px";

    const shortDescr =
      description.length > 25 ? description.slice(0, 25) + "..." : description;

    div.innerHTML = `
      <a href="product-details.html?id=${slug}" class=" card__link text-decoration-none text-dark ">
      <img
        class="img-fluid w-100 h-100"
        style="object-fit: cover" 
        src="${imageUrl[0]}"
        alt="${name}"/>
      <div
        class="feature-section__content mt-2 d-flex justify-content-between">
        <div>
          <p class="fw-bold">${name}</p>
          <p class="feature-section__descr">${description}</p>
        </div>
        <span class="fw-bold">${price}€</span>
      </div>
    </a>
    `;

    fragment.appendChild(div);
  });

  document
    .querySelector(".feature-section__cards-container")
    .appendChild(fragment);
}
