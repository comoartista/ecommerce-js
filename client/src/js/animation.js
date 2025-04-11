import { gsap } from "gsap";
export function menuAnimation() {
  let tl = gsap.timeline({ paused: true });

  tl.to(".menu-overlay", {
    duration: 0.8,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ease: "power2.out",
  });

  tl.from(
    ".menu-link",
    {
      opacity: 0,
      y: 40,
      stagger: 0.03,
      duration: 0.5,
      ease: "power1.out",
    },
    "<"
  );

  tl.to(
    ".menu-divider",
    {
      duration: 0.8,
      width: "100%",
      ease: "power2.out",
    },
    "<"
  );

  function openMenu() {
    document.querySelector(".menu-overlay").style.pointerEvents = "all";
    tl.restart();
  }

  function closeMenu() {
    tl.reverse();
    setTimeout(() => {
      document.querySelector(".menu-overlay").style.pointerEvents = "none";
    }, 800);
  }

  document.querySelector(".menu-open-btn").addEventListener("click", openMenu);
  document
    .querySelector(".menu-close-btn")
    .addEventListener("click", closeMenu);
}
