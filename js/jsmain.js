// Основной скрипт для сайта
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Закрытие меню при клике вне его
            if (nav.classList.contains('active')) {
                document.addEventListener('click', closeMenuOnClickOutside);
            } else {
                document.removeEventListener('click', closeMenuOnClickOutside);
            }
        });
    }
    
    function closeMenuOnClickOutside(e) {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    }
    
    // Закрытие меню при клике на ссылку внутри меню
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            document.removeEventListener('click', closeMenuOnClickOutside);
        });
    });
    
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
    
    // Улучшенный скролл для мобильных
    function improveMobileScrolling() {
        // Предотвращение "подпрыгивания" на iOS
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Фикс для iOS Safari
        let lastTouchY = 0;
        document.addEventListener('touchstart', function(e) {
            lastTouchY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchmove', function(e) {
            const touchY = e.touches[0].clientY;
            const direction = touchY - lastTouchY;
            lastTouchY = touchY;
            
            // Плавная прокрутка на iOS
            if (Math.abs(direction) > 10) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    improveMobileScrolling();
});