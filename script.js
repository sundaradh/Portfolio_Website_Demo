// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initParticles();
    initNavigation();
    initScrollAnimations();
    initReviewSlider();
    initContactForm();
    initBackToTop();
    initTypingEffect();
    initHeroCounters();
    initHeroParallax();
    initHeroImageEffects();
    initTechStackAnimations();
    initScrollIndicator();
    initButtonEffects();
});

// Particles.js Configuration
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Navigation Functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Create and add overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on overlay
    overlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('nav-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation based on scroll position
        updateActiveNavigation();
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Function to update active navigation
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id], .hero');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id') || 'home';

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Initialize active navigation on page load
    updateActiveNavigation();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .stat-item, .skill-tag, .contact-item');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Special animations for specific sections
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');

    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
    }

    if (aboutImage) {
        aboutImage.classList.add('slide-in-right');
        observer.observe(aboutImage);
    }

    if (contactInfo) {
        contactInfo.classList.add('slide-in-left');
        observer.observe(contactInfo);
    }

    if (contactForm) {
        contactForm.classList.add('slide-in-right');
        observer.observe(contactForm);
    }
}

// Review Slider
function initReviewSlider() {
    let currentReview = 0;
    const reviews = document.querySelectorAll('.review-card');
    const totalReviews = reviews.length;

    // Auto-play reviews
    setInterval(() => {
        changeReview(1);
    }, 5000);
}

function changeReview(direction) {
    const reviews = document.querySelectorAll('.review-card');
    const totalReviews = reviews.length;
    let currentReview = 0;

    // Find current active review
    reviews.forEach((review, index) => {
        if (review.classList.contains('active')) {
            currentReview = index;
        }
    });

    // Remove active class from current review
    reviews[currentReview].classList.remove('active');

    // Calculate next review index
    currentReview += direction;
    if (currentReview >= totalReviews) {
        currentReview = 0;
    } else if (currentReview < 0) {
        currentReview = totalReviews - 1;
    }

    // Add active class to next review
    reviews[currentReview].classList.add('active');
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #f44336, #da190b)';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const texts = [
        'Frontend Developer',
        'UI/UX Designer',
        'React Specialist',
        'Vue.js Expert',
        'Creative Coder',
        'Problem Solver',
        'Digital Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseTime = 2000;

    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            speed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(typeEffect, speed);
    }

    // Start the typing effect after a delay
    setTimeout(typeEffect, 1000);
}

// Enhanced Counter Animation for Hero Stats
function initHeroCounters() {
    const heroStats = document.querySelectorAll('.hero-stats .stat-number');
    let animated = false;

    const animateCounters = () => {
        if (animated) return;
        animated = true;

        heroStats.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                counter.textContent = Math.floor(current);
            }, 20);
        });
    };

    // Trigger animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 1500); // Delay to match other animations
                heroObserver.unobserve(entry.target);
            }
        });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

// Download CV Function
function downloadCV() {
    // Create a simple CV content
    const cvContent = `
Alex Rivera - Frontend Developer
===============================

Contact Information:
- Email: alex.rivera.dev@email.com
- Phone: +1 (555) 123-4567
- Location: San Francisco, CA
- Portfolio: alexrivera.dev

Summary:
Passionate Frontend Developer with 5+ years of experience creating beautiful, 
responsive, and user-friendly web applications. Specialized in React, Vue.js, 
and modern JavaScript frameworks.

Technical Skills:
- JavaScript (ES6+)
- React.js
- Vue.js
- HTML5 & CSS3
- Node.js
- TypeScript
- SASS/SCSS
- Git & GitHub

Experience:
- 150+ Projects Completed
- 98% Client Satisfaction Rate
- 5+ Years of Experience

Services:
- Web Development
- UI/UX Design
- Performance Optimization
- SEO Optimization
- Website Maintenance
`;

    // Create and download the file
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Alex_Rivera_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('CV downloaded successfully! 📄', 'success');
}

// Parallax Effect for Hero Elements
function initHeroParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for floating shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Parallax for profile decorations
        const decorations = document.querySelectorAll('.profile-decorations div');
        decorations.forEach(decoration => {
            decoration.style.transform += ` translateY(${rate}px)`;
        });
    });
}

// Enhanced Hero Image Effects
function initHeroImageEffects() {
    const profileImg = document.querySelector('.profile-img');
    const profileGlow = document.querySelector('.profile-glow');
    
    if (profileImg && profileGlow) {
        profileImg.addEventListener('mouseenter', () => {
            profileGlow.style.opacity = '0.6';
            profileGlow.style.transform = 'scale(1.2)';
        });
        
        profileImg.addEventListener('mouseleave', () => {
            profileGlow.style.opacity = '0.3';
            profileGlow.style.transform = 'scale(1)';
        });
    }
}

// Tech Stack Item Animations
function initTechStackAnimations() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.1)';
            item.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
}

// Scroll Indicator Click Handler
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Enhanced Button Hover Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const percentage = bar.dataset.percentage;
        const fill = bar.querySelector('.skill-fill');
        
        if (fill) {
            fill.style.width = percentage + '%';
        }
    });
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (counter.textContent.includes('+')) {
                counter.textContent = Math.floor(current) + '+';
            } else if (counter.textContent.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Initialize counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Project Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Service Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'rotateY(0)';
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Loading Animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Trigger entrance animations
    document.body.classList.add('loaded');
});

// Form Input Focus Effects
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
});

// Smooth reveal animations for sections
const revealSections = function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.pageYOffset;
        
        if (scrollY > (sectionTop - windowHeight + sectionHeight / 4)) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        konamiCode = [];
    }
});

// Add rainbow keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
