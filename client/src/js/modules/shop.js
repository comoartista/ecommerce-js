import { fetchProducts } from "./products";

// Function to fetch and display shop products based on category and price filters
export async function displayShopList(category = "All rooms") {
  try {
    // Fetch products asynchronously
    const results = await fetchProducts();
    const container = document.querySelector("#products-list");
    container.innerHTML = ""; // Clear current product list

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

    // Render filtered products
    renderProducts(filteredResults, container);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Optionally, display a message to the user about the error
  }
}

// Function to render products on the page
export function renderProducts(products, container) {
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

// Function to reset price filters
function resetPriceFilters() {
  // Reset all price range checkboxes
  document.querySelectorAll(".price-range").forEach((checkbox) => {
    checkbox.checked = false;
  });
}

// Setup event listeners for price filter changes
export function setupPriceFilterListeners() {
  // Add event listeners to price filter checkboxes
  document.querySelectorAll(".price-range").forEach((checkbox) => {
    checkbox.addEventListener("change", () => displayShopList());
  });

  // Reset filters when "All Prices" is selected
  document.querySelector("#allPrices").addEventListener("change", function () {
    if (this.checked) resetPriceFilters();
    displayShopList();
  });
}

// Category click handler
export function setupCategoryListeners() {
  const categoryList = document.querySelector(".categories-list");

  categoryList.addEventListener("click", (event) => {
    const target = event.target;

    // Only process clicks on list items
    if (target.tagName === "LI") {
      // Set active category
      document
        .querySelectorAll(".categories-list li")
        .forEach((li) => li.classList.remove("active--categories-list"));
      target.classList.add("active--categories-list");

      // Get the category from data attribute or text content
      const category =
        target.getAttribute("data-category") || target.textContent.trim();
      displayShopList(category);
    }
  });
}

// Setup grid toggle layout
export function setupGridToggleListeners() {
  document.querySelectorAll(".btn-grid-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = document.querySelector("#products-list");
      const cols = btn.getAttribute("data-cols");

      // Update grid layout by removing old classes and adding new one
      container.classList.remove(
        "grid-template-columns-3",
        "grid-template-columns-5"
      );
      container.classList.add(`grid-template-columns-${cols}`);

      // Highlight the active grid layout button
      document
        .querySelectorAll(".btn-grid-toggle")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}