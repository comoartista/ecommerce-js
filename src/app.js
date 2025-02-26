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
import { displayShopList, shop } from "./js/modules/shop.js";
import { addToCart } from "./js/modules/cart.js";

import headerHTML from "./components/header/header.html";
import footerHTML from "./components/footer/footer.html";
import { getFromLocalStorage } from "./js/modules/localStorage.js";
// Initialize the application
export function init() {
  document.body.innerHTML = headerHTML + document.body.innerHTML; // Вставляє хедер перед основним контентом
  menuAnimation();

  const footerContainer = document.querySelector("#footer");
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML; // Вставляє HTML футера в контейнер
  }
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
      case "/shop.html":
        displayShopList();
        addToCart();
        break;
      case "/cart.html":
        const cartItems = getFromLocalStorage("cart") || [];
        if (cartItems.length > 0) {
          cartItems.forEach((item) => displayCart(item, item.quantity));
        } else {
          displayCart(); // Порожній кошик
        }
        break;
    }
  }
}

// Run init() when the page content is fully loaded
window.addEventListener("DOMContentLoaded", init);
