import "./scss/style.scss";
import "@fortawesome/fontawesome-free/css/all.css";

import { global } from "./js/global";
import { btnWideBaner } from "./js/modules/banner";
import { toggleMenuBurger } from "./js/modules/menu";
import { playVideo } from "./js/modules/video";
import { handleScreenResize } from "./js/modules/products";
import { productDetails } from "./js/modules/productDetails";

function highlightActiveLink() {
  const menuLinks = document.querySelectorAll(".menu__item");
  menuLinks.forEach((item) => {
    global.currentPage === item.querySelector("a").getAttribute("href") &&
      item.classList.add("active");
  });
}

function init() {
  switch (global.currentPage) {
    case "/":
    case "index.html":
      playVideo();
      handleScreenResize(global);
      break;
    case "/shop.html":
      console.log("/shop.html");
      break;
    case "/merch.html":
      console.log("/merch.html");
      break;
    case "/subscribe.html":
      console.log("/subscribe.html");
      break;
    case "/brew-guides.html":
      console.log("/brew-guides.html");
      break;
    case "/product.html":
      productDetails();
      console.log("/product.html");
      break;
  }
  btnWideBaner();
  highlightActiveLink();
  toggleMenuBurger();
}

document.addEventListener("DOMContentLoaded", init);
