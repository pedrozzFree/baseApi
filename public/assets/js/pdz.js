/* Pedrozz Mods Fez essa budega aqui, deixa pelo menos os créditos seu batore*/

document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', function () {
      const chevron = this.querySelector('.chevron');
      const submenu = this.nextElementSibling;
      
      submenu.classList.toggle('show');
      chevron.classList.toggle('fa-rotate-180');

      document.querySelectorAll('.submenu').forEach(otherSubmenu => {
        if (otherSubmenu !== submenu && otherSubmenu.classList.contains('show')) {
          otherSubmenu.classList.remove('show');
          const otherChevron = otherSubmenu.previousElementSibling.querySelector('.chevron');
          if (otherChevron) otherChevron.classList.remove('fa-rotate-180');
        }
      });
    });
  });
});

document.getElementById('verifyBtn').addEventListener('click', function () {
const apiKey = document.getElementById('apiKeyInput').value.trim();
const resultDiv = document.getElementById('apiKeyResult');

resultDiv.className = "api-key-result";
resultDiv.textContent = "";

this.classList.add('pulse');
setTimeout(() => this.classList.remove('pulse'), 500);

if (!apiKey) {
resultDiv.innerHTML = `⚠️ <strong>Digite uma API Key.</strong>`;
resultDiv.className = "api-key-result invalid";
return;
}

setTimeout(() => {
fetch(`/api/apikey/verificar?apikey=${encodeURIComponent(apiKey)}`)
.then(response => {
if (!response.ok) throw new Error("Erro ao verificar a chave.");
return response.json();
})
.then(data => {
if (data.error) {
resultDiv.innerHTML = `<strong>Erro:</strong><br>${data.error}`;
resultDiv.className = "api-key-result invalid";
} else {
resultDiv.innerHTML = `✅ <strong>API Key válida!</strong><br>Requests restantes: ${data.request}`;
resultDiv.className = "api-key-result valid";
}
})
.catch(err => {
resultDiv.innerHTML = `<strong>Erro na verificação:</strong><br>${err.message}`;
resultDiv.className = "api-key-result invalid";
});
}, 800);
});

document.getElementById('themeToggle').addEventListener('click', function() {
document.body.classList.toggle('dark-theme');

const isDark = document.body.classList.contains('dark-theme');
localStorage.setItem('darkTheme', isDark);

this.classList.add('pulse');
setTimeout(() => this.classList.remove('pulse'), 500);
});

document.getElementById('menuToggle').addEventListener('click', function() {
document.querySelector('.sidebar').classList.toggle('active');

this.classList.add('pulse');
setTimeout(() => this.classList.remove('pulse'), 500);
});

if (localStorage.getItem('darkTheme') === 'true') {
document.body.classList.add('dark-theme');
}

const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
item.addEventListener('mouseenter', function() {
this.style.transform = 'translateX(5px)';
});

item.addEventListener('mouseleave', function() {
this.style.transform = 'translateX(0)';
});
});

const animateOnScroll = () => {
const cards = document.querySelectorAll('.card, .api-key-card, .recent-activity');
cards.forEach((card, index) => {
const cardPosition = card.getBoundingClientRect().top;
const screenPosition = window.innerHeight / 1.3;

if (cardPosition < screenPosition) {
card.style.animation = `fadeInUp 0.5s ease-out forwards ${index * 0.1}s`;
}
});
};

animateOnScroll();

window.addEventListener('scroll', animateOnScroll);

setInterval(() => {
const randomElement = document.querySelectorAll('.card-icon, .activity-icon')[Math.floor(Math.random() * 6)];
randomElement.classList.add('pulse');
setTimeout(() => randomElement.classList.remove('pulse'), 1000);
}, 5000);
