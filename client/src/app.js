// Import Swiper
import Swiper from "swiper";
import * as bootstrap from "bootstrap"; // Imports all Bootstrap components

// Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import custom styles
import "./scss/style.scss";

// Import project modules
import { productDetails } from "./js/modules/productDetails.js";
import { global } from "./js/global.js";
import { menuAnimation } from "./js/animation.js";
import { displayNewArrivals } from "./js/modules/displayNewArrivals.js";
import {
  displayShopList,
  setupCategoryListeners,
  setupGridToggleListeners,
  setupPriceFilterListeners,
} from "./js/modules/shop.js";
import { renderCartPage, updateCartCount } from "./js/modules/cart.js";

import headerHTML from "./components/header/header.html";
import footerHTML from "./components/footer/footer.html";


// Initialize the application
export function init() {
  // Inserts the header before the main content
  document.body.innerHTML = headerHTML + document.body.innerHTML;
  menuAnimation();

  // Inserts the footer HTML into the container
  const footerContainer = document.querySelector("#footer");
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
  }

  document.querySelector("#cart-button").addEventListener("click", (e) => {
    e.preventDefault();

    window.location.href = "cart.html";
  });

  // Ensure global.currentPage exists before using it
  if (global?.currentPage) {
    const page = global.currentPage.toLowerCase().replace(/\/$/, ""); // Normalize page path

    switch (page) {
      case "":
      case "/index.html":
        displayNewArrivals();
        break;
      case "/product-details.html":
        productDetails();
        break;
      case "/shop.html":
        setupPriceFilterListeners();
        setupCategoryListeners();
        setupGridToggleListeners();

        displayShopList();
        break;
      case "/cart.html":
        renderCartPage();
        break;
    }
    updateCartCount();
  }
}

// Run init() when the page content is fully loaded
window.addEventListener("DOMContentLoaded", init);
