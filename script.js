const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const closeMenu = document.querySelector(".close-mobile-menu");


document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const arrows = document.querySelectorAll(".arrow");

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    updateDots(index);
  }

  function updateDots(index) {
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      if (arrow.classList.contains("left")) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      } else {
        currentIndex = (currentIndex + 1) % slides.length;
      }
      showSlide(currentIndex);
    });
  });

  // Initialize the first slide
  showSlide(currentIndex);
});

document.addEventListener("DOMContentLoaded", function () {
  if (!hamburger || !mobileMenu || !overlay) {
    console.error("One or more elements not found in the DOM.");
    return;
  }

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
  });
});


if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  ManageModeIcon();
});


closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
  hamburger.classList.remove("active");
});


const scrollContainer = document.getElementById("scrollContainer");
const scrollBar = document.getElementById("scrollBar");

scrollContainer.addEventListener("scroll", () => {
  const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
  if (scrollWidth === 0) return;
  const scrollLeft = scrollContainer.scrollLeft;
  const scrollPercent = (scrollLeft / scrollWidth) * 100;  
  scrollBar.style.transform = `translateX(${scrollPercent}%)`;
});




function ManageModeIcon() {
  const theme = localStorage.getItem("theme");
  const img = document.createElement("img");
  if(theme == "dark") img.src = "./assets/sun.png";
  else img.src = "./assets/moon.png";
  img.style.width = "20px";
  darkModeToggle.replaceChildren(img);
} 

ManageModeIcon();