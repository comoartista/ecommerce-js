import { generateProductHTML } from "./generateProductHTML.js";

export function displayCart(product, quantity) {
  const cartSection = document.querySelector("#cart-section");

  if (cartSection.hasChildNodes()) {
    cartSection.innerHTML = "";
  }
  const div = document.createElement("div");
  div.classList.add("container-fluid");
  div.innerHTML = `
      <h2 class="mb-4">Tu Cesta</h2>
      <div class="row ms-0">
        <div class="col-md-8">
          <div class="cart-items">
            <div class="cart-item row align-items-center border">
              ${generateProductHTML(product, quantity)}
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="row d-flex">
            <div class="col-md-6">
              <p class="cart-summary-text">Total</p>
            </div>
            <div class="col-md-6 text-end">
              <p class="cart-summary-price">${(
                product.price * quantity
              ).toFixed(2)}€</p>
            </div>
          </div>
          <div class="d-flex flex-column mt-4">
            <button class="btn btn-secondary mb-2 rounded-0">
              Seguir Comprando
            </button>
            <button class="btn btn-dark rounded-0">Ir al Pago</button>
          </div>
        </div>
      </div>
    `;
  cartSection.appendChild(div);
}
