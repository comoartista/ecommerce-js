export function upgradeTotalPrice(price) {
  const quantity = parseInt(document.querySelector("#quantity").value);
  const totalPrice = (quantity * price).toFixed(2).replace(".", ",");
  const partPayment = ((quantity * price) / 3).toFixed(2).replace(".", ",");

  const totalPriceElement = document.querySelector("#total-price");
  const partPaymentElement = document.querySelector("#part-payment");

  if (totalPriceElement) {
    totalPriceElement.textContent = `${totalPrice} €`;
  } else {
    console.warn("Total price element not found.");
  }

  if (partPaymentElement) {
    partPaymentElement.textContent = `${partPayment} €`;
  }
}
