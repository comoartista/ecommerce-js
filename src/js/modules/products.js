export function createProductElement({ name, imageUrl, prices, slug }) {
  const product = document.createElement("div");
  product.classList.add("product");
  product.innerHTML = `
     <a href="product.html?id=${slug}">
     <i class="fas fa-heart product__fav"></i>
     <div class="image__container">
       <img src="./images/${imageUrl}" class="img" alt="coffee image" />
     </div>
     <div class="product__content">
       <h4 class="product__name">${name}</h4>
       <span class="product__price">from ${prices[0].price}</span>
     </div>
     </a>
    `;
  return product;
}

export function displayProducts(products, limit = products.length) {
  const container = document.querySelector(".products__container");

  container.innerHTML = ""; // Clear existing content
  products.slice(0, limit).forEach((product) => {
    container.appendChild(createProductElement(product));
  });
}

export function handleScreenResize(global) {
  const limit = window.innerWidth >= 768 ? global.coffeeData.length : 4;
  displayProducts(global.coffeeData, limit);
}
