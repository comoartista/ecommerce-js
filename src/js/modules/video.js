export function playVideo() {
    const video = document.querySelector(".hero__video");
    const toggleButton = document.getElementById("playButton");
  
    if (video && toggleButton) {
      toggleButton.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          toggleButton.textContent = "Pause";
        } else {
          video.pause();
          toggleButton.textContent = "Play";
        }
      });
    }
  }