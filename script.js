document.addEventListener("DOMContentLoaded", () => {
  // Small terminal typing effect
  const typed = document.getElementById("typed-line");
  const phrases = [
    "Learning new technologies...",
    "Building meaningful projects...",
    "Solving real-world problems...",
    "Turning ideas into reality..."
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    if (!typed) return;

    const current = phrases[phraseIndex];

    if (!deleting) {
      typed.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      typed.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(typeLoop, deleting ? 35 : 58);
  }
  setTimeout(typeLoop, 900);

  // Reveal sections as they enter the viewport
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Featured project carousel: highlight the centered card and update the position dots while swiping.
  const projectTrack = document.getElementById("projectTrack");
  if (projectTrack) {
    const projectSlides = [...projectTrack.querySelectorAll("[data-project-slide]")];
    const projectDots = [...document.querySelectorAll(".project-pagination span")];
    let activeProjectIndex = 0;
    let scrollFrame = 0;

    function updateActiveProject() {
      const trackBounds = projectTrack.getBoundingClientRect();
      const trackCenter = trackBounds.left + trackBounds.width / 2;
      let nearestIndex = 0;
      let nearestDistance = Infinity;

      projectSlides.forEach((slide, index) => {
        const bounds = slide.getBoundingClientRect();
        const distance = Math.abs(bounds.left + bounds.width / 2 - trackCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      if (nearestIndex !== activeProjectIndex && typeof navigator.vibrate === "function") {
        navigator.vibrate(8);
      }
      activeProjectIndex = nearestIndex;
      projectSlides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === activeProjectIndex);
      });
      projectDots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === activeProjectIndex);
      });
    }

    projectTrack.addEventListener("scroll", () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        updateActiveProject();
        scrollFrame = 0;
      });
    }, { passive: true });

    let pointerStartX = 0;
    let scrollStartX = 0;
    let pointerIsDragging = false;
    let pointerMoved = false;
    let suppressProjectClick = false;

    projectTrack.addEventListener("pointerdown", event => {
      if (event.pointerType !== "mouse" || event.button !== 0 || event.target.closest("button")) return;
      pointerIsDragging = true;
      pointerMoved = false;
      pointerStartX = event.clientX;
      scrollStartX = projectTrack.scrollLeft;
      projectTrack.classList.add("is-dragging");
      const captureTarget = event.target.closest(".project-preview-card-link") || projectTrack;
      captureTarget.setPointerCapture(event.pointerId);
    });

    projectTrack.addEventListener("pointermove", event => {
      if (!pointerIsDragging) return;
      const delta = event.clientX - pointerStartX;
      if (Math.abs(delta) > 6) pointerMoved = true;
      if (pointerMoved) {
        projectTrack.scrollLeft = scrollStartX - delta;
        event.preventDefault();
      }
    });

    projectTrack.addEventListener("click", event => {
      if (!suppressProjectClick) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      suppressProjectClick = false;
    }, true);

    function finishPointerDrag() {
      if (pointerMoved) {
        suppressProjectClick = true;
        window.setTimeout(() => { suppressProjectClick = false; }, 450);
      }
      pointerIsDragging = false;
      pointerMoved = false;
      projectTrack.classList.remove("is-dragging");
    }

    projectTrack.addEventListener("pointerup", finishPointerDrag);
    projectTrack.addEventListener("pointercancel", finishPointerDrag);
    projectTrack.addEventListener("lostpointercapture", finishPointerDrag);

    window.addEventListener("resize", updateActiveProject, { passive: true });
    updateActiveProject();
  }

  // Contribution calendar — deterministic mock data for a stable portfolio design.
  const grid = document.getElementById("contributionGrid");
  if (grid) {
    const seed = [
      0, 1, 0, 2, 3, 1, 0, 2, 4, 3, 2, 1, 0, 2, 3, 4, 2, 1, 0, 1, 3, 2, 4, 3, 1, 0,
      1, 2, 3, 2, 4, 3, 2, 1, 0, 2, 3, 4, 3, 1, 2, 0, 1, 3, 4, 2, 1, 0, 2, 3, 1, 4, 2,
      1, 0, 2, 3, 4, 2, 3, 1, 0, 1, 2, 4, 3, 2, 1, 0, 2, 3, 4, 1, 2, 3, 0, 1, 4, 3,
      2, 1, 0, 2, 3, 4, 2, 1, 3, 0, 1, 2, 4, 3, 2, 0, 1, 3, 4, 2, 1, 0, 2, 3, 1, 4
    ];
    seed.forEach(level => {
      const cell = document.createElement("span");
      if (level) cell.classList.add(`l${level}`);
      grid.appendChild(cell);
    });
  }

  // Current year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
