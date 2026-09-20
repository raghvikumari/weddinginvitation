const video = document.querySelector(".opening-video");
const button = document.querySelector(".tap-button");
const welcomeText = document.querySelector(".welcome-text");

// Play video when button is clicked
button.addEventListener("click", () => {
    video.play();
    button.style.display = "none";
});

// When the video finishes
video.addEventListener("ended", () => {
    video.style.display = "none";
    welcomeText.style.display = "block";
});