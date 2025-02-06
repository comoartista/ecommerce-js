// Import Swiper and its styles
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Bootstrap and its styles
import * as bootstrap from "bootstrap"; // Imports all Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import custom styles
import "./scss/style.scss";

// Import project modules
import { displayProducts } from "./js/modules/productList.js";
import { displayProductDetails } from "./js/modules/productDetails.js";
import { displayCart } from "./js/modules/displayCart.js";
import { global } from "./js/global.js";
import { menuAnimation } from "./js/animation.js";
import { newArrivalsList } from "./js/modules/newArrivalsLIst.js";

// Initialize the application
export function init() {
  console.log("init function called"); // Debug log to check if the function is executed

  menuAnimation();

  // Ensure global.currentPage exists before using it
  if (global?.currentPage) {
    const page = global.currentPage.toLowerCase().replace(/\/$/, ""); // Normalize page path

    switch (page) {
      case "":
      case "/index.html":
        newArrivalsList();
        break;
      case "/product-details.html":
        displayProductDetails();
        break;
      case "/cart.html":
        displayCart();
        break;
    }
  }
}

// Run init() when the page content is fully loaded
window.addEventListener("DOMContentLoaded", init);
