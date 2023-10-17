import { init } from "./main.js";

init();

var mainHeader = document.querySelector("#main-header");
var heroNameElement = document.querySelector("#hero-details__name");
var heroSection = document.querySelector("#hero-section");

function _updateMainHeaderGlowiness() {
  var y1 = mainHeader.getBoundingClientRect().height;
  var y2 = heroNameElement.getBoundingClientRect().top;
  
  mainHeader.classList.toggle("glow", y1 >= y2);
}

new ResizeObserver(_updateMainHeaderGlowiness).observe(heroSection);
document.addEventListener("scroll", _updateMainHeaderGlowiness);
