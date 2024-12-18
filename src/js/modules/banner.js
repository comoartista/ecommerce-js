export function btnWideBaner() {
    const btnWideBaner = document.querySelector("#wide-baner__btn");
    if (btnWideBaner) {
      const wideBanerDropdown = document.querySelector(".wide-baner-dropdown");
      const originalText = "Read more";
      const activeText = "Close";
  
      function updateButtonText(isOpen) {
        btnWideBaner.textContent = isOpen ? activeText : originalText;
        const icon = document.createElement("i");
        icon.classList.add("fas", isOpen ? "fa-minus" : "fa-plus");
        btnWideBaner.append(icon);
      }
  
      updateButtonText(false);
  
      btnWideBaner.addEventListener("click", () => {
        const isOpen = wideBanerDropdown.classList.toggle("show");
        updateButtonText(isOpen);
      });
    }
  }
  