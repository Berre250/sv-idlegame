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

// Fermer le menu en cliquant sur l'overlay
if (menuOverlay) {
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ===== SECTIONS =====
const mainMenuButton = document.getElementById("mainMenuButton");
const teamSection = document.getElementById("teamSection");
const aboutSection = document.getElementById("aboutSection");
const teamButton = document.getElementById("teamButton");
const aboutButton = document.getElementById("aboutButton");

// Main menu
if (mainMenuButton) {
  mainMenuButton.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";

    document.body.classList.remove("team_active", "about_active");
    teamSection?.classList.remove("active");
    aboutSection?.classList.remove("active");

    window.scrollTo(0, 0);
  });
}

// Team
if (teamButton && teamSection) {
  teamButton.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";

    document.body.classList.add("team_active");
    teamSection.classList.add("active");

    window.scrollTo(0, 0);
  });
}

// About
if (aboutButton && aboutSection) {
  aboutButton.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";

    document.body.classList.add("about_active");
    aboutSection.classList.add("active");

    window.scrollTo(0, 0);
  });
}

// ===== BACK TO HOME (LOGO) =====
const logoBox = document.querySelector(".logo_box");

if (logoBox) {
  logoBox.addEventListener("click", () => {
    document.body.classList.remove("team_active", "about_active");
    teamSection?.classList.remove("active");
    aboutSection?.classList.remove("active");
    window.scrollTo(0, 0);
  });

  logoBox.style.cursor = "pointer";
}

// ===== HEADER HIDE / SHOW ON SCROLL =====
const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Scroll vers le bas → cacher
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    navbar.classList.add("hide");
  }
  // Scroll vers le haut → afficher
  else {
    navbar.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});

// ===== GLOBAL SCROLL ANIMATIONS =====
const animatedItems = document.querySelectorAll("[data-animate]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

animatedItems.forEach((el) => observer.observe(el));

// ===== SCROLL PROGRESS =====
const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===== CURSOR GLOW FOLLOW =====
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});
