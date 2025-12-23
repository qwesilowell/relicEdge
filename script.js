// Navigation and Section Management
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
        }
    });
});

// Typing effect for hero text
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';

    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            typingText.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Parallax effect for glow elements
document.addEventListener('mousemove', (e) => {
    const glowElements = document.querySelectorAll('.glow-element');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    glowElements.forEach((element, index) => {
        const speed = (index + 1) * 20;
        element.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});
