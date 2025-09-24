(function () {
  /* ==========================
     LIGHTBOX
  ========================== */
const overlay = document.getElementById("lightboxOverlay");
const lbImage = document.getElementById("lightboxImage");
const lbCaption = document.getElementById("lightboxCaption");
const closeBtn = overlay.querySelector(".lightbox-close");

let isDragging = false;
let startX, startY, currentX = 0, currentY = 0;

function openLightbox(imgEl) {
  const src = imgEl.getAttribute("src");
  const alt = imgEl.getAttribute("alt") || "";
  lbImage.src = src;
  lbImage.alt = alt;
  lbCaption.textContent = alt;

  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // activar clase para zoom
  lbImage.classList.add("lightbox-zoom");
}

function closeLightbox() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  lbImage.src = "";
  lbImage.alt = "";
  lbCaption.textContent = "";
  lbImage.classList.remove("zoomed");
  lbImage.style.transform = ""; // reset transform
  currentX = 0;
  currentY = 0;
  document.body.style.overflow = "";
}

// abrir al click en imagen con clase .lightbox-img
document.addEventListener("click", (e) => {
  if (e.target.classList?.contains("lightbox-img")) {
    openLightbox(e.target);
  }
});

// cerrar con botón
closeBtn.addEventListener("click", closeLightbox);

// cerrar clicando fuera
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeLightbox();
});

// cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) {
    closeLightbox();
  }
});

// evitar cierre al click dentro del contenido
overlay.querySelector(".lightbox-content").addEventListener("click", (e) => {
  e.stopPropagation();
});

// zoom al clickear la imagen dentro del lightbox
lbImage.addEventListener("click", () => {
  lbImage.classList.toggle("zoomed");

  if (!lbImage.classList.contains("zoomed")) {
    // reset si se desactiva el zoom
    currentX = 0;
    currentY = 0;
    lbImage.style.transform = "";
  }
});

// ====== Drag con mouse ======
lbImage.addEventListener("mousedown", (e) => {
  if (!lbImage.classList.contains("zoomed")) return;
  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
  lbImage.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  lbImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.8)`;
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    lbImage.style.cursor = "zoom-out";
  }
});

// ====== Soporte táctil (móvil) ======
lbImage.addEventListener("touchstart", (e) => {
  if (!lbImage.classList.contains("zoomed")) return;
  isDragging = true;
  startX = e.touches[0].clientX - currentX;
  startY = e.touches[0].clientY - currentY;
});

lbImage.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX - startX;
  currentY = e.touches[0].clientY - startY;
  lbImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.8)`;
});

lbImage.addEventListener("touchend", () => {
  isDragging = false;
});
  /* ==========================
     BOTÓN SUBIR
  ========================== */
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ==========================
     CAROUSEL (Bootstrap)
  ========================== */
  const carouselEl = document.getElementById("myCarousel");
  if (carouselEl) {
    new bootstrap.Carousel(carouselEl);
  }

  /* ==========================
     MENU SCROLL
  ========================== */
  const pageLink = document.querySelectorAll(".ud-menu-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });
    });
  });

  function onScroll() {
    const sections = document.querySelectorAll(".ud-menu-scroll");
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (let i = 0; i < sections.length; i++) {
      const currLink = sections[i];
      const val = currLink.getAttribute("href");
      const refElement = document.querySelector(val);
      const scrollTopMinus = scrollPos + 73;

      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document.querySelector(".ud-menu-scroll")?.classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  document.addEventListener("scroll", onScroll);

  /* CARROUSEL MODIFICACION */
    const carousel = document.getElementById("carouselExampleCaptions");
    const fullscreenBtn = document.getElementById("fullscreenBtn");

    fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        // entrar a pantalla completa
        if (carousel.requestFullscreen) {
        carousel.requestFullscreen();
        } else if (carousel.webkitRequestFullscreen) { /* Safari */
        carousel.webkitRequestFullscreen();
        } else if (carousel.msRequestFullscreen) { /* IE11 */
        carousel.msRequestFullscreen();
        }
        fullscreenBtn.textContent = "✖"; // cambia el icono a salir
    } else {
        // salir de pantalla completa
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        }
        fullscreenBtn.textContent = "⛶"; // vuelve al icono de entrar
    }
    });

})();