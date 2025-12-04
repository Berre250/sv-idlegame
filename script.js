const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {
  document.body.style.transition = "0.5s";
  document.body.style.filter = "brightness(3)";

  setTimeout(() => {
    document.body.style.filter = "brightness(1)";
    alert("Game loading...");
  }, 400);
});

const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    // scroll vers le bas → cacher
    navbar.classList.add("hide");
  } else {
    // scroll vers le haut → afficher
    navbar.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});
