import { createCartItemHTML, getCart, removeFromCart } from "./cart.js";

// Display the cart modal with current cart items
export function displayModal() {
  const cart = getCart();

  if (!cart.length) {
    console.error("Cart is empty.");
    return;
  }

  const modalDialog = document.querySelector(".modal-dialog");
  const modalElement = document.querySelector(".modal-cart");

  if (!modalDialog || !modalElement) {
    console.error("Modal elements not found!");
    return;
  }

  // Initialize Bootstrap modal
  const modal = new bootstrap.Modal(modalElement, { keyboard: false });

  // Generate HTML for cart items
  const cartItemsHTML = cart
    .map((product) => createCartItemHTML(product, product.quantity))
    .join("");

  // Inject modal content
  modalDialog.innerHTML = `
    <div class="modal-content px-2 h-100 border-0 rounded-0 shadow-sm">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Cesta (<span id="cart-count-modal">${cart.length}</span>)</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body d-flex flex-column h-100 overflow-auto">
        <div id="cart-items">
          ${cartItemsHTML}
        </div>
        <div class="mb-5 d-flex flex-column gap-2 align-items-center mt-auto">
          <button class="btn rounded-0 border-dark button-check w-100">CONTINUAR LA COMPRA</button>
          <button id="button-cart" class="btn btn-dark rounded-0 w-100 button-cart">IR AL CARRITO</button>
        </div>
      </div>
    </div>
  `;

  modal.show();

  // Delegate events for dynamic content inside modal
  modalDialog.addEventListener("click", (e) => {
    // Handle remove button inside cart
    const removeBtn = e.target.closest(".remove-btn");
    if (removeBtn) {
      const productId = removeBtn.dataset.slug;
      removeFromCart(productId);

      const updatedCart = getCart();

      if (!updatedCart.length) {
        modal.hide();
        renderEmptyCartModal();
        return;
      }

      // Re-render updated cart list
      const updatedHTML = updatedCart
        .map((product) => createCartItemHTML(product, product.quantity))
        .join("");

      document.querySelector("#cart-items").innerHTML = updatedHTML;

      // Update count badge
      const countEl = document.querySelector("#cart-count-modal");
      if (countEl) countEl.textContent = updatedCart.length;
    }

    // Redirect to full cart page
    if (e.target.id === "button-cart") {
      window.location.href = "cart.html";
    }
  });
}

// Renders a message when cart is empty
function renderEmptyCartModal() {
  const modalDialog = document.querySelector(".modal-dialog");
  modalDialog.innerHTML = `
    <div class="modal-content px-2 h-100 border-0 rounded-0 shadow-sm">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Your cart is empty</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body d-flex flex-column h-100 overflow-auto">
        <p>Your cart is empty. Please add some products.</p>
        <button class="btn btn-dark w-100" data-bs-dismiss="modal">Back to the shop</button>
      </div>
    </div>
  `;
}
