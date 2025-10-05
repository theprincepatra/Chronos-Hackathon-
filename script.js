// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoader();
    initNavbar();
    initCarousel();
    initStatsCounter();
    initScrollReveal();
    initRippleEffect();
    initContactForm();
    initTestimonials();
});

// Loader Functionality
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('fade-out');
        }, 1500);
    });
}

// Navbar Functionality
function initNavbar() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
            navbar.style.padding = '1.5rem 0';
        }
    });
}

// Carousel Functionality
function initCarousel() {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    
    // Update carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active class
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next slide
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });
    
    // Previous slide
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    });
    
    // Auto slide (optional)
    let autoSlide = setInterval(function() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }, 5000);
    
    // Pause auto slide on hover
    carousel.addEventListener('mouseenter', function() {
        clearInterval(autoSlide);
    });
    
    carousel.addEventListener('mouseleave', function() {
        autoSlide = setInterval(function() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }, 5000);
    });
}

// Stats Counter Functionality
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate counting
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(function() {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Check stats on scroll
    function checkStats() {
        statNumbers.forEach(stat => {
            if (isInViewport(stat) && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateCounter(stat);
            }
        });
    }
    
    // Initial check
    checkStats();
    
    // Check on scroll
    window.addEventListener('scroll', checkStats);
}

// Scroll Reveal Functionality
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9
        );
    }
    
    // Add active class to elements in viewport
    function checkReveal() {
        revealElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
    }
    
    // Set all elements to scroll-reveal
    document.querySelectorAll('.feature-card, .testimonial-card, .watch-card, .section-header, .contact-container > *, .testimonial-container').forEach(element => {
        element.classList.add('scroll-reveal');
    });
    
    // Initial check
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

// Ripple Effect Functionality
function initRippleEffect() {
    // Add ripple effect to buttons
    document.querySelectorAll('.cta-button, .carousel-btn, .submit-btn, .controls button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Position ripple
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Add ripple to button
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            // In a real application, you would send this data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Testimonials Functionality
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let index = 0;

    function showTestimonial(i) {
        testimonials.forEach((t, j) => {
            t.classList.remove('active');
            if (i === j) t.classList.add('active');
        });
    }

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + testimonials.length) % testimonials.length;
        showTestimonial(index);
    });

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
    });

    // Auto-rotate every 6s
    setInterval(() => {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
    }, 6000);
}

// Parallax Animation for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.watch-showcase');
    
    if (hero && heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});