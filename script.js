document.addEventListener('DOMContentLoaded', () => {

    // 1. EFEITO DE MÁQUINA DE ESCREVER (1 Frase Apenas)
    const textToType = "Full Stack.";
    let index = 0;
    const typewriterElement = document.getElementById('typewriter');
    
    if(typewriterElement) {
        function type() {
            if (index < textToType.length) {
                typewriterElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(type, 150); // Velocidade que ele digita cada letra
            }
        }
        // Iniciar o efeito depois de 1 segundo
        setTimeout(type, 1000);
    }

    // 2. BARRA DE PROGRESSO (SCROLL BAR)
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';
    });

    // 3. NAVBAR STICKY
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. MENU MOBILE
    const mobileToggle = document.querySelector('.mobile-toggle');
    if(mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if(navbar.classList.contains('active')){
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 5. SCROLL REVEAL (Animações ao fazer scroll)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => {
        observer.observe(el);
    });

    // 6. NAVEGAÇÃO SUAVE PARA LINKS INTERNOS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Fecha menu mobile se estiver aberto
            if(navbar) navbar.classList.remove('active');
            const icon = mobileToggle ? mobileToggle.querySelector('i') : null;
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});