const hero = document.querySelector('.hero');
const heroImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1800&q=80'
];

let heroIndex = 0;
function updateHero() {
  hero.style.backgroundImage = `linear-gradient(rgba(28, 20, 18, 0.36), rgba(28, 20, 18, 0.36)), url('${heroImages[heroIndex]}')`;
}
updateHero();
setInterval(() => {
  heroIndex = (heroIndex + 1) % heroImages.length;
  updateHero();
}, 4200);

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const { target } = tab.dataset;
    document.querySelectorAll('.gallery-panel').forEach((panel) => {
      panel.hidden = panel.id !== target;
      panel.classList.toggle('active', panel.id === target);
    });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const editToggle = document.getElementById('editToggle');
const modal = document.getElementById('codeModal');
const confirmEdit = document.getElementById('confirmEdit');
const cancelEdit = document.getElementById('cancelEdit');
const editorPanel = document.getElementById('editorPanel');

editToggle.addEventListener('click', () => {
  modal.hidden = false;
});

cancelEdit.addEventListener('click', () => {
  modal.hidden = true;
});

confirmEdit.addEventListener('click', () => {
  const code = document.getElementById('editCodeInput').value.trim();
  if (code === 'אליהו') {
    modal.hidden = true;
    editorPanel.hidden = false;
    enableInlineTextEditing();
  } else {
    alert('סיסמה שגויה');
  }
});

function enableInlineTextEditing() {
  document.querySelectorAll('h1,h2,h3,p,li,a.btn').forEach((el) => {
    el.contentEditable = 'true';
    el.style.outline = '1px dashed transparent';
    el.addEventListener('focus', () => {
      el.style.outlineColor = '#8fc9c2';
    });
    el.addEventListener('blur', () => {
      el.style.outlineColor = 'transparent';
    });
  });
}

document.getElementById('applyTheme').addEventListener('click', () => {
  const root = document.documentElement;
  root.style.setProperty('--primary', document.getElementById('primaryColor').value);
  root.style.setProperty('--bg', document.getElementById('bgColor').value);
  root.style.setProperty('--accent', document.getElementById('accentColor').value);
});
