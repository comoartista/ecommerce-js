import { fetchData } from "./data.js";

// Function to fetch and display shop products based on category and price filters
export async function displayShopList(category = "All rooms") {
  const results = await fetchData();
  const container = document.querySelector("#products-list");
  container.innerHTML = "";

  const selectedPriceRanges = getSelectedPriceRanges();

  // Filter products by category
  let filteredResults =
    category === "All rooms"
      ? results
      : results.filter((product) => product.category.includes(category));

  // Apply price filter if any range is selected
  if (selectedPriceRanges.length > 0) {
    filteredResults = filteredResults.filter((product) => {
      const price = parseFloat(product.price);
      return selectedPriceRanges.some(([min, max]) =>
        max ? price >= min && price <= max : price >= min
      );
    });
  }

  renderProducts(filteredResults, container);
  // Initialize event listeners
  setupPriceFilterListeners();
  setupCategoryListeners();
  setupGridToggleListeners();
}

// Function to render products on the page
function renderProducts(products, container) {
  const fragment = document.createDocumentFragment();

  products.forEach(({ name, imageUrl, price, slug }) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <a href="product-details.html?id=${slug}" class="product-card__item">
        <img src="${imageUrl[0]}" alt="product" />
        <div class="product-card__label d-flex flex-column gap-1">
          <div class="product-card__label-item badge text-bg-light">New</div>
          <div class="product-card__label-item badge text-bg-success">Sale</div>
        </div>
        <button class="product-card__btn btn btn-dark btn-opacity is-visible">Add to cart</button>
      </a>
      <a class="product-card__content text-start mt-1">
        <h5 class="product-card__title fs-6 fw-bold">${name}</h5>
        <p class="product-card__new-price fs-6 fw-bold">${price}€</p>
      </a>
    `;
    fragment.appendChild(div);
  });

  container.appendChild(fragment);
}

// Function to get selected price ranges from checkboxes
function getSelectedPriceRanges() {
  return Array.from(document.querySelectorAll(".price-range:checked")).map(
    (checkbox) => {
      const [min, max] = checkbox.value.split("-").map(Number);
      return max ? [min, max] : [min, null]; // If "400+", max will be null
    }
  );
}

// Event listeners for price range filters
function setupPriceFilterListeners() {
  document.querySelectorAll(".price-range, #allPrices").forEach((checkbox) => {
    checkbox.addEventListener("change", () => displayShopList());
  });

  // Event listener for "All Prices" checkbox
  document.querySelector("#allPrices").addEventListener("change", function () {
    if (this.checked) {
      document.querySelectorAll(".price-range").forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  });
}

// Event listener for category selection
function setupCategoryListeners() {
  document
    .querySelectorAll(".categories-list, .dropdown-content")
    .forEach((list) => {
      list.addEventListener("click", (event) => {
        const target = event.target;
        const category =
          target.getAttribute("data-category") || target.textContent.trim();

        if (target.tagName === "LI" || target.tagName === "A") {
          // Видаляємо активний клас у категоріях списку
          document
            .querySelectorAll(".categories-list li")
            .forEach((li) => li.classList.remove("active--categories-list"));

          // Додаємо активний клас тільки у списку категорій
          if (target.tagName === "LI") {
            target.classList.add("active--categories-list");
          }

          displayShopList(category);
        }
      });
    });
}

// Event listeners for grid view toggle buttons
function setupGridToggleListeners() {
  document.querySelectorAll(".btn-grid-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = document.querySelector("#products-list");
      const cols = btn.getAttribute("data-cols");

      // Видаляємо старі класи
      container.classList.remove(
        "grid-template-columns-3",
        "grid-template-columns-5"
      );
      container.classList.add(`grid-template-columns-${cols}`);

      // Знімаємо активний стан з усіх кнопок
      document.querySelectorAll(".btn-grid-toggle").forEach((b) => {
        b.classList.remove("active");
      });

      // Додаємо активний стан до натиснутої кнопки
      btn.classList.add("active");
    });
  });
}
