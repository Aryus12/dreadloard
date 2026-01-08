document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader handling
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });

    // 2. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal effect to sections and cards
    const revealElements = document.querySelectorAll('section, .project-card, .skill-category, .stat-item');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealOnScroll.observe(el);
    });

    // Add a CSS class for the revealed state
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 4. Glitch effect enhancement (random interval)
    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle) {
        setInterval(() => {
            glitchTitle.style.textShadow = Math.random() > 0.9 ? 
                '2px 0 #ff0000, -2px 0 #0000ff' : 'none';
        }, 100);
    }

    // 5. Form handling with feedback
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = contactForm.querySelector('.btn-submit');
            const originalText = button.textContent;
            
            button.textContent = 'TRANSMISSION_IN_PROGRESS...';
            button.disabled = true;
            button.style.opacity = '0.7';

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            button.textContent = 'TRANSMISSION_SUCCESSFUL';
            button.style.background = '#006400';
            button.style.opacity = '1';
            contactForm.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'var(--accent-primary)';
                button.disabled = false;
            }, 4000);
        });
    }

    // 6. Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            header.style.padding = '0';
            header.style.background = 'rgba(5, 5, 5, 0.8)';
        }
    });

    // Console signature
    console.log(
        '%c DREADLORD %c SYSTEM ARCHITECT %c v2.0.0 ',
        'background: #8b0000; color: #fff; padding: 5px; font-weight: bold;',
        'background: #121212; color: #888; padding: 5px;',
        'background: #000; color: #555; padding: 5px;'
    );
});
