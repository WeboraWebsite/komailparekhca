document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile navigation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                item.classList.toggle('active');
            });
        });
    }

    // Testimonial slider (simple auto-scroll for touch devices)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && window.innerWidth < 992) {
        let scrollAmount = 0;
        const testimonialWidth = testimonialSlider.querySelector('.testimonial').offsetWidth + 32; // width + gap
        const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.clientWidth;
        
        const autoScroll = setInterval(() => {
            testimonialSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            
            scrollAmount += testimonialWidth;
            
            if (scrollAmount > maxScroll) {
                scrollAmount = 0;
            }
        }, 5000);
        
        // Stop auto-scroll on touch or mouse interaction
        testimonialSlider.addEventListener('mousedown', () => {
            clearInterval(autoScroll);
        });
        
        testimonialSlider.addEventListener('touchstart', () => {
            clearInterval(autoScroll);
        });
    }

    // Contact form validation (if applicable)
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('.form-control');
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Email validation
            const emailInput = contactForm.querySelector('input[type="email"]');
            if (emailInput) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    isValid = false;
                    emailInput.classList.add('error');
                }
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For this example, just show a success message
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => group.style.display = 'none');
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We will get back to you shortly.</p>
                `;
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '2rem';
                
                contactForm.appendChild(successMessage);
            }
        });
    }
});