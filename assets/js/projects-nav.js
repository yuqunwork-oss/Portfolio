(() => {
  const nav = document.querySelector(".project-nav");
  if (!nav) return;

  // ---- 群組收合／展開 ----
  nav.querySelectorAll(".nav-group-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      const items = btn.nextElementSibling;
      if (items) items.hidden = expanded;
    });
  });

  // ---- 依標題搜尋 ----
  const searchInput = nav.querySelector("#projectSearch");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      nav.querySelectorAll(".nav-group").forEach((group) => {
        const toggle = group.querySelector(".nav-group-toggle");
        const list = group.querySelector(".nav-group-items");
        let anyVisible = false;

        list.querySelectorAll("li").forEach((li) => {
          const match = !query || li.textContent.toLowerCase().includes(query);
          li.style.display = match ? "" : "none";
          if (match) anyVisible = true;
        });

        group.style.display = anyVisible ? "" : "none";
        if (query) {
          toggle.setAttribute("aria-expanded", "true");
          list.hidden = false;
        }
      });
    });
  }

  // ---- 捲動時自動高亮目前所在區塊 ----
  const navLinks = nav.querySelectorAll("a[href^='#']");
  if (!navLinks.length) return;

  const linkById = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    if (document.getElementById(id)) linkById.set(id, link);
  });

  const setActive = (id) => {
    navLinks.forEach((link) => link.classList.remove("active"));
    linkById.get(id)?.classList.add("active");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: "-15% 0px -70% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  linkById.forEach((_, id) => observer.observe(document.getElementById(id)));
})();
