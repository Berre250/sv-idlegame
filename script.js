// ===== PLAY BUTTON =====
const playBtn = document.getElementById("playBtn");
if (playBtn) {
  playBtn.addEventListener("click", () => {
    document.body.style.transition = "0.5s";
    document.body.style.filter = "brightness(3)";
    setTimeout(() => {
      document.body.style.filter = "brightness(1)";
      alert("🚀 Game loading... Prepare for launch!");
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

if (menuOverlay) {
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ===== HEADER HIDE / SHOW ON SCROLL =====
const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    navbar.classList.add("hide");
  } else {
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
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== CURSOR GLOW =====
const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

// Adjust glow size on click
document.addEventListener("mousedown", () => {
  glow.style.width = "100px";
  glow.style.height = "100px";
});

document.addEventListener("mouseup", () => {
  glow.style.width = "160px";
  glow.style.height = "160px";
});

// ===== BLACK HOLE ANIMATION FUNCTION =====
function blackhole(element) {
  const container = document.querySelector(element);
  const h = container.offsetHeight;
  const w = container.offsetWidth;
  const cw = w;
  const ch = h;
  const maxorbit = 255;
  const centery = ch / 2;
  const centerx = cw / 2;

  const startTime = new Date().getTime();
  let currentTime = 0;

  const stars = [];
  let collapse = false;
  let expanse = false;
  let returning = false;

  // Create canvas
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  container.appendChild(canvas);
  const context = canvas.getContext("2d");

  context.globalCompositeOperation = "multiply";

  function setDPI(canvas, dpi) {
    if (!canvas.style.width) canvas.style.width = canvas.width + "px";
    if (!canvas.style.height) canvas.style.height = canvas.height + "px";

    const scaleFactor = dpi / 96;
    canvas.width = Math.ceil(canvas.width * scaleFactor);
    canvas.height = Math.ceil(canvas.height * scaleFactor);
    const ctx = canvas.getContext("2d");
    ctx.scale(scaleFactor, scaleFactor);
  }

  function rotate(cx, cy, x, y, angle) {
    const radians = angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const nx = cos * (x - cx) + sin * (y - cy) + cx;
    const ny = cos * (y - cy) - sin * (x - cx) + cy;
    return [nx, ny];
  }

  setDPI(canvas, 192);

  class Star {
    constructor() {
      const rands = [];
      rands.push(Math.random() * (maxorbit / 2) + 1);
      rands.push(Math.random() * (maxorbit / 2) + maxorbit);

      this.orbital = rands.reduce((p, c) => p + c, 0) / rands.length;

      this.x = centerx;
      this.y = centery + this.orbital;
      this.yOrigin = centery + this.orbital;

      this.speed = ((Math.floor(Math.random() * 2.5) + 1.5) * Math.PI) / 180;
      this.rotation = 0;
      this.startRotation =
        ((Math.floor(Math.random() * 360) + 1) * Math.PI) / 180;

      this.id = stars.length;

      this.collapseBonus = this.orbital - maxorbit * 0.7;
      if (this.collapseBonus < 0) {
        this.collapseBonus = 0;
      }

      this.color = "rgba(255, 255, 255," + (1 - this.orbital / 255) + ")";

      this.hoverPos = centery + maxorbit / 2 + this.collapseBonus;
      this.expansePos =
        centery + (this.id % 100) * -10 + (Math.floor(Math.random() * 20) + 1);

      this.prevR = this.startRotation;
      this.prevX = this.x;
      this.prevY = this.y;

      this.originalY = this.yOrigin;

      stars.push(this);
    }

    draw() {
      if (!expanse && !returning) {
        this.rotation = this.startRotation + currentTime * this.speed;
        if (!collapse) {
          if (this.y > this.yOrigin) {
            this.y -= 2.5;
          }
          if (this.y < this.yOrigin - 4) {
            this.y += (this.yOrigin - this.y) / 10;
          }
        } else {
          this.trail = 1;
          if (this.y > this.hoverPos) {
            this.y -= (this.hoverPos - this.y) / -5;
          }
          if (this.y < this.hoverPos - 4) {
            this.y += 2.5;
          }
        }
      } else if (expanse && !returning) {
        this.rotation = this.startRotation + currentTime * (this.speed / 2);
        if (this.y > this.expansePos) {
          this.y -= Math.floor(this.expansePos - this.y) / -80;
        }
      } else if (returning) {
        this.rotation = this.startRotation + currentTime * this.speed;
        if (Math.abs(this.y - this.originalY) > 2) {
          this.y += (this.originalY - this.y) / 50;
        } else {
          this.y = this.originalY;
          this.yOrigin = this.originalY;
        }
      }

      context.save();
      context.fillStyle = this.color;
      context.strokeStyle = this.color;
      context.beginPath();
      const oldPos = rotate(
        centerx,
        centery,
        this.prevX,
        this.prevY,
        -this.prevR
      );
      context.moveTo(oldPos[0], oldPos[1]);
      context.translate(centerx, centery);
      context.rotate(this.rotation);
      context.translate(-centerx, -centery);
      context.lineTo(this.x, this.y);
      context.stroke();
      context.restore();

      this.prevR = this.rotation;
      this.prevX = this.x;
      this.prevY = this.y;
    }
  }

  // Event listeners for blackhole center
  const centerHover = document.querySelector(".centerHover");

  centerHover.addEventListener("click", function () {
    collapse = false;
    expanse = true;
    returning = false;
    this.classList.add("open");

    // Launch disappearance sequence with upward content animation
    startContentReveal();

    // Start the return cycle after full expansion
    setTimeout(() => {
      expanse = false;
      returning = true;

      // After particles return, reset to normal orbit
      setTimeout(() => {
        returning = false;
        this.classList.remove("open");
      }, 8000);
    }, 25000);
  });

  centerHover.addEventListener("mouseover", function () {
    if (expanse === false) {
      collapse = true;
    }
  });

  centerHover.addEventListener("mouseout", function () {
    if (expanse === false) {
      collapse = false;
    }
  });

  // Animation loop
  function loop() {
    const now = new Date().getTime();
    currentTime = (now - startTime) / 50;

    context.fillStyle = "rgba(0,0,0,0.25)";
    context.fillRect(0, 0, cw, ch);

    for (let i = 0; i < stars.length; i++) {
      if (stars[i] !== undefined) {
        stars[i].draw();
      }
    }

    requestAnimationFrame(loop);
  }

  function init() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, cw, ch);

    for (let i = 0; i < 2500; i++) {
      new Star();
    }
    loop();
  }

  init();
}

// ===== ENHANCED CONTENT REVEAL ANIMATION =====
function startContentReveal() {
  console.log("🚀 Beginning content reveal sequence...");

  // 1. Make introduction text disappear
  const txt = document.querySelector("#txt");
  if (txt) {
    const spans = txt.querySelectorAll("span");
    spans.forEach((span, index) => {
      span.style.transition = `opacity 0.5s ease ${
        index * 0.05
      }s, transform 0.5s ease ${index * 0.05}s`;
      span.style.opacity = "0";
      span.style.transform = "translateY(-20px)";
    });

    setTimeout(() => {
      txt.style.display = "none";
    }, 1000);
  }

  // 2. Make ENTER button disappear
  const centerHover = document.querySelector(".centerHover");
  if (centerHover) {
    centerHover.style.transition = "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)";
    centerHover.style.opacity = "0";
    centerHover.style.transform =
      "translate(-50%, -50%) scale(0.3) rotate(180deg)";
    centerHover.style.pointerEvents = "none";
  }

  // 3. Create spectacular explosion animation
  createBlackholeExplosion();

  // 4. Transition message
  setTimeout(() => {
    showTransitionMessages();
  }, 1000);
}

// ===== BLACKHOLE EXPLOSION ANIMATION =====
function createBlackholeExplosion() {
  const blackholeElement = document.querySelector("#blackhole");
  if (!blackholeElement) return;

  // Add shake effect to blackhole
  blackholeElement.style.animation = "shake 0.5s ease-in-out infinite";

  // Create explosion overlay
  const explosionOverlay = document.createElement("div");
  explosionOverlay.id = "explosionOverlay";
  explosionOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    z-index: 9990;
    opacity: 0;
    pointer-events: none;
  `;
  document.body.appendChild(explosionOverlay);

  // Create explosion effect
  const explosionEffect = document.createElement("div");
  explosionEffect.id = "explosionEffect";
  explosionEffect.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,0,0,0.8) 30%, rgba(0,0,0,0) 70%);
    z-index: 9991;
    pointer-events: none;
    opacity: 0;
    filter: blur(0px);
    box-shadow: 0 0 50px rgba(255, 0, 0, 0.8);
  `;
  document.body.appendChild(explosionEffect);

  // Create explosion particles
  createExplosionParticles();

  // Explosion animation
  setTimeout(() => {
    // 1. Increase overlay opacity
    explosionOverlay.style.transition = "opacity 0.5s ease";
    explosionOverlay.style.opacity = "0.8";

    // 2. First flash
    explosionEffect.style.transition = "all 0.2s ease";
    explosionEffect.style.opacity = "1";
    explosionEffect.style.width = "100px";
    explosionEffect.style.height = "100px";

    setTimeout(() => {
      // 3. Fast expansion
      explosionEffect.style.transition =
        "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
      explosionEffect.style.width = "300px";
      explosionEffect.style.height = "300px";
      explosionEffect.style.filter = "blur(10px)";
      explosionEffect.style.background =
        "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,100,0,0.8) 20%, rgba(0,0,0,0) 60%)";

      // 4. Vibration effect
      document.body.style.animation = "shakeHard 0.3s ease-in-out";

      setTimeout(() => {
        // 5. Large explosion
        explosionEffect.style.transition =
          "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
        explosionEffect.style.width = "1500px";
        explosionEffect.style.height = "1500px";
        explosionEffect.style.opacity = "0.9";
        explosionEffect.style.filter = "blur(30px) brightness(2)";
        explosionEffect.style.background =
          "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,0,100,0.9) 15%, rgba(100,0,255,0.7) 30%, rgba(0,0,0,0) 70%)";

        // 6. Energy wave effect
        createEnergyWave();

        setTimeout(() => {
          // 7. Explosion fade-out
          explosionEffect.style.transition = "all 1s ease";
          explosionEffect.style.opacity = "0";
          explosionEffect.style.filter = "blur(50px) brightness(3)";

          // 8. Overlay fade-out
          explosionOverlay.style.transition = "opacity 1s ease";
          explosionOverlay.style.opacity = "0";

          // 9. Stop shake effect
          blackholeElement.style.animation = "";

          // 10. Make blackhole disappear
          blackholeElement.style.transition = "all 1s ease";
          blackholeElement.style.opacity = "0";
          blackholeElement.style.transform = "scale(0.1)";
          blackholeElement.style.filter = "blur(40px)";

          // 11. Remove explosion elements
          setTimeout(() => {
            explosionEffect.remove();
            explosionOverlay.remove();
            document.body.style.animation = "";

            // Reset blackhole visuals
            blackholeElement.style.opacity = "0";
            blackholeElement.style.display = "none";
          }, 1000);
        }, 500); // Delay before disappearance
      }, 300); // Delay before large explosion
    }, 200); // Delay before expansion
  }, 500); // Initial delay
}

// ===== CREATE EXPLOSION PARTICLES =====
function createExplosionParticles() {
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "explosion-particle";

    // Random size
    const size = Math.random() * 20 + 5;

    // Random color (red, orange, yellow, blue)
    const colors = [
      "rgba(255, 50, 50, 0.9)",
      "rgba(255, 150, 50, 0.9)",
      "rgba(255, 255, 50, 0.9)",
      "rgba(50, 150, 255, 0.9)",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Initial position (center)
    const startX = 50;
    const startY = 50;

    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;

    // Random duration
    const duration = Math.random() * 1 + 0.5;

    particle.style.cssText = `
      position: fixed;
      top: ${startY}vh;
      left: ${startX}vw;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      z-index: 9992;
      pointer-events: none;
      opacity: 0;
      box-shadow: 0 0 ${size}px ${color};
      transform: translate(-50%, -50%);
      animation: particleExplode ${duration}s ease-out forwards;
    `;

    document.body.appendChild(particle);

    // Final position
    particle.style.setProperty("--end-x", `${endX}vw`);
    particle.style.setProperty("--end-y", `${endY}vh`);

    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }
}

// ===== CREATE ENERGY WAVE =====
function createEnergyWave() {
  const wave = document.createElement("div");
  wave.id = "energyWave";

  wave.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid rgba(0, 204, 255, 0.8);
    z-index: 9993;
    pointer-events: none;
    opacity: 0.8;
    box-shadow: 0 0 50px rgba(0, 204, 255, 0.5);
    animation: energyWave 1.5s ease-out forwards;
  `;

  document.body.appendChild(wave);

  setTimeout(() => {
    wave.remove();
  }, 1500);
}

// ===== TRANSITION MESSAGES =====
function showTransitionMessages() {
  const transitionMessage = document.createElement("div");
  transitionMessage.id = "transitionMessage";
  transitionMessage.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #00ccff;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    z-index: 9999;
    opacity: 0;
    text-shadow: 0 0 25px rgba(0, 204, 255, 0.8);
    letter-spacing: 4px;
    white-space: nowrap;
    pointer-events: none;
  `;
  document.body.appendChild(transitionMessage);

  // Animation sequence
  setTimeout(() => {
    // First message
    transitionMessage.textContent = "YOUR JOURNEY BEGINS";
    transitionMessage.style.transition = "opacity 0.8s ease";
    transitionMessage.style.opacity = "1";

    setTimeout(() => {
      // Fade out
      transitionMessage.style.opacity = "0";

      setTimeout(() => {
        // Second message
        transitionMessage.textContent = "";
        transitionMessage.style.color = "#ff3366";
        transitionMessage.style.opacity = "1";

        setTimeout(() => {
          // Fade out
          transitionMessage.style.opacity = "0";

          setTimeout(() => {
            // Third message
            transitionMessage.textContent = "UNIVERSE UNLOCKED";
            transitionMessage.style.color = "#ffcc00";
            transitionMessage.style.opacity = "1";

            setTimeout(() => {
              // Fade out
              transitionMessage.style.opacity = "0";

              setTimeout(() => {
                transitionMessage.remove();

                // Reveal main content
                revealMainContent();
              }, 1000); // Delay before removal
            }, 1500); // Display time
          }, 500); // Delay before 3rd message
        }, 1500); // Display time
      }, 500); // Delay before 2nd message
    }, 1500); // Display time
  }, 1000); // Initial delay
}

// ===== REVEAL MAIN CONTENT =====
function revealMainContent() {
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    mainContent.classList.add("visible");
    mainContent.style.display = "block";

    // Section entry animation
    const sections = mainContent.querySelectorAll("section");
    sections.forEach((section, index) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(60px)";
      section.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${
        index * 0.15
      }s`;

      setTimeout(() => {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }, 100 + index * 150);
    });

    // Auto-scroll to content
    setTimeout(() => {
      mainContent.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500);
  }

  console.log("✅ Content revealed successfully!");
}

// ===== ANIMATE TEXT =====
document.addEventListener("DOMContentLoaded", () => {
  const txtElement = document.querySelector("#txt");
  if (txtElement) {
    const textContent = txtElement.textContent;
    const animateText = () => {
      txtElement.textContent = "";
      textContent.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.animationDelay = index * 0.1 + "s";
        txtElement.appendChild(span);
      });
    };
    animateText();
    txtElement.addEventListener("click", animateText);
  }

  // Initialize blackhole animation
  blackhole("#blackhole");

  // Setup interactive explosion
  setupInteractiveBlackhole();
});

// ===== INTERACTIVE BLACKHOLE EXPLOSION =====
function setupInteractiveBlackhole() {
  const blackholeCanvas = document.querySelector("#blackhole canvas");
  const centerHover = document.querySelector(".centerHover");

  if (blackholeCanvas && centerHover) {
    // Replace old event with improved version
    centerHover.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("💥 Triggering blackhole explosion!");

      // Prevent multiple clicks
      this.style.pointerEvents = "none";

      // ENTER button animation
      this.style.transition = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
      this.style.opacity = "0";
      this.style.transform = "translate(-50%, -50%) scale(0.2) rotate(360deg)";

      // Launch enhanced explosion
      enhancedBlackholeExplosion();
    });
  }
}

// ===== ENHANCED EXPLOSION =====
function enhancedBlackholeExplosion() {
  // 1. Create initial flash effect
  const flash = document.createElement("div");
  flash.className = "flash-effect";
  document.body.appendChild(flash);

  setTimeout(() => {
    flash.remove();
  }, 100);

  // 2. Distortion effect on full body
  document.body.classList.add("distort-effect");
  setTimeout(() => {
    document.body.classList.remove("distort-effect");
  }, 300);

  // 3. Create strobe lights
  const strobe = document.createElement("div");
  strobe.className = "strobe-light";
  document.body.appendChild(strobe);

  // 4. Create multiple concentric waves
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const wave = document.createElement("div");
      wave.className = "concentric-wave";
      wave.style.borderColor =
        i === 0
          ? "rgba(255, 51, 102, 0.6)"
          : i === 1
          ? "rgba(0, 204, 255, 0.6)"
          : "rgba(255, 204, 0, 0.6)";
      document.body.appendChild(wave);

      setTimeout(() => {
        wave.remove();
      }, 1500);
    }, i * 200);
  }

  // 5. Main explosion animation
  setTimeout(() => {
    createBlackholeExplosion();

    // 6. Launch messages + reveal content
    setTimeout(() => {
      strobe.remove();
      showTransitionMessages();
    }, 2500);
  }, 500);
}

// ===== TEXT DISAPPEARANCE AFTER A FEW SECONDS =====
setTimeout(() => {
  const txt = document.querySelector("#txt");
  if (txt) {
    txt.style.transition = "opacity 1.5s ease";
    txt.style.opacity = "0.5";

    setTimeout(() => {
      txt.style.opacity = "0";
      setTimeout(() => {
        txt.style.display = "none";
      }, 1000);
    }, 1000);
  }
}, 5000);

// ===== HERO BUY BUTTONS =====
document
  .querySelectorAll(".hero_buy_btn:not(.unavailable)")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const heroCard = this.closest(".hero_card");
      const heroName = heroCard.querySelector(".hero_name").textContent;
      const heroPrice = heroCard.querySelector(".hero_price").textContent;

      // Purchase animation
      this.textContent = "PURCHASING...";
      this.style.background = "#ffcc00";
      this.style.color = "#000";

      setTimeout(() => {
        this.textContent = "PURCHASED!";
        this.style.background = "#00ff00";
        this.style.color = "#000";
        this.disabled = true;

        // Notification
        alert(
          `🎉 Congratulations! You've unlocked ${heroName} for ${heroPrice}!`
        );
      }, 1500);
    });
  });

