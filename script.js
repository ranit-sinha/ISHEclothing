(function () {

  const preloader = document.getElementById("preloader");
  const PRELOAD_MS = 2200;
  const pageStartTime = Date.now();

  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add("preloader-hidden");
  
  
    setTimeout(function () {
      preloader.style.display = "none";
    }, 1300);
  }


  function tryHide() {
    const elapsed = Date.now() - pageStartTime;
    const remaining = Math.max(0, PRELOAD_MS - elapsed);
    setTimeout(hidePreloader, remaining);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tryHide);
  } else {
  
    tryHide();
  }

  setTimeout(hidePreloader, 4000);


  document.addEventListener("DOMContentLoaded", function () {

    const wrapper = document.querySelector(".banner-wrapper");
    const slides  = document.querySelectorAll(".banner-slide");

    if (!wrapper || slides.length === 0) return;

    let index = 0;

  
    const firstClone = slides[0].cloneNode(true);
    firstClone.setAttribute("loading", "lazy");
    wrapper.appendChild(firstClone);

    function getSlideWidth() {
      return slides[0].clientWidth || wrapper.clientWidth;
    }

    function nextSlide() {
      index++;
      const w = getSlideWidth();
      wrapper.style.transition = "transform 0.6s ease";
      wrapper.style.transform  = "translateX(-" + (w * index) + "px)";
    }

    wrapper.addEventListener("transitionend", function () {
      if (index >= slides.length) {
      
        wrapper.style.transition = "none";
        index = 0;
        wrapper.style.transform = "translateX(0px)";
      }
    });

    setInterval(nextSlide, 4000);

  });

})();
