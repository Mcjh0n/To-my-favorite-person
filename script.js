const intro = document.querySelector("#intro");
const openButton = document.querySelector("#open-letter");
const music = document.querySelector("#love-song");
const musicToggle = document.querySelector("#music-toggle");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector("#lightbox-close");

document.body.classList.add("is-locked");

if (music && music.getAttribute("src")) {
  musicToggle.classList.add("is-paused");
} else {
  musicToggle.hidden = true;
}

function tryPlayMusic() {
  if (!music || !music.getAttribute("src")) return;

  music.volume = 0.42;
  const playPromise = music.play();

  if (playPromise) {
    playPromise
      .then(() => {
        musicToggle.classList.remove("is-paused");
        musicToggle.setAttribute("aria-label", "Pause music");
      })
      .catch(() => {
        musicToggle.classList.add("is-paused");
        musicToggle.setAttribute("aria-label", "Play music");
      });
  }
}

openButton.addEventListener("click", () => {
  intro.classList.add("is-hidden");
  document.body.classList.remove("is-locked");
  tryPlayMusic();
});

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    tryPlayMusic();
  } else {
    music.pause();
    musicToggle.classList.add("is-paused");
    musicToggle.setAttribute("aria-label", "Play music");
  }
});

document.querySelectorAll("[data-image]").forEach((frame) => {
  const source = frame.dataset.image;
  const probe = new Image();

  probe.onload = () => {
    if (!frame.classList.contains("gallery-item")) {
      frame.style.backgroundImage = `url("${source}")`;
    }
    frame.classList.add("has-image");
  };

  probe.src = source;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".section-reveal").forEach((section) => {
  revealObserver.observe(section);
});

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const source = item.dataset.image;
    const probe = new Image();

    probe.onload = () => {
      lightboxImage.src = source;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    };

    probe.onerror = () => {
      item.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(0)" }
        ],
        { duration: 260, easing: "ease-out" }
      );
    };

    probe.src = source;
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});
