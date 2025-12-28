// Typing Effect
let typingTimeout;

function startTypingEffect(element) {
    if (!element) return;

    const fullText = element.textContent;
    element.textContent = '';
    let index = 0;

    function type() {
        if (index < fullText.length) {
            element.textContent += fullText[index];
            index++;
            typingTimeout = setTimeout(type, 120);
        } else {
            typingTimeout = setTimeout(deleteText, 2000);
        }
    }

    function deleteText() {
        if (index > 0) {
            element.textContent = fullText.slice(0, index - 1);
            index--;
            typingTimeout = setTimeout(deleteText, 80);
        } else {
            typingTimeout = setTimeout(type, 500);
        }
    }

    type();
}

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

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

// Intersection Observer for active navigation
const sections = document.querySelectorAll('.section');
const navOptions = {
    threshold: 0.3,
    rootMargin: '-60px 0px -60% 0px'
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, navOptions);

sections.forEach(section => {
    navObserver.observe(section);
});

// Start typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        startTypingEffect(typingText);
    }
});

// CTA Button Click Handler
const getStartedBtn = document.getElementById('getStartedBtn');
if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input.subject').value;
        const message = contactForm.querySelector('textarea').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Submit to API
        fetch("https://v2.cscdc.online/Relic-ManagementSystem/resources/contact/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch(error => {
                showMessage('There was an error sending your message. Please try again.', 'error');
                console.error("Error:", error);
            });
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
        }, 5000);
    }
}