import * as bootstrap from "bootstrap";
import { generateProductHTML } from "./generateProductHTML.js";
import { getCart, updateProductQuantityInCart } from "./cart.js";

export function displayModal(product, quantity) {
  const modalDialog = document.querySelector(".modal-dialog");
  if (!modalDialog) {
    console.error("Element .modal-dialog not found!");
    return;
  }
  modalDialog.innerHTML = "";

  const modalElement = document.querySelector(".modal-cart");

  if (!modalElement) {
    console.error("Modal window not found!");
    return;
  }

  if (!product || typeof product !== "object") {
    console.error("Invalid product passed to displayModal:", product);
    return;
  }

  const modal = new bootstrap.Modal(modalElement, { keyboard: false });

  const cart = getCart();
  const cartItem = cart.find((item) => item.slug === product.slug);
  const currentQuantity = cartItem ? cartItem.quantity : quantity;

  const div = document.createElement("div");
  div.classList.add(
    "modal-content",
    "px-2",
    "h-100",
    "border-0",
    "rounded-0",
    "shadow-sm"
  );

  div.innerHTML = `
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="staticBackdropLabel">
        Cesta (<span>${currentQuantity}</span>)
      </h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body d-flex flex-column h-100 overflow-auto">
      ${generateProductHTML(product, quantity)}
      <div class="mb-5 d-flex flex-column gap-2 align-items-center mt-auto">
        <button class="btn rounded-0 border-dark button-check w-100">
          CONTINUAR LA COMPRA
        </button>
        <button class="btn btn-dark rounded-0 w-100 button-cart">
          IR AL CARRITO
        </button>
      </div>
    </div>
  `;

  modalDialog.appendChild(div);
  modal.show();

  // Add event listeners for buttons
  div.querySelector(".button-check").addEventListener("click", () => {
    console.log("Proceeding to checkout");
  });

  div.querySelector(".button-cart").addEventListener("click", () => {
    console.log("Navigating to the cart");
  });
}
