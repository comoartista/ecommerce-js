import * as bootstrap from "bootstrap";
import { generateProductHTML } from "./generateProductHTML.js";

export function displayModal(product, quantity) {
  const modalDialog = document.querySelector(".modal-dialog");
  modalDialog.innerHTML = "";

  const modalElement = document.querySelector(".modal-cart");

  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);

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
        Cesta (<span>${quantity}</span>)
      </h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body d-flex flex-column h-100">
      ${generateProductHTML(product, quantity)}
      <div class="mb-5 d-flex flex-column gap-2 align-items-center mt-auto">
        <button class="btn rounded-0 border-dark button-check w-100">
          CONTINUAR LA COMPRA
        </button>
        <button class="btn btn-dark rounded-0 w-100">
          IR AL CARRITO
        </button>
      </div>
    </div>
  `;
    modalDialog.appendChild(div);
    modal.show();
  } else {
    console.error("Модальне вікно не знайдено!");
  }
}
