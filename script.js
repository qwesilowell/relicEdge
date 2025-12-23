// Navigation and Section Management
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

let typingTimeout; // track timeout globally

function startTypingEffect(element) {
    if (!element) return;

    const fullText = element.textContent;
    element.textContent = ''; // clear initial text
    let index = 0;

    function type() {
        if (index < fullText.length) {
            element.textContent += fullText[index];
            index++;
            typingTimeout = setTimeout(type, 120); // typing speed
        } else {
            // wait 2s, then delete smoothly
            typingTimeout = setTimeout(deleteText, 2000);
        }
    }

    function deleteText() {
        if (index > 0) {
            element.textContent = fullText.slice(0, index - 1);
            index--;
            typingTimeout = setTimeout(deleteText, 80); // delete speed
        } else {
            // restart typing after short pause
            typingTimeout = setTimeout(type, 500);
        }
    }

    type();
}

function stopTypingEffect() {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
}

// Integrate with showSection
function showSection(sectionId) {
    const current = document.querySelector('.section.active');
    const next = document.getElementById(sectionId);

    if (current === next) return;

    // section exit
    if (current) {
        current.classList.remove('active');
        current.classList.add('exiting');
        if (current.id === 'home') stopTypingEffect();
        setTimeout(() => current.classList.remove('exiting'), 450);
    }

    // section enter
    if (next) {
        setTimeout(() => {
            next.classList.add('active');
            if (sectionId === 'home') {
                const typingText = next.querySelector('.typing-text');
                if (typingText) startTypingEffect(typingText);
            }
        }, 150);
    }

    // update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => showSection('home'));

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    observer.observe(el);
});

// CTA Button Click Handler
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        showSection('contact');
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Validate form
        if (!name || !email || !message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Simulate form submission
        formMessage.classList.remove('success', 'error');
        formMessage.textContent = 'Sending...';

        setTimeout(() => {
            showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 500);
    });
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.classList.remove('success', 'error');
    formMessage.classList.add(type);

    if (type === 'success') {
        setTimeout(() => {
            formMessage.classList.remove('success');
            formMessage.textContent = '';
        }, 3000);
    }
}

