function initializeThemeToggle() {
  const themeButton = document.getElementById('theme-toggle');
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.toggle('light-mode', savedTheme === 'light');
  
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

function bindSectionToggle(buttonId, sectionId) {
  const toggleButton = document.getElementById(buttonId);
  const contentSection = document.getElementById(sectionId);

  if (!toggleButton || !contentSection) return;

  toggleButton.addEventListener('click', () => {
    contentSection.classList.toggle('hidden-section');
    contentSection.classList.toggle('visible-section');
    
    const textElement = toggleButton.querySelector(".toggle-text");
    if (textElement) {
      const isHidden = contentSection.classList.contains('hidden-section');
      textElement.textContent = isHidden ? "Show" : "Hide";
    }
  });
}

function initializeNavAlerts() {
  const navItems = document.querySelectorAll('.nav-link');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
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

function initializeSkillsManager() {
  const skillsContainer = document.getElementById('skills-list');
  const skillInput = document.getElementById('new-skill');
  const addButton = document.getElementById('add-skill-btn');

  let skills = ['C', 'C++', 'Python', 'SQL', 'JavaScript', 'CSS', 'HTML', 'React'];

  function showSkills() {
    skillsContainer.innerHTML = '';

    if (skills.length === 0) {
      skillsContainer.innerHTML = '<p class="no-skills">No skill</p>';
      return;
    }

    skills.forEach((skill, index) => {
      const skillElement = document.createElement('div');
      skillElement.className = 'skill-item';
      skillElement.innerHTML = `<h3>${skill}</h3><button class="delete-skill" data-index="${index}">-</button>`;
      skillsContainer.appendChild(skillElement);
    });
  }

  function addNewSkill() {
    const skillName = skillInput.value.trim();

    if (!skillName) {
      alert('Please enter a skill name');
      return;
    }
    if (skills.includes(skillName)) {
      alert('This skill already exists!');
      return;
    }
    skills.push(skillName);
    skillInput.value = '';
    showSkills();
  }
  function removeSkill(index) {
    skills.splice(index, 1);
    showSkills();
  }

  skillsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-skill')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      removeSkill(index);
    }
  });

  addButton.addEventListener('click', addNewSkill);

  skillInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addNewSkill();
    }
  });

  showSkills();
}
document.addEventListener('DOMContentLoaded', () => {
  initializeThemeToggle();
  initializeNavAlerts();
  initializeCalculatorEvents();
  bindSectionToggle('skills-toggle', 'skills-section');
  bindSectionToggle('hobbies-toggle', 'hobbies-section');
  initializeSkillsManager();
});