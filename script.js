'use strict';
const BUSINESS_WHATSAPP = '6589089706'; // Confirm number before publishing.
const menuButton = document.querySelector('.mobile-menu-button');
const siteNav = document.querySelector('.site-nav');
const form = document.querySelector('#enquiry-form');
const lessonSelect = document.querySelector('#lesson-type');
const year = document.querySelector('#copyright-year');
if (year) year.textContent = new Date().getFullYear();

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const opened = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!opened));
    menuButton.setAttribute('aria-label', opened ? 'Open navigation menu' : 'Close navigation menu');
    siteNav.classList.toggle('open', !opened);
  });
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    siteNav.classList.remove('open');
  }));
}

// Selecting a class card updates the enquiry form's selected lesson.
document.querySelectorAll('.js-select-plan').forEach(link => {
  link.addEventListener('click', () => { if (lessonSelect) lessonSelect.value = link.dataset.plan || ''; });
});

// No backend is required: on submit, visitors open WhatsApp with their own prefilled message.
// This does not transmit data automatically; the visitor must send the message within WhatsApp.
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = document.querySelector('#student-name').value.trim();
    const lesson = lessonSelect.value;
    const goal = document.querySelector('#lesson-goal').value.trim();
    const message = [
      `Hi Teacher Matty! My name is ${name}.`,
      `I'm interested in: ${lesson}.`,
      ...(goal ? [`I'd like help with: ${goal}`] : []),
      'Could you tell me more about availability and how to get started?'
    ].join('\n');
    const link = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.location.href = link;
  });
}
