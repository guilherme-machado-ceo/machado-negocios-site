// Sistema de tradução trilíngue
let currentLanguage = 'pt';

// Função para trocar idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Atualizar botões de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Atualizar textos
    document.querySelectorAll('[data-' + lang + ']').forEach(element => {
        const translation = element.getAttribute('data-' + lang);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Atualizar placeholders do formulário
    updateFormPlaceholders();
    
    // Atualizar atributo lang do HTML
    const langMap = {
        'pt': 'pt-br',
        'en': 'en',
        'es': 'es'
    };
    document.documentElement.lang = langMap[lang];
    
    // Salvar preferência no localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// Função para toggle do menu mobile
function toggleMobileMenu() {
    const nav = document.getElementById('nav-menu');
    nav.classList.toggle('active');
}

// Função para fechar menu mobile ao clicar em link
function closeMobileMenu() {
    const nav = document.getElementById('nav-menu');
    nav.classList.remove('active');
}

// Função para detectar idioma do navegador
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    
    if (browserLang.startsWith('en')) {
        return 'en';
    } else if (browserLang.startsWith('es')) {
        return 'es';
    } else {
        return 'pt'; // padrão
    }
}

// Função para aplicar animações de entrada
function applyAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.section-card').forEach(card => {
        observer.observe(card);
    });
}

