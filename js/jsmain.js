// Основной скрипт для сайта
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    
    // Animate stats counter
    const stats = document.querySelectorAll('.stat__number');
    
    if (stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const target = parseInt(stat.getAttribute('data-count'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + (stat.getAttribute('data-count') === '100' ? '%' : '+');
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + (stat.getAttribute('data-count') === '100' ? '%' : '+');
                        }
                    }, 16);
                    
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь будет код для отправки формы
            // Например, через Fetch API или AJAX
            
            // Временный код для демонстрации
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение 24 часов.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    nav.classList.remove('active');
                }
                
                // Если это фильтр проектов, активируем кнопку "Все проекты"
                if (href === '#projects') {
                    setTimeout(() => {
                        const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
                        if (allFilterBtn && !allFilterBtn.classList.contains('active')) {
                            allFilterBtn.click();
                        }
                    }, 500);
                }
            }
        });
    });
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav__link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav__link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Анимация появления карточек при загрузке
    function animateProjectsOnLoad() {
        const projectCards = document.querySelectorAll('.project-card');
        
        if (projectCards.length > 0) {
            projectCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 + index * 100);
            });
        }
    }
    
    // Запуск анимации при загрузке
    setTimeout(animateProjectsOnLoad, 300);
    
    // Добавление эффекта ховера для карточек проектов
    function addProjectHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const image = card.querySelector('.project-card__image');
            
            if (image) {
                card.addEventListener('mouseenter', () => {
                    const img = image.querySelector('img');
                    if (img) {
                        img.style.transform = 'scale(1.05)';
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    const img = image.querySelector('img');
                    if (img) {
                        img.style.transform = 'scale(1)';
                    }
                });
            }
        });
    }
    
    addProjectHoverEffects();
    
    // Add CSS for mobile menu active state
    const style = document.createElement('style');
    style.textContent = `
        .nav.active {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            z-index: 999;
        }
        
        .nav.active .nav__link {
            padding: 15px;
            border-bottom: 1px solid var(--border);
        }
        
        .nav.active .nav__link:last-child {
            border-bottom: none;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        .nav__link.active {
            color: var(--primary);
        }
        
        .nav__link.active::after {
            width: 100%;
        }
        
        /* Стили для фильтра проектов */
        .project-card {
            display: flex !important;
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease !important;
        }
        
        .project-card__image img {
            transition: transform 0.5s ease !important;
        }
    `;
    document.head.appendChild(style);
});