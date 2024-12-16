import "./scss/style.scss";
import "@fortawesome/fontawesome-free/css/all.css";

const global = {
  currentPage: window.location.pathname,
};

function highlightActiveLink() {
  const menuLinks = document.querySelectorAll(".menu__item");
  menuLinks.forEach((item) => {
    global.currentPage === item.querySelector("a").getAttribute("href") &&
      item.classList.add("active");
  });
}
//Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "index.html":
      console.log("/");
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
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
