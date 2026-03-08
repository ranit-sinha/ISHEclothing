document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById("preloader");
    
    
    setTimeout(function() {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        
        
    setTimeout(function() {
        preloader.style.display = "none";}, 1200);
    }, 2000); 
});

const wrapper = document.querySelector(".banner-wrapper");
const slides = document.querySelectorAll(".banner-slide");

let index = 0;
let slideWidth;
window.addEventListener("load", () => {
  slideWidth = slides[0].clientWidth;
});


const firstClone = slides[0].cloneNode(true);
wrapper.appendChild(firstClone);

function nextSlide() {
  index++;
  wrapper.style.transition = "transform 0.6s ease";
  wrapper.style.transform = `translateX(-${slideWidth * index}px)`;
}

setInterval(nextSlide, 4000);

wrapper.addEventListener("transitionend", () => {
  if (index === slides.length) {
    wrapper.style.transition = "none";
    index = 0;
    wrapper.style.transform = `translateX(0px)`;
  }
});



