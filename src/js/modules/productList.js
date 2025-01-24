import { fetchData } from "./data.js";

export async function displayProducts() {
  const results = await fetchData();
  const fragment = document.createDocumentFragment();

  results.forEach(({ name, description, slug, imageUrl }) => {
    const div = document.createElement("div");
    const shortDescr =
      description.length > 25 ? description.slice(0, 25) + "..." : description;

    div.innerHTML = `
      <a href="product-details.html?id=${slug}" class="card__link text-decoration-none text-dark">
          <img class="img-fluid" src="${imageUrl}" alt="${name}">
          <p class="fs-6 mt-2">${shortDescr}</p>
      </a>
    `;

    fragment.appendChild(div);
  });

  document.querySelector("#cards-container").appendChild(fragment);
}
