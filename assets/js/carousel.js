const buttons = document.querySelectorAll("[data-carousel-btn]");
const dots = document.querySelectorAll("[data-carousel-dot]");

function slide(button) {
  return () => {
    const offset = button.dataset.carouselBtn === "next" ? 1 : -1;
    const slidesContainer = button.closest("[data-carousel]").querySelector("[data-carousel-slides]");
    const slides = slidesContainer.querySelectorAll("[data-carousel-slide]");
    const activeSlide = slidesContainer.querySelector("[data-active]");
    const activeSlideIndex = [...slides].indexOf(activeSlide);
    
    // Calcul du prochain index
    let nextSlideIndex = activeSlideIndex + offset;
    
    // Si nextSlideIndex est inférieur à 0 (premier élément), passer au dernier
    if (nextSlideIndex < 0) {
      nextSlideIndex = slides.length - 1;
    }
    // Si nextSlideIndex dépasse la longueur des slides, revenir au premier
    if (nextSlideIndex >= slides.length) {
      nextSlideIndex = 0;
    }

    // Mise à jour de la diapositive active
    slides[nextSlideIndex].dataset.active = true;
    delete activeSlide.dataset.active;  // Correction ici

    // Mise à jour de l'indicateur de point (dot)
    moveDot(nextSlideIndex)();
  };
}

function moveDot(i) {
  return () => {
    const dot = dots[i];
    dots.forEach((d) => "active" in d.dataset && delete d.dataset.active);
    dot.dataset.active = true;
  };
}

window.addEventListener("DOMContentLoaded", () => {
  buttons.forEach((button) => button.addEventListener("click", slide(button)));
});