// Função para smooth scroll
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para adicionar efeitos de hover nos cards
function addCardEffects() {
    document.querySelectorAll('.section-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Função para otimizar performance
function optimizePerformance() {
    // Lazy loading para imagens
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
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Função para adicionar eventos aos links de navegação mobile
function addMobileNavEvents() {
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Função para verificar se é dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para ajustar layout baseado no tamanho da tela
function adjustLayout() {
    const header = document.querySelector('header');
    const nav = document.getElementById('nav-menu');
    
    if (isMobile()) {
        // Configurações para mobile
        nav.classList.add('mobile-nav');
    } else {
        // Configurações para desktop
        nav.classList.remove('mobile-nav', 'active');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Carregar idioma preferido ou detectar idioma do navegador
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const initialLanguage = savedLanguage || detectBrowserLanguage();
    
    // Aplicar idioma inicial
    changeLanguage(initialLanguage);
    
    // Inicializar funcionalidades
    applyAnimations();
    smoothScroll();
    addCardEffects();
    optimizePerformance();
    addMobileNavEvents();
    adjustLayout();
    
    // Inicializar efeitos visuais LED e spots de luz
    initVisualEffects();
    
    // Adicionar classe fade-in aos elementos iniciais
    setTimeout(() => {
        document.querySelector('.hero').classList.add('fade-in');
    }, 100);
});

// Event listener para redimensionamento da janela
window.addEventListener('resize', function() {
    adjustLayout();
});

// Event listener para fechar menu mobile ao clicar fora
document.addEventListener('click', function(event) {
    const nav = document.getElementById('nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove('active');
    }
});

// Prevenir scroll horizontal em dispositivos móveis
document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });

// ===== EFEITOS VISUAIS LED E SPOTS DE LUZ =====

// Função para criar efeito de luminosidade LED
function createLEDEffect() {
    // Criar container para efeitos LED
    const ledContainer = document.createElement('div');
    ledContainer.className = 'led-effects';
    ledContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(ledContainer);
    
    // Criar múltiplos LEDs pulsantes
    for (let i = 0; i < 15; i++) {
        const led = document.createElement('div');
        led.className = 'led-pulse';
        
        const colors = ['#ff073a', '#ffcc00', '#c0c0c0'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        
        led.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            box-shadow: 0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color};
            animation: ledPulse ${duration}s infinite ease-in-out;
        `;
        
        ledContainer.appendChild(led);
    }
}

// Função para criar spots de luz móveis
function createLightSpots() {
    const spotContainer = document.createElement('div');
    spotContainer.className = 'light-spots';
    spotContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(spotContainer);
    
    // Criar spots de luz
    for (let i = 0; i < 8; i++) {
        const spot = document.createElement('div');
        spot.className = 'light-spot';
        
        const colors = [
            'radial-gradient(circle, rgba(255,7,58,0.3) 0%, rgba(255,7,58,0.1) 30%, transparent 70%)',
            'radial-gradient(circle, rgba(255,204,0,0.3) 0%, rgba(255,204,0,0.1) 30%, transparent 70%)',
            'radial-gradient(circle, rgba(192,192,192,0.2) 0%, rgba(192,192,192,0.05) 30%, transparent 70%)'
        ];
        
        const gradient = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 200 + 100;
        const x = Math.random() * 120 - 10;
        const y = Math.random() * 120 - 10;
        const duration = Math.random() * 20 + 15;
        
        spot.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${gradient};
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: floatSpot ${duration}s infinite linear;
        `;
        
        spotContainer.appendChild(spot);
    }
}

// Função para criar efeito de brilho nos elementos interativos
function addGlowEffects() {
    // Adicionar brilho aos botões e links
    const interactiveElements = document.querySelectorAll('nav a, .lang-btn, .submit-btn, .social-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) drop-shadow(0 0 10px currentColor)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });
}

// Função para criar efeito de partículas flutuantes
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Criar partículas
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #c0c0c0;
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: 0.6;
            animation: floatParticle ${duration}s infinite ease-in-out ${delay}s;
        `;
        
        particleContainer.appendChild(particle);
    }
}

// Função para criar efeito de scan line
function createScanLine() {
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    scanLine.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #ff073a, transparent);
        z-index: 1001;
        animation: scanMove 4s infinite linear;
        opacity: 0.7;
    `;
    
    document.body.appendChild(scanLine);
}

// Inicializar todos os efeitos visuais
function initVisualEffects() {
    createLEDEffect();
    createLightSpots();
    addGlowEffects();
    createFloatingParticles();
    createScanLine();
    
    // Adicionar estilos CSS para animações
    addVisualEffectsCSS();
}

// Função para adicionar CSS das animações
function addVisualEffectsCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ledPulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes floatSpot {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(50px, -30px) rotate(90deg); }
            50% { transform: translate(-20px, -60px) rotate(180deg); }
            75% { transform: translate(-40px, 20px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes floatParticle {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes scanMove {
            0% { top: 0; opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { top: 100%; opacity: 0; }
        }
        
        /* Efeitos de brilho para elementos interativos */
        .section-card:hover {
            box-shadow: 0 10px 30px rgba(255, 7, 58, 0.4), 0 0 20px rgba(255, 204, 0, 0.2) !important;
        }
        
        .hero {
            box-shadow: 0 10px 40px rgba(255, 7, 58, 0.3), inset 0 0 50px rgba(255, 204, 0, 0.1) !important;
        }
        
        /* Efeito de pulsação para a logo */
        .logo-text {
            animation: logoPulse 3s infinite ease-in-out;
        }
        
        @keyframes logoPulse {
            0%, 100% { text-shadow: 0 0 10px var(--dark-yellow-neon), 2px 2px 4px rgba(0,0,0,0.8); }
            50% { text-shadow: 0 0 20px var(--dark-yellow-neon), 0 0 30px var(--dark-yellow-neon), 2px 2px 4px rgba(0,0,0,0.8); }
        }
    `;
    
    document.head.appendChild(style);
}

// Função para melhorar acessibilidade
function improveAccessibility() {
    // Adicionar suporte a navegação por teclado
    document.querySelectorAll('.lang-btn, nav a').forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Adicionar indicadores de foco
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Inicializar melhorias de acessibilidade
document.addEventListener('DOMContentLoaded', improveAccessibility);

// Função para envio de formulário
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    
    // Esconder mensagens anteriores
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    
    // Desabilitar botão durante envio
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    
    // Atualizar texto do botão baseado no idioma atual
    const currentLang = getCurrentLanguage();
    const sendingTexts = {
        pt: 'Enviando...',
        en: 'Sending...',
        es: 'Enviando...'
    };
    submitBtn.textContent = sendingTexts[currentLang] || 'Enviando...';
    
    // Simular envio (em produção, aqui seria feita a requisição real)
    setTimeout(() => {
        // Simular sucesso (90% das vezes)
        if (Math.random() > 0.1) {
            successMsg.style.display = 'block';
            form.reset();
            
            // Scroll para a mensagem de sucesso
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            errorMsg.style.display = 'block';
            
            // Scroll para a mensagem de erro
            errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Restaurar botão
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Esconder mensagem após 5 segundos
        setTimeout(() => {
            successMsg.style.display = 'none';
            errorMsg.style.display = 'none';
        }, 5000);
        
    }, 2000); // Simular delay de rede
}

// Função para obter idioma atual
function getCurrentLanguage() {
    const activeBtn = document.querySelector('.lang-btn.active');
    return activeBtn ? activeBtn.getAttribute('data-lang') : 'pt';
}

// Atualizar placeholders do formulário quando idioma muda
function updateFormPlaceholders() {
    const currentLang = getCurrentLanguage();
    const messageTextarea = document.getElementById('message');
    
    if (messageTextarea) {
        const placeholder = messageTextarea.getAttribute(`data-${currentLang}`);
        if (placeholder) {
            messageTextarea.placeholder = placeholder;
        }
    }
    
    // Atualizar opções do select
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        const options = serviceSelect.querySelectorAll('option');
        options.forEach(option => {
            const text = option.getAttribute(`data-${currentLang}`);
            if (text) {
                option.textContent = text;
            }
        });
    }
}

// Exportar funções para uso global
window.changeLanguage = changeLanguage;
window.toggleMobileMenu = toggleMobileMenu;
window.submitForm = submitForm;