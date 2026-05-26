if (window.lucide) {
  window.lucide.createIcons();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal, .content-block').forEach((item) => observer.observe(item));
