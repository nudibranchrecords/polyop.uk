
const navItems = document.querySelectorAll(".glitch-nav-item");
const icons = window.allSymbols;
const GLITCH_INTERVAL = 120;

let isGlitching = false;
let glitchIcon = null;
let iconIndex = 0;

const glitch = () => {
  if (isGlitching) {
    glitchIcon.textContent = icons[iconIndex];
    iconIndex = (iconIndex + 1) % icons.length;
  }
};

setInterval(glitch, GLITCH_INTERVAL);

navItems.forEach((item) => {
  const icon = item.querySelector("span");
  icon.dataset.originalSymbol = icon.textContent;
  item.addEventListener("mouseover", () => {
    glitchIcon = icon;
    isGlitching = true;
  });
  item.addEventListener("mouseout", () => {
    isGlitching = false;
    requestAnimationFrame(() => {
      icon.textContent = icon.dataset.originalSymbol;
    });
  });
});

