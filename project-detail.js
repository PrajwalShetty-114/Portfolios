const projectCarouselImages = {
  cinepeek: [
    { src: 'assets/CinePeek.jpg', alt: 'CinePeek movie and TV discovery dashboard with genre filters and a watchlist', caption: 'CinePeek project overview' },
    { src: 'assets/CinePeek_Photos/Screenshot%202026-11-07%20172205.png', alt: 'CinePeek home page with movie and TV discovery controls', caption: 'CinePeek discovery home' },
    { src: 'assets/CinePeek_Photos/Screenshot%202026-11-07%20172246.png', alt: 'CinePeek discovery page with genre, media type, and language filters', caption: 'CinePeek discovery filters' },
    { src: 'assets/CinePeek_Photos/Screenshot%202026-11-07%20172400.png', alt: 'CinePeek matched movie picks and recommendation cards', caption: 'CinePeek matched picks' },
    { src: 'assets/CinePeek_Photos/Screenshot%202026-11-07%20172501.png', alt: 'CinePeek matched picks with saved watchlist controls', caption: 'CinePeek saved titles' },
    { src: 'assets/CinePeek_Photos/Screenshot%202026-11-07%20172636.png', alt: 'CinePeek movie detail cards with ratings and descriptions', caption: 'CinePeek title details' },
    { src: 'assets/CinePeek_Photos/Screenshot%202026-11-07%20172733.png', alt: 'CinePeek watchlist page showing saved titles', caption: 'CinePeek watchlist' }
  ],
  traffic: [
    { src: 'assets/Traffic_Prediction.jpg', alt: 'TrafficFlow AI traffic prediction dashboard with a Bengaluru map and forecast charts', caption: 'TrafficFlow AI project overview' },
    { src: 'assets/Traffic_Prediction_Photos/Screenshot%202026-10-17%20142803.png', alt: 'TrafficFlow AI home page introducing Bengaluru traffic prediction', caption: 'TrafficFlow AI landing page' },
    { src: 'assets/Traffic_Prediction_Photos/Screenshot%202026-10-17%20142825.png', alt: 'TrafficFlow AI guide to getting a traffic prediction in three steps', caption: 'TrafficFlow AI prediction guide' },
    { src: 'assets/Traffic_Prediction_Photos/Screenshot%202026-10-17%20142854.png', alt: 'TrafficFlow AI model selection cards for traffic forecasting', caption: 'TrafficFlow AI model selection' },
    { src: 'assets/Traffic_Prediction_Photos/Screenshot%202026-11-07%20173654.png', alt: 'TrafficFlow AI LSTM forecast dashboard with a Bengaluru map and chart', caption: 'TrafficFlow AI forecast dashboard' },
    { src: 'assets/Traffic_Prediction_Photos/Screenshot%202026-11-07%20173753.png', alt: 'TrafficFlow AI K-means traffic pattern dashboard and location map', caption: 'TrafficFlow AI traffic patterns' }
  ],
  speech: [
    { src: 'assets/AI_Summarization.jpg', alt: 'Speech to Text Studio interface with recording controls, an editable transcript, and AI summary', caption: 'Speech to Text Studio project overview' },
    { src: 'assets/AI_Summmarization_Photos/Screenshot%202026-11-07%20171658.png', alt: 'Speech to Text Studio recording interface with a Kannada transcript', caption: 'Speech to Text Studio Kannada transcription' },
    { src: 'assets/AI_Summmarization_Photos/Screenshot%202026-11-07%20171827.png', alt: 'Speech to Text Studio recording interface with an English transcript', caption: 'Speech to Text Studio English transcription' },
    { src: 'assets/AI_Summmarization_Photos/Screenshot%202026-11-07%20171956.png', alt: 'Speech to Text Studio recording interface with a Hindi transcript and action buttons', caption: 'Speech to Text Studio Hindi transcription' }
  ],
  puppetry: [
    { src: 'assets/Puppetry.jpg', alt: 'String Master Puppetry website featuring performances, tutorials, and a puppet-master dashboard', caption: 'String Master Puppetry project overview' },
    { src: 'assets/Puppetry_Website%20_Photos/Screenshot%202026-11-07%20165201.png', alt: 'String Master Puppetry home page with show and tutorial navigation', caption: 'String Master Puppetry home page' },
    { src: 'assets/Puppetry_Website%20_Photos/Screenshot%202026-11-07%20165240.png', alt: 'String Master Puppetry upcoming puppet shows page', caption: 'String Master Puppetry performances' },
    { src: 'assets/Puppetry_Website%20_Photos/Screenshot%202026-11-07%20165331.png', alt: 'String Master Puppetry shop page with puppet products', caption: 'String Master Puppetry shop' },
    { src: 'assets/Puppetry_Website%20_Photos/Screenshot%202026-11-07%20170646.png', alt: 'String Master Puppetry innovation page with technology-enhanced puppetry projects', caption: 'String Master Puppetry innovation' }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('projectLightbox');
  const closeButton = document.querySelector('[data-lightbox-close]');
  const lightboxImage = dialog?.querySelector('img');

  document.querySelectorAll('[data-project-carousel]').forEach(carousel => {
    const images = projectCarouselImages[carousel.dataset.projectCarousel];
    const trigger = carousel.querySelector('[data-lightbox-trigger]');
    const image = trigger?.querySelector('img');
    const pagination = carousel.querySelector('[data-carousel-pagination]');
    const caption = carousel.querySelector('figcaption');
    const previousPreview = carousel.querySelector('[data-carousel-previous-preview]');
    const nextPreview = carousel.querySelector('[data-carousel-next-preview]');

    if (!images || !trigger || !image || !pagination || !caption || !previousPreview || !nextPreview) {
      console.error('Project carousel is missing its image list or required controls.', carousel);
      return;
    }

    let activeIndex = 0;
    let pointerStart = null;
    let suppressClick = false;
    const dots = images.map((slide, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Show screenshot ${index + 1} of ${images.length}`);
      dot.addEventListener('click', () => showSlide(index));
      pagination.append(dot);
      return dot;
    });

    function showSlide(index) {
      activeIndex = (index + images.length) % images.length;
      const slide = images[activeIndex];
      image.style.opacity = '0.35';
      image.src = slide.src;
      image.alt = slide.alt;
      image.onload = () => { image.style.opacity = ''; };
      image.onerror = () => {
        image.style.opacity = '';
        console.error(`Unable to load project screenshot: ${slide.src}`);
      };
      previousPreview.src = images[(activeIndex - 1 + images.length) % images.length].src;
      nextPreview.src = images[(activeIndex + 1) % images.length].src;
      caption.textContent = slide.caption;
      dots.forEach((dot, dotIndex) => {
        if (dotIndex === activeIndex) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }

    trigger.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      pointerStart = { x: event.clientX, y: event.clientY };
      trigger.setPointerCapture(event.pointerId);
    });
    trigger.addEventListener('pointerup', event => {
      if (!pointerStart) return;
      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) return;
      showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
      suppressClick = true;
      window.setTimeout(() => { suppressClick = false; }, 0);
    });
    trigger.addEventListener('pointercancel', () => { pointerStart = null; });
    trigger.addEventListener('click', event => {
      if (suppressClick) {
        event.preventDefault();
        return;
      }
      if (!dialog || !lightboxImage || typeof dialog.showModal !== 'function') return;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      dialog.showModal();
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.setInterval(() => {
        if (document.visibilityState === 'visible') showSlide(activeIndex + 1);
      }, 5200);
    }

    showSlide(0);
  });

  if (!dialog || !closeButton) return;
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
});
