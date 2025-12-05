// ===== PLAY BUTTON =====
const playBtn = document.getElementById("playBtn");

if (playBtn) {
  playBtn.addEventListener("click", () => {
    document.body.style.transition = "0.5s";
    document.body.style.filter = "brightness(3)";

    setTimeout(() => {
      document.body.style.filter = "brightness(1)";
      alert("Game loading...");
    }, 400);
  });
}

// ===== MENU TOGGLE =====
const menuIcon = document.getElementById("menuIcon");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");

if (menuIcon && menuOverlay) {
  menuIcon.addEventListener("click", () => {
    menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

if (menuClose && menuOverlay) {
  menuClose.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });
}

// Fermer le menu en cliquant sur l'overlay (pas sur le panneau)
if (menuOverlay) {
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ===== ABOUT US BUTTON =====
const aboutSection = document.getElementById("aboutSection");
const menuButtons = document.querySelectorAll(".menu_button");

if (menuButtons.length > 0) {
  // Bouton "About us" (index 1)
  menuButtons[1].addEventListener("click", () => {
    if (aboutSection) {
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
      document.body.classList.add("about_active");
      aboutSection.classList.add("active");
      window.scrollTo(0, 0);
    }
  });
}

// ===== BACK TO HOME (via logo ou autre) =====
const logoBox = document.querySelector(".logo_box");
if (logoBox) {
  logoBox.addEventListener("click", () => {
    if (aboutSection) {
      document.body.classList.remove("about_active");
      aboutSection.classList.remove("active");
      window.scrollTo(0, 0);
    }
  });
  logoBox.style.cursor = "pointer";
}

// ===== HEADER AUTO HIDE ON SCROLL (PROPRE) =====
const navbar = document.querySelector(".navbar");
let lastScroll = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }

  lastScroll = currentScroll;
});
