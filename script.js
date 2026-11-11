document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Эффект свечения, следующего за курсором (Глубина и интерактивность)
    const cursorGlow = document.getElementById('cursorGlow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    // 2. Эффект печатной машинки для смены ролей
    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
        'Python Developer',
        'AI Specialist',
        'Problem Solver',
        'Clean Code Evangelist'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Пауза перед удалением
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Пауза перед печатью нового слова
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();

    // 3. Плавное появление элементов при скролле (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Анимируем только один раз
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // 4. Легкий параллакс для фоновых орбов при движении мыши
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');

    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        
        orb1.style.transform = `translate(${x}px, ${y}px)`;
        orb2.style.transform = `translate(${-x}px, ${-y}px)`;
    });

});