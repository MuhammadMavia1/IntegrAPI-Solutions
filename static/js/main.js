// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a, .cta-btn').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});
// Animate sections on scroll
const animatedSections = document.querySelectorAll('.animate');

const handleScrollAnimation = () => {
    animatedSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 50) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);

// Trigger animation on load for visible sections
handleScrollAnimation();
const form = document.getElementById('contactForm');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        responseMessage.textContent = result.message;
        form.reset();
    } catch (error) {
        console.error('Error:', error);
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'An error occurred. Please try again later.';
    }
});

const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

const updateCarousel = () => {
    carouselItems.forEach((item, index) => {
        item.classList.remove('visible');
        if (index === currentIndex) {
            item.classList.add('visible');
        }
    });
};

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
});

// Initialize the carousel
updateCarousel();
