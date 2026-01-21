// Основной скрипт для сайта
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие события
            
            // Переключаем классы для кнопки и меню
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Блокируем/разблокируем прокрутку страницы
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Закрытие меню при клике вне его (на мобильных)
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при изменении размера окна (если перешли на десктоп)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
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
                
                // Закрываем мобильное меню после клика на ссылку
                if (mobileMenuBtn && nav && nav.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
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
    
    // Проверка, мобильное ли устройство
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Инициализация для мобильных устройств
    if (isMobileDevice()) {
        // Добавляем класс для мобильного устройства
        document.body.classList.add('mobile-device');
        
        // Улучшаем touch-события
        document.querySelectorAll('a, button').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    }
});