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

  // Contribution calendar — deterministic mock data for a stable portfolio design.
  const grid = document.getElementById("contributionGrid");
  if (grid) {
    const seed = [
      0,1,0,2,3,1,0,2,4,3,2,1,0,2,3,4,2,1,0,1,3,2,4,3,1,0,
      1,2,3,2,4,3,2,1,0,2,3,4,3,1,2,0,1,3,4,2,1,0,2,3,1,4,2,
      1,0,2,3,4,2,3,1,0,1,2,4,3,2,1,0,2,3,4,1,2,3,0,1,4,3,
      2,1,0,2,3,4,2,1,3,0,1,2,4,3,2,0,1,3,4,2,1,0,2,3,1,4
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
