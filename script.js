document.addEventListener("DOMContentLoaded", function () {

  // PRELOADER (no forced delay)
  const preloader = document.getElementById("preloader");

  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";

    setTimeout(() => {
      preloader.style.display = "none";
    }, 500); // small fade-out time
  }


  // BANNER SLIDER
  const wrapper = document.querySelector(".banner-wrapper");
  const slides = document.querySelectorAll(".banner-slide");

  if (!wrapper || slides.length === 0) return;

  let index = 0;
  let slideWidth = slides[0].clientWidth;

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
      wrapper.style.transform = "translateX(0px)";
    }
  });

});
});
