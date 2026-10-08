const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main .page-section[id]');
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('#nav-links');
const usernameInput = document.querySelector('#username');
const greetingResult = document.querySelector('#result');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

function showGreeting() {
    const name = usernameInput.value.trim();
    greetingResult.textContent = name ? `Lovely to meet you, ${name}!` : 'Add your name and I’ll say hello.';
}

document.querySelector('.greet-button').addEventListener('click', showGreeting);
usernameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') showGreeting();
});

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navList.classList.toggle('is-open', !isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        navList.classList.remove('is-open');
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        navList.classList.remove('is-open');
        menuToggle.focus();
    }
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const message = contactForm.elements.message.value.trim();
    const subject = `A note from ${name}`;
    const body = `${message}\n\nFrom: ${name}\nEmail: ${email}`;
    const emailLink = document.createElement('a');

    emailLink.href = `mailto:michelledelacruz422@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    emailLink.textContent = 'Open your email app to send it.';
    formStatus.replaceChildren(
        document.createTextNode('Your message is ready. '),
        emailLink
    );
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));
