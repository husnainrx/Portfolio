function initializeThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeStatus = document.querySelector('.theme-status');

  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';

  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    updateThemeColors('light');
    updateThemeStatus('ON', '#FFD700', '0 0 8px rgba(255, 215, 0, 0.5)');
  } else {
    updateThemeColors('dark');
    updateThemeStatus('OFF', '', '');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeColors(isLight ? 'light' : 'dark');

    if (isLight) {
      updateThemeStatus('ON', '#FFD700', '0 0 8px rgba(255, 215, 0, 0.5)');
    } else {
      updateThemeStatus('OFF', '', '');
    }
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => (themeToggle.style.transform = ''), 150);
  });
}

function updateThemeStatus(text, color, shadow) {
  const themeStatus = document.querySelector('.theme-status');
  if (!themeStatus) return;

  themeStatus.textContent = text;
  themeStatus.style.color = color;
  themeStatus.style.textShadow = shadow;
}

function updateThemeColors(theme) {
  const root = document.documentElement;

  if (theme === 'light') {
    root.style.setProperty('--bg-primary', '#f8fafc');
    root.style.setProperty('--text-primary', '#1e293b');
  } else {
    root.style.setProperty('--bg-primary', '#0f0f23');
    root.style.setProperty('--text-primary', '#f8fafc');
  }
}

function bindSectionToggle(btnId, sectionId) {
  const button = document.getElementById(btnId);
  const section = document.getElementById(sectionId);

  if (!button || !section) return;

  button.addEventListener('click', () => {
    section.classList.toggle('hidden-section');

    const text = button.querySelector(".toggle-text");
    if (text) {
      text.textContent = section.classList.contains('hidden-section') ? "Show" : "Hide";
    }
  });
}

function initializeNavAlerts() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      alert(`You clicked: ${e.target.textContent}`);
    });
  });
}

function initializeCalculatorEvents() {
  const display = document.getElementById("N-Data");
  if (!display) return;

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('calc-btn')) {
      display.value += e.target.textContent;
    }

    if (e.target.classList.contains('calc-clear')) {
      display.value = "";
    }

    if (e.target.classList.contains('calc-equal')) {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeThemeToggle();
  initializeNavAlerts();
  initializeCalculatorEvents();
  bindSectionToggle('skills-toggle', 'skills-section');
  bindSectionToggle('hobbies-toggle', 'hobbies-section');
});
