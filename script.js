/* =====================
   SCRIPT.JS — Research Hub
   ===================== */

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- HAMBURGER MENU ----
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// ---- SCROLL REVEAL ----
function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    if (!target) return; // skip non-numeric (like "2023")
    let current = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counters when stats strip is in view
const statsSection = document.getElementById('stats');
let counterTriggered = false;
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterTriggered) {
            counterTriggered = true;
            document.querySelectorAll('.stat-number[data-target]').forEach(animateCounter);
        }
    });
}, { threshold: 0.5 });
if (statsSection) statsObserver.observe(statsSection);

// ---- PORTFOLIO FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const status = card.dataset.status;
            if (filter === 'all' || status === filter) {
                card.classList.remove('hidden');
                // Re-trigger reveal
                setTimeout(() => card.classList.add('active'), 50);
            } else {
                card.classList.add('hidden');
                card.classList.remove('active');
            }
        });
    });
});

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('open');
        }
    });
});
