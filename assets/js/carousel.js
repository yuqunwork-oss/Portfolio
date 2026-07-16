(() => {
  document.querySelectorAll(".photo-carousel").forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    if (!slides.length) return;

    const currentEl = carousel.querySelector(".carousel-current");
    const totalEl = carousel.querySelector(".carousel-total");
    let index = 0;

    const show = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((slide, n) => {
        slide.classList.toggle("active", n === index);
        if (n !== index) slide.querySelector("video")?.pause();
      });
      if (currentEl) currentEl.textContent = String(index + 1);
    };

    if (totalEl) totalEl.textContent = String(slides.length);
    show(0);

    carousel
      .querySelector(".carousel-prev")
      ?.addEventListener("click", () => show(index - 1));
    carousel
      .querySelector(".carousel-next")
      ?.addEventListener("click", () => show(index + 1));
  });
})();
