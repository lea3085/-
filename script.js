const hero = document.querySelector('.hero');
const images = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=1800&q=80'
];
let index = 0;
setInterval(() => {
  index = (index + 1) % images.length;
  hero.style.backgroundImage = `linear-gradient(rgba(31, 23, 20, 0.35), rgba(31, 23, 20, 0.35)), url('${images[index]}')`;
}, 4000);

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const target = tab.dataset.target;
    document.querySelectorAll('.gallery-panel').forEach((panel) => {
      panel.hidden = panel.id !== target;
      panel.classList.toggle('active', panel.id === target);
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const editBtn = document.getElementById('editToggle');
const modal = document.getElementById('codeModal');
const confirmEdit = document.getElementById('confirmEdit');
const cancelEdit = document.getElementById('cancelEdit');
const editorPanel = document.getElementById('editorPanel');

editBtn.addEventListener('click', () => (modal.hidden = false));
cancelEdit.addEventListener('click', () => (modal.hidden = true));
confirmEdit.addEventListener('click', () => {
  const code = document.getElementById('editCodeInput').value;
  if (code === 'TAMAR2026') {
    modal.hidden = true;
    editorPanel.hidden = false;
    enableTextEditing();
  } else {
    alert('קוד שגוי');
  }
});

function enableTextEditing() {
  document.querySelectorAll('h1,h2,h3,p,li,a.btn').forEach((el) => {
    el.contentEditable = 'true';
    el.style.outline = '1px dashed transparent';
    el.addEventListener('focus', () => (el.style.outlineColor = '#78b8b0'));
    el.addEventListener('blur', () => (el.style.outlineColor = 'transparent'));
  });
}

document.getElementById('applyTheme').addEventListener('click', () => {
  document.documentElement.style.setProperty('--primary', document.getElementById('primaryColor').value);
  document.documentElement.style.setProperty('--bg', document.getElementById('bgColor').value);
  document.documentElement.style.setProperty('--accent', document.getElementById('accentColor').value);
});
