(() => {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const content = document.getElementById("lightboxContent");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  let lastFocused = null;

  const isPdf = (src) => /\.pdf(\?|#|$)/i.test(src);
  const isVideo = (src) => /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(src);

  const open = (src, alt) => {
    lastFocused = document.activeElement;
    content.innerHTML = "";

    if (isPdf(src)) {
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = alt || "PDF 預覽";
      iframe.className = "lightbox-frame";
      content.appendChild(iframe);
    } else if (isVideo(src)) {
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.className = "lightbox-video";
      content.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt || "";
      img.className = "lightbox-img";
      content.appendChild(img);
    }

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const close = () => {
    lightbox.hidden = true;
    content.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const img = trigger.matches("img") ? trigger : trigger.querySelector("img");
      open(trigger.getAttribute("data-lightbox"), img ? img.alt : "");
    });
  });

  closeBtn.addEventListener("click", close);

  // 點背景（非內容本身）就關閉
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) close();
  });
})();
