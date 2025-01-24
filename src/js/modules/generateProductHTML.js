export function generateProductHTML(
  { name, description, color, imageUrl, price },
  quantity
) {
  quantity = quantity || 1;
  price = price || 0;
  const totalPrice = (price * quantity).toFixed(2);

  return `
      <div class="d-flex gap-3">
        <div style="width: 75px; height: 100px">
          <img src="${imageUrl}" alt="${name}" class="w-100" />
        </div>
        <div class="w-100">
          <div class="pl-1 d-flex justify-content-between align-items-center">
            <h5 class="fs-6 fw-bold my-0">${name}</h5>
            <button class="btn" style="all: unset; font-size: 14px">
              <i class="bi bi-trash3 small"></i> Eliminar
            </button>
          </div>
          <p class="my-0 fw-bold">${description}</p>
          <p class="my-0 small">Color: ${color}</p>
          <div class="d-flex justify-content-between small mt-2">
            <p>Cantidad</p>
            <span class="fw-bold">${quantity}</span>
          </div>
        </div>
      </div>
      <hr />
      <div class="d-flex justify-content-between align-items-center">
        <span>Total</span><span>${totalPrice}€</span>
      </div>
    `;
}
