const header = document.querySelector('header');

const menu = document.querySelector('.menu');

menu.addEventListener('click', () => header.classList.toggle('open'));

document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => header.classList.remove('open')));

document.querySelector('form').addEventListener('submit', (event) => { event.preventDefault();
 const toast = document.querySelector('.toast');
 toast.classList.add('show');
 setTimeout(() => toast.classList.remove('show'), 2500);
 });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible');
 }), { threshold: 0.08 });

document.querySelectorAll('main > section').forEach((section, index) => { if (index) section.classList.add('reveal');
 observer.observe(section);
 });

document.querySelectorAll('.service-grid article, .process-grid article, .gallery figure, .review-grid article').forEach((card, index) => { card.style.setProperty('--delay', `${(index % 6) * 70}ms`);
 card.classList.add('mobile-reveal');
 observer.observe(card);
 });

const toothHero = document.querySelector('.hero-tooth');
const toothImage = document.querySelector('.hero-tooth-image');

if (toothHero && toothImage) {
  const revealHero = () => requestAnimationFrame(() => document.body.classList.add('hero-ready'));
  toothImage.complete ? revealHero() : toothImage.addEventListener('load', revealHero, { once: true });

  let heroTicking = false;
  const updateToothHero = () => {
    const travel = Math.max(toothHero.offsetHeight - innerHeight, 1);
    const progress = Math.min(Math.max(-toothHero.getBoundingClientRect().top / travel, 0), 1);

    toothHero.style.setProperty('--hero-progress', progress.toFixed(4));
    toothHero.style.setProperty('--tooth-turn', `${progress * 360}deg`);
    toothHero.style.setProperty('--tooth-tilt', `${7 - progress * 14}deg`);
    toothHero.style.setProperty('--tooth-shift', `${Math.sin(progress * Math.PI) * -30}px`);
    heroTicking = false;
  };

  const requestHeroUpdate = () => {
    if (heroTicking) return;
    heroTicking = true;
    requestAnimationFrame(updateToothHero);
  };

  updateToothHero();
  addEventListener('scroll', requestHeroUpdate, { passive: true });
  addEventListener('resize', requestHeroUpdate, { passive: true });
}