// ===== BLACK HOLE CLICK INTERACTION =====
const blackholeImage = document.querySelector(".blackhole_image");
if (blackholeImage) {
  let blackholeSize = 100;

  blackholeImage.addEventListener("click", () => {
    // Reduce blackhole size
    blackholeSize = Math.max(0, blackholeSize - 5);

    // Update display
    const percentageElement = document.querySelector(".blackhole_percentage");
    if (percentageElement) {
      percentageElement.textContent = `${blackholeSize}%`;

      // Shrink animation
      blackholeImage.style.transform = `translate(-50%, -50%) scale(${
        blackholeSize / 100
      })`;

      // If blackhole is destroyed
      if (blackholeSize <= 0) {
        setTimeout(() => {
          alert(
            "🌌 CONGRATULATIONS! You've successfully destroyed the black hole and saved the universe!"
          );

          // Reset after 5 seconds
          setTimeout(() => {
            blackholeSize = 100;
            percentageElement.textContent = "100%";
            blackholeImage.style.transform = "translate(-50%, -50%) scale(1)";
          }, 5000);
        }, 500);
      }
    }
  });
}

// ===== SIMPLIFIED ABOUT US FEATURES =====

// Initialize About Us section
function initAboutUs() {
  console.log("Initializing About Us");

  // Play button in About Us
  const aboutPlayBtn = document.getElementById("aboutPlayBtn");
  if (aboutPlayBtn) {
    aboutPlayBtn.addEventListener("click", function () {
      // Visual effect
      this.style.transform = "scale(0.95)";
      this.style.background = "linear-gradient(90deg, #00ccff, #0066ff)";

      // Message
      setTimeout(() => {
        alert(
          "🚀 Launching Interstellar... Get ready for your cosmic adventure!"
        );

        // Return to main content if needed
        const mainContent = document.querySelector(".main-content");
        if (mainContent) {
          mainContent.style.display = "block";
          document.body.classList.remove("about_active");

          // Scroll to game section
          const gameSection = document.querySelector(".heroes_section");
          if (gameSection) {
            gameSection.scrollIntoView({ behavior: "smooth" });
          }
        }

        // Reset button
        setTimeout(() => {
          this.style.transform = "";
          this.style.background = "linear-gradient(90deg, #ff3366, #ff0033)";
        }, 1000);
      }, 500);
    });
  }

  // Card hover animation
  const devCards = document.querySelectorAll(".dev-card");
  devCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const image = this.querySelector("img");
      if (image) {
        image.style.transform = "scale(1.1)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const image = this.querySelector("img");
      if (image) {
        image.style.transform = "scale(1)";
      }
    });
  });
}

