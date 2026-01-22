// Основной скрипт для сайта
document.addEventListener('DOMContentLoaded', function() {
    console.log('Скрипт загружен');
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navClose = document.querySelector('.nav__close');
    const body = document.body;
    
    if (mobileMenuBtn && nav) {
        console.log('Элементы меню найдены');
        
        // Открытие меню
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Открытие меню');
            
            openMobileMenu();
        });
        
        // Закрытие через кнопку X
        if (navClose) {
            navClose.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('Закрытие меню (кнопка X)');
                closeMobileMenu();
            });
        }
        
        // Закрытие при клике на ссылку
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Закрытие меню (ссылка)');
                closeMobileMenu();
            });
        });
        
        // Закрытие при клике вне меню
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                console.log('Закрытие меню (клик вне)');
                closeMobileMenu();
            }
        });
        
        // Закрытие при нажатии Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                console.log('Закрытие меню (Escape)');
                closeMobileMenu();
            }
        });
        
        // Функции открытия/закрытия
        function openMobileMenu() {
            mobileMenuBtn.classList.add('active');
            nav.classList.add('active');
            body.classList.add('menu-open');
            body.style.overflow = 'hidden';
            
            // Фокус на кнопке закрытия для доступности
            if (navClose) {
                setTimeout(() => navClose.focus(), 100);
            }
        }
        
        function closeMobileMenu() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.overflow = '';
            
            // Возвращаем фокус на кнопку меню
            mobileMenuBtn.focus();
        }
        
        // Закрытие при изменении размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && nav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
    } else {
        console.log('Элементы меню НЕ найдены');
    }
	// Анимация ускорителей технологий
    const techAccelerators = document.querySelectorAll('.tech-accelerator');
    
    if (techAccelerators.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const accelerator = entry.target;
                    const speed = parseInt(accelerator.getAttribute('data-speed'));
                    
                    // Запускаем с задержкой для эффекта каскада
                    setTimeout(() => {
                        animateAccelerator(accelerator, speed);
                    }, index * 150);
                    
                    observer.unobserve(accelerator);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        techAccelerators.forEach(accelerator => observer.observe(accelerator));
    }
    
    function animateAccelerator(accelerator, speed) {
        const line = accelerator.querySelector('.accelerator-line');
        const arrow = accelerator.querySelector('.accelerator-arrow');
        const track = accelerator.querySelector('.accelerator-track');
        
        if (!line || !arrow || !track) return;
        
        const trackWidth = track.offsetWidth;
        const percentage = Math.min(speed, 100); // Гарантируем не более 100%
        
        // Анимация линии
        line.style.width = percentage + '%';
        
        // Анимация стрелки
        const arrowPosition = (trackWidth * percentage / 100) - 3; // Центрирование 6px стрелки
        arrow.style.left = arrowPosition + 'px';
    }
    
    // Опционально: перезапуск анимации при ресайзе
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            techAccelerators.forEach(accelerator => {
                const speed = parseInt(accelerator.getAttribute('data-speed'));
                const line = accelerator.querySelector('.accelerator-line');
                const arrow = accelerator.querySelector('.accelerator-arrow');
                
                if (line && arrow && line.style.width !== '0%') {
                    const track = accelerator.querySelector('.accelerator-track');
                    const trackWidth = track.offsetWidth;
                    const arrowPosition = (trackWidth * speed / 100) - 3;
                    
                    arrow.style.left = arrowPosition + 'px';
                }
            });
        }, 250);
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
    
	// Анимация счетчиков в результатах проектов
const metricNumbers = document.querySelectorAll('.metric-number');

if (metricNumbers.length > 0) {
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const dataValue = numberElement.getAttribute('data-count');
                
                // Если data-count пустой или содержит не число, просто оставляем как есть
                if (!dataValue || isNaN(parseInt(dataValue))) {
                    metricObserver.unobserve(numberElement);
                    return;
                }
                
                const target = parseInt(dataValue);
                const duration = 1500;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
						const suffix = numberElement.getAttribute('data-suffix') || '';
						numberElement.textContent = target + suffix;
						clearInterval(timer);
					} else {
                        numberElement.textContent = Math.floor(current);
                    }
                }, 16);
                
                metricObserver.unobserve(numberElement);
            }
        });
    }, { threshold: 0.3 });
    
    metricNumbers.forEach(number => metricObserver.observe(number));
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
                    closeMobileMenu();
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
    // Анимация появления технологий при скролле
const techItems = document.querySelectorAll('.tech-item');

if (techItems.length > 0) {
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Задержка для эффекта каскада
                techObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    techItems.forEach(item => techObserver.observe(item));
}

// Анимация линий ускорения
const speedIndicators = document.querySelectorAll('.speed-indicator');

if (speedIndicators.length > 0) {
    const speedObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const speedLine = entry.target.querySelector('.speed-line');
                if (speedLine) {
                    // Запускаем анимацию после небольшой задержки
                    setTimeout(() => {
                        speedLine.style.transition = 'width 1.5s ease-out';
                        const speed = entry.target.getAttribute('data-speed');
                        if (speed === 'fast') {
                            speedLine.style.width = '90%';
                        } else if (speed === 'medium') {
                            speedLine.style.width = '70%';
                        } else {
                            speedLine.style.width = '50%';
                        }
                    }, 300);
                }
                speedObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    speedIndicators.forEach(indicator => speedObserver.observe(indicator));
}

    // Запуск анимации при загрузке
    setTimeout(animateProjectsOnLoad, 300);
	
	
});