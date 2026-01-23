// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card-hover, .slide-in-left, .slide-in-right');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.card-hover');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // CTA button animations
    const ctaButtons = document.querySelectorAll('button, .bg-blue-600, .bg-gradient-to-r');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Scroll-triggered animations
    let scrollPosition = 0;
    const scrollElements = document.querySelectorAll('.fade-in');

    function elementInView(element, dividend = 1) {
        const elementTop = element.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    }

    function displayScrollElement(element) {
        element.classList.add('fade-in');
    }

    function handleScrollAnimation() {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    }

    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
        handleScrollAnimation();
    });

    // Initial check for elements in view
    handleScrollAnimation();

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const loadingIcon = document.getElementById('loadingIcon');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            loadingIcon.classList.remove('hidden');

            // Hide previous messages
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Enhanced validation with visual feedback
            const requiredFields = ['firstName', 'lastName', 'email'];
            let hasErrors = false;

            requiredFields.forEach(field => {
                const element = document.getElementById(field);
                if (!data[field] || data[field].trim() === '') {
                    element.classList.add('border-red-500', 'focus:border-red-500');
                    element.classList.remove('border-gray-300');
                    hasErrors = true;
                } else {
                    element.classList.remove('border-red-500', 'focus:border-red-500');
                    element.classList.add('border-green-500', 'focus:border-green-500');
                }
            });

            if (hasErrors) {
                showError('Please fill in all required fields.');
                return;
            }

            // Enhanced email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                const emailElement = document.getElementById('email');
                emailElement.classList.add('border-red-500', 'focus:border-red-500');
                emailElement.classList.remove('border-gray-300', 'border-green-500');
                showError('Please enter a valid email address.');
                return;
            }

            // Phone validation if provided
            if (data.phone && data.phone.trim() !== '') {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
                    const phoneElement = document.getElementById('phone');
                    phoneElement.classList.add('border-red-500', 'focus:border-red-500');
                    showError('Please enter a valid phone number.');
                    return;
                }
            }

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showSuccess();
            }, 2000);
        });
    }

    function showSuccess() {
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        loadingIcon.classList.add('hidden');
        successMessage.classList.remove('hidden');

        // Reset form
        contactForm.reset();

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }

    function showError(message) {
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        loadingIcon.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.querySelector('p').textContent = message;

        // Auto-hide error message after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 5000);
    }

    // Newsletter Form Handling
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value.trim();

            if (!email) {
                alert('Please enter your email address.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate newsletter subscription
            alert('Thank you for subscribing! You will receive our latest IT tips and updates.');
            emailInput.value = '';
        });
    }

    // Add loading animation for images (skip navbar logo – must stay visible)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.closest('nav') || img.closest('footer')) return;
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });

    // Parallax effect for hero section (subtle)
    const heroSection = document.querySelector('.hero-gradient');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'visible');
            backToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Industry hover effects
    const industryCards = document.querySelectorAll('.bg-gray-800.p-6.rounded-lg');
    industryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add click tracking for analytics (placeholder)
    const trackableElements = document.querySelectorAll('a, button');
    trackableElements.forEach(element => {
        element.addEventListener('click', function() {
            // Here you would send analytics data
            console.log('Clicked:', this.textContent.trim() || this.href);
        });
    });

    // Accessibility improvements
    // Add keyboard navigation for mobile menu
    mobileMenuButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            mobileMenu.classList.toggle('hidden');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3B82F6';
        });
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

    // Add smooth reveal animation for elements
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Enhanced stagger animations
    const staggerElements = document.querySelectorAll('.stagger-1, .stagger-2, .stagger-3, .stagger-4, .stagger-5, .stagger-6');
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    staggerElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        staggerObserver.observe(el);
    });

    // Add typing effect for hero text (optional)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Magnetic cursor effect for buttons
    const magneticButtons = document.querySelectorAll('button');
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px)';
        });
    });

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('button, .bg-blue-600, .bg-gradient-to-r');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add loading animation for page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Enhanced scroll-based progress indicator with gradient
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 w-full h-1 z-50';
    progressBar.style.background = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)';
    progressBar.style.transform = 'scaleX(0)';
    progressBar.style.transformOrigin = 'left';
    progressBar.style.transition = 'transform 0.1s ease-out';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        progressBar.style.transform = `scaleX(${scrollPercent})`;
    });

    // Performance optimization - throttle scroll events
    let scrollThrottleTimer;
    const throttledScrollHandler = () => {
        if (!scrollThrottleTimer) {
            scrollThrottleTimer = setTimeout(() => {
                // Handle scroll-based animations here
                scrollThrottleTimer = null;
            }, 16); // ~60fps
        }
    };

    window.addEventListener('scroll', throttledScrollHandler);