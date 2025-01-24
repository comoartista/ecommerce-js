import * as bootstrap from "bootstrap"; // Імпортує всі компоненти Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./scss/style.scss";

import { displayProducts } from "./js/modules/productList.js";
import { displayProductDetails } from "./js/modules/productDetails.js";
import { displayCart } from "./js/modules/displayCart.js";
import { global } from "./js/global.js";
import { menuAnimation } from "./js/animation.js";

export function init() {
  switch (global.currentPage) {
    case "/":
    case "index.html":
      displayProducts();
      menuAnimation();
      break;
    case "/product-details.html":
      displayProductDetails();
      break;
    case "/cart.html":
      displayCart();
      break;
  }
}

window.addEventListener("DOMContentLoaded", init);