// Navigation to About Us
function showAboutSection() {
  console.log("Navigating to About Us");

  const aboutSection = document.getElementById("aboutSection");
  if (!aboutSection) return;

  // Hide main content
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    mainContent.style.display = "none";
  }

  // Hide team section if exists
  const teamSection = document.getElementById("teamSection");
  if (teamSection) {
    teamSection.style.display = "none";
  }

  // Show About Us
  aboutSection.style.display = "block";
  document.body.classList.add("about_active");

  // Initialize animations
  setTimeout(initAboutUs, 100);
}

// Navigation from menu
document.addEventListener("DOMContentLoaded", function () {
  // About Us button in menu
  const aboutButton = document.getElementById("aboutButton");
  if (aboutButton) {
    aboutButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Close menu
      const menuOverlay = document.getElementById("menuOverlay");
      if (menuOverlay) {
        menuOverlay.classList.remove("active");
        document.body.style.overflow = "";
      }

      // Show About Us
      showAboutSection();
    });
  }

  // Return to main menu button
  const mainMenuButton = document.getElementById("mainMenuButton");
  if (mainMenuButton) {
    mainMenuButton.addEventListener("click", function () {
      // Hide About Us
      const aboutSection = document.getElementById("aboutSection");
      if (aboutSection) {
        aboutSection.style.display = "none";
      }

      // Show main content
      const mainContent = document.querySelector(".main-content");
      if (mainContent) {
        mainContent.style.display = "block";
      }

      document.body.classList.remove("about_active");
    });
  }

  // Logo → back to home
  const logoBox = document.querySelector(".logo_box");
  if (logoBox) {
    logoBox.addEventListener("click", function () {
      // Hide About Us
      const aboutSection = document.getElementById("aboutSection");
      if (aboutSection) {
        aboutSection.style.display = "none";
      }

      // Show main content
      const mainContent = document.querySelector(".main-content");
      if (mainContent) {
        mainContent.style.display = "block";
      }

      document.body.classList.remove("about_active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
