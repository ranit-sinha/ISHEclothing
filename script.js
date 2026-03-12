(function () {

  function safeGet(key) {
    try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch(e) { return []; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }

  /* PRELOADER */
  var preloader = document.getElementById("preloader");
  var PRELOAD_MS = 2200;
  var pageStartTime = Date.now();

  function hidePreloader() {
    if (!preloader) return;
    preloader.style.transition = "opacity 1s ease";
    preloader.style.opacity = "0";
    setTimeout(function() {
      preloader.style.display = "none";
    }, 1000);
  }

  function tryHide() {
    var elapsed = Date.now() - pageStartTime;
    setTimeout(hidePreloader, Math.max(0, PRELOAD_MS - elapsed));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tryHide);
  } else {
    tryHide();
  }
  setTimeout(hidePreloader, 4000);

  /* TOAST */
  function showToast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(function() { t.classList.remove("show"); }, 2400);
  }

  /* STATE */
  var wishlist = safeGet("ishe_wishlist");
  var cart = safeGet("ishe_cart");
  function saveWishlist() { safeSet("ishe_wishlist", wishlist); }
  function saveCart() { safeSet("ishe_cart", cart); }

  /* BADGES */
  function updateBadges() {
    var wb = document.getElementById("wishlistBadge");
    var cb = document.getElementById("cartBadge");
    if (wb) { wb.textContent = wishlist.length; wb.style.display = wishlist.length ? "flex" : "none"; }
    var cartCount = cart.reduce(function(s, i) { return s + i.qty; }, 0);
    if (cb) { cb.textContent = cartCount; cb.style.display = cartCount ? "flex" : "none"; }
  }

  /* WISHLIST RENDER */
  function renderWishlist() {
    var body = document.getElementById("wishlistBody");
    if (!body) return;
    if (wishlist.length === 0) {
      body.innerHTML = '<div class="empty-state"><i class="fa-regular fa-heart" style="font-size:40px;color:#f4b8c8;margin-bottom:12px;display:block"></i><p>Your wishlist is empty</p><span>Tap the heart on any item to save it</span></div>';
      return;
    }
    body.innerHTML = wishlist.map(function(item) {
      return '<div class="wish-item">' +
        '<img src="' + item.img + '" alt="' + item.name + '">' +
        '<div class="wish-item-info"><strong>' + item.name + '</strong><span>' + item.category + '</span><br><span style="color:#8c374e;font-weight:bold">&#8377;' + item.price + '</span></div>' +
        '<button class="item-remove" data-remove-wish="' + item.name + '"><i class="fa-solid fa-xmark"></i></button>' +
        '</div>';
    }).join('');
    body.querySelectorAll("[data-remove-wish]").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var name = btn.getAttribute("data-remove-wish");
        wishlist = wishlist.filter(function(i) { return i.name !== name; });
        saveWishlist(); updateBadges(); renderWishlist();
        document.querySelectorAll(".wish-btn").forEach(function(b) {
          var card = b.closest(".product-card");
          if (card && card.dataset.name === name) b.classList.remove("active");
        });
      });
    });
  }

  /* CART RENDER */
  function renderCart() {
    var body = document.getElementById("cartBody");
    var footer = document.getElementById("cartFooter");
    var total = document.getElementById("cartTotal");
    if (!body) return;
    if (cart.length === 0) {
      body.innerHTML = '<div class="empty-state"><i class="fa-solid fa-bag-shopping" style="font-size:40px;color:#f4b8c8;margin-bottom:12px;display:block"></i><p>Your cart is empty</p><span>Add items to get started</span></div>';
      if (footer) footer.style.display = "none";
      return;
    }
    var sum = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
    if (total) total.textContent = "\u20B9" + sum.toLocaleString("en-IN");
    if (footer) footer.style.display = "block";
    body.innerHTML = cart.map(function(item) {
      return '<div class="cart-item">' +
        '<img src="' + item.img + '" alt="' + item.name + '">' +
        '<div class="cart-item-info">' +
          '<strong>' + item.name + '</strong>' +
          '<span>' + item.category + '</span>' +
          '<div class="cart-item-qty">' +
            '<button class="qty-btn" data-qty="-1" data-name="' + item.name + '">-</button>' +
            '<span class="qty-num">' + item.qty + '</span>' +
            '<button class="qty-btn" data-qty="1" data-name="' + item.name + '">+</button>' +
            '<span style="margin-left:8px;color:#8c374e;font-weight:bold;font-size:13px">&#8377;' + (item.price * item.qty).toLocaleString("en-IN") + '</span>' +
          '</div>' +
        '</div>' +
        '<button class="item-remove" data-remove-cart="' + item.name + '"><i class="fa-solid fa-xmark"></i></button>' +
        '</div>';
    }).join('');
    body.querySelectorAll(".qty-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var name = btn.dataset.name;
        var delta = parseInt(btn.dataset.qty);
        var item = cart.find(function(i) { return i.name === name; });
        if (item) {
          item.qty += delta;
          if (item.qty <= 0) cart = cart.filter(function(i) { return i.name !== name; });
        }
        saveCart(); updateBadges(); renderCart();
      });
    });
    body.querySelectorAll("[data-remove-cart]").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var name = btn.getAttribute("data-remove-cart");
        cart = cart.filter(function(i) { return i.name !== name; });
        saveCart(); updateBadges(); renderCart();
      });
    });
  }

  /* DRAWER HELPERS */
  function openDrawer(drawerId, overlayId) {
    var d = document.getElementById(drawerId);
    var o = document.getElementById(overlayId);
    if (d) d.classList.add("open");
    if (o) o.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer(drawerId, overlayId) {
    var d = document.getElementById(drawerId);
    var o = document.getElementById(overlayId);
    if (d) d.classList.remove("open");
    if (o) o.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* INIT â€” runs after DOM is ready */
  function init() {
    updateBadges();
    renderWishlist();
    renderCart();

    /* Navbar scroll shadow */
    var navbar = document.getElementById("navbar");
    window.addEventListener("scroll", function() {
      if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 10);
      var btn = document.getElementById("backToTop");
      if (btn) btn.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });

    /* Back to top */
    var btt = document.getElementById("backToTop");
    if (btt) btt.addEventListener("click", function() { window.scrollTo({ top: 0, behavior: "smooth" }); });

    /* Menu drawer */
    var menuToggle = document.getElementById("menuToggle");
    var drawerClose = document.getElementById("drawerClose");
    var menuOverlay = document.getElementById("menuOverlay");
    if (menuToggle) menuToggle.addEventListener("click", function() { openDrawer("menuDrawer", "menuOverlay"); });
    if (drawerClose) drawerClose.addEventListener("click", function() { closeDrawer("menuDrawer", "menuOverlay"); });
    if (menuOverlay) menuOverlay.addEventListener("click", function() { closeDrawer("menuDrawer", "menuOverlay"); });
    document.querySelectorAll(".drawer-styles a").forEach(function(a) {
      a.addEventListener("click", function() { closeDrawer("menuDrawer", "menuOverlay"); });
    });

    /* Wishlist drawer */
    var wishlistToggle = document.getElementById("wishlistToggle");
    var wishlistClose = document.getElementById("wishlistClose");
    var wishlistOverlay = document.getElementById("wishlistOverlay");
    if (wishlistToggle) wishlistToggle.addEventListener("click", function() { renderWishlist(); openDrawer("wishlistDrawer", "wishlistOverlay"); });
    if (wishlistClose) wishlistClose.addEventListener("click", function() { closeDrawer("wishlistDrawer", "wishlistOverlay"); });
    if (wishlistOverlay) wishlistOverlay.addEventListener("click", function() { closeDrawer("wishlistDrawer", "wishlistOverlay"); });

    /* Cart drawer */
    var cartToggle = document.getElementById("cartToggle");
    var cartClose = document.getElementById("cartClose");
    var cartOverlay = document.getElementById("cartOverlay");
    if (cartToggle) cartToggle.addEventListener("click", function() { renderCart(); openDrawer("cartDrawer", "cartOverlay"); });
    if (cartClose) cartClose.addEventListener("click", function() { closeDrawer("cartDrawer", "cartOverlay"); });
    if (cartOverlay) cartOverlay.addEventListener("click", function() { closeDrawer("cartDrawer", "cartOverlay"); });

    /* Checkout */
    var checkoutBtn = document.getElementById("checkoutBtn");
    var checkoutBack = document.getElementById("checkoutBack");
    var placeOrderBtn = document.getElementById("placeOrderBtn");
    var checkoutOverlay = document.getElementById("checkoutOverlay");
    var checkoutSummary = document.getElementById("checkoutSummary");

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", function() {
        closeDrawer("cartDrawer", "cartOverlay");
        if (checkoutSummary) {
          var sum = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
          var shipping = sum >= 999 ? 0 : 99;
          checkoutSummary.innerHTML = '<h3>Order Summary</h3>' +
            cart.map(function(i) {
              return '<div class="checkout-summary-item"><span>' + i.name + ' x' + i.qty + '</span><span>&#8377;' + (i.price * i.qty).toLocaleString("en-IN") + '</span></div>';
            }).join('') +
            '<div class="checkout-summary-item"><span>Shipping</span><span>' + (shipping === 0 ? "FREE" : "&#8377;99") + '</span></div>' +
            '<div class="checkout-summary-item"><span>Total Payable</span><span>&#8377;' + (sum + shipping).toLocaleString("en-IN") + '</span></div>';
        }
        setTimeout(function() { if (checkoutOverlay) checkoutOverlay.classList.add("open"); }, 200);
      });
    }
    if (checkoutBack) {
      checkoutBack.addEventListener("click", function() { if (checkoutOverlay) checkoutOverlay.classList.remove("open"); });
    }
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener("click", function() {
        if (checkoutOverlay) checkoutOverlay.classList.remove("open");
        var orderId = "ISHE" + Date.now().toString().slice(-8).toUpperCase();
        var el = document.getElementById("orderId");
        if (el) el.textContent = "Order ID: " + orderId;
        var so = document.getElementById("successOverlay");
        if (so) so.classList.add("open");
        cart = []; saveCart(); updateBadges(); renderCart();
      });
    }
    var successClose = document.getElementById("successClose");
    if (successClose) {
      successClose.addEventListener("click", function() {
        var so = document.getElementById("successOverlay");
        if (so) so.classList.remove("open");
      });
    }

    /* Wish + Cart buttons on cards */
    document.querySelectorAll(".wish-btn").forEach(function(btn) {
      var card = btn.closest(".product-card");
      if (!card) return;
      var name = card.dataset.name;
      if (wishlist.find(function(i) { return i.name === name; })) btn.classList.add("active");
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        var img = card.querySelector("img");
        var existing = wishlist.find(function(i) { return i.name === name; });
        if (existing) {
          wishlist = wishlist.filter(function(i) { return i.name !== name; });
          btn.classList.remove("active");
          showToast("Removed from wishlist");
        } else {
          wishlist.push({ name: name, category: card.dataset.category, price: card.dataset.price, img: img ? img.src : "" });
          btn.classList.add("active");
          showToast("Added to wishlist");
        }
        saveWishlist(); updateBadges();
      });
    });

    document.querySelectorAll(".cart-add-btn").forEach(function(btn) {
      var card = btn.closest(".product-card");
      if (!card) return;
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        var name = card.dataset.name;
        var img = card.querySelector("img");
        var existing = cart.find(function(i) { return i.name === name; });
        if (existing) {
          existing.qty++;
        } else {
          cart.push({ name: name, category: card.dataset.category, price: parseInt(card.dataset.price), img: img ? img.src : "", qty: 1 });
        }
        saveCart(); updateBadges();
        showToast("Added to cart");
        btn.style.transform = "scale(0.85)";
        setTimeout(function() { btn.style.transform = ""; }, 200);
      });
    });

    /* Card tap to reveal (mobile) */
    document.querySelectorAll(".product-card").forEach(function(card) {
      card.addEventListener("click", function(e) {
        if (e.target.closest(".wish-btn") || e.target.closest(".cart-add-btn")) return;
        var isOpen = card.classList.contains("tapped");
        document.querySelectorAll(".product-card.tapped").forEach(function(c) { c.classList.remove("tapped"); });
        if (!isOpen) card.classList.add("tapped");
      });
    });

    /* Search */
    var allProducts = [];
    document.querySelectorAll(".product-card").forEach(function(card) {
      var img = card.querySelector("img");
      allProducts.push({
        name: card.dataset.name || "",
        category: card.dataset.category || "",
        price: card.dataset.price || "",
        img: img ? img.getAttribute("src") : "",
        section: card.closest(".product-section") ? card.closest(".product-section").id : ""
      });
    });

    var searchToggle = document.getElementById("searchToggle");
    var searchOverlay = document.getElementById("searchOverlay");
    var searchClose = document.getElementById("searchClose");
    var searchInput = document.getElementById("searchInput");
    var searchResults = document.getElementById("searchResults");

    function openSearch() {
      if (searchOverlay) searchOverlay.classList.add("open");
      setTimeout(function() { if (searchInput) searchInput.focus(); }, 300);
      document.body.style.overflow = "hidden";
    }
    function closeSearch() {
      if (searchOverlay) searchOverlay.classList.remove("open");
      if (searchInput) searchInput.value = "";
      if (searchResults) searchResults.innerHTML = "";
      document.body.style.overflow = "";
    }

    if (searchToggle) searchToggle.addEventListener("click", openSearch);
    if (searchClose) searchClose.addEventListener("click", closeSearch);
    document.addEventListener("keydown", function(e) { if (e.key === "Escape") closeSearch(); });

    if (searchInput) {
      searchInput.addEventListener("input", function() {
        var q = searchInput.value.trim().toLowerCase();
        if (!q) { searchResults.innerHTML = ""; return; }
        var matches = allProducts.filter(function(p) {
          return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
        });
        if (matches.length === 0) {
          searchResults.innerHTML = '<div class="search-no-results">No results for "' + q + '"</div>';
          return;
        }
        searchResults.innerHTML = matches.map(function(p) {
          return '<div class="search-result-item" data-section="' + p.section + '">' +
            '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">' +
            '<div class="search-result-info"><strong>' + p.name + '</strong><span>' + p.category + ' &middot; &#8377;' + parseInt(p.price).toLocaleString("en-IN") + '</span></div>' +
            '<i class="fa-solid fa-arrow-up-right-from-square" style="color:#c9a0a0;font-size:12px"></i>' +
            '</div>';
        }).join('');
        searchResults.querySelectorAll(".search-result-item").forEach(function(item) {
          item.addEventListener("click", function() {
            var sec = item.dataset.section;
            closeSearch();
            if (sec) {
              var el = document.getElementById(sec);
              if (el) setTimeout(function() { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 300);
            }
          });
        });
      });
    }

    /* Banner slider */
    var wrapper = document.getElementById("bannerWrapper");
    var slides = document.querySelectorAll(".banner-slide");
    var dots = document.querySelectorAll(".bdot");
    if (wrapper && slides.length > 0) {
      var bIndex = 0;
      var clone = slides[0].cloneNode(true);
      clone.setAttribute("loading", "lazy");
      wrapper.appendChild(clone);

      function goTo(n) {
        bIndex = n;
        wrapper.style.transition = "transform 0.7s ease";
        wrapper.style.transform = "translateX(-" + (wrapper.clientWidth * bIndex) + "px)";
        dots.forEach(function(d, i) { d.classList.toggle("active", i === bIndex % slides.length); });
      }

      wrapper.addEventListener("transitionend", function() {
        if (bIndex >= slides.length) {
          wrapper.style.transition = "none";
          bIndex = 0;
          wrapper.style.transform = "translateX(0px)";
          dots.forEach(function(d, i) { d.classList.toggle("active", i === 0); });
        }
      });

      var autoSlide = setInterval(function() { goTo(bIndex + 1); }, 4000);

      dots.forEach(function(dot) {
        dot.addEventListener("click", function() {
          clearInterval(autoSlide);
          goTo(parseInt(dot.dataset.i));
          autoSlide = setInterval(function() { goTo(bIndex + 1); }, 4000);
        });
      });

      var touchStartX = 0;
      wrapper.addEventListener("touchstart", function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
      wrapper.addEventListener("touchend", function(e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          clearInterval(autoSlide);
          goTo(diff > 0 ? bIndex + 1 : Math.max(0, bIndex - 1));
          autoSlide = setInterval(function() { goTo(bIndex + 1); }, 4000);
        }
      }, { passive: true });
    }

    /* Scroll reveal */
    if (typeof IntersectionObserver !== "undefined") {
      var revealEls = document.querySelectorAll(".reveal");
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
        });
      }, { threshold: 0.07 });
      revealEls.forEach(function(el) { observer.observe(el); });
    } else {
      document.querySelectorAll(".reveal").forEach(function(el) { el.classList.add("visible"); });
    }

    /* Service worker */
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function() {
        navigator.serviceWorker.register("/service-worker.js").catch(function() {});
      });
    }

  } /* end init() */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
