const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {
  document.body.style.transition = "0.5s";
  document.body.style.filter = "brightness(3)";

  setTimeout(() => {
    document.body.style.filter = "brightness(1)";
    alert("Game loading...");
  }, 400);
});
