// Lessa-Machado — script.js
// Progressive Enhancement: marca HTML quando JS está ativo
document.documentElement.classList.add('js');

'use strict';

/* ============================================================
   ESTADO
   ============================================================ */
let currentLanguage = 'pt';

/* ============================================================
   UTILITÁRIOS
   ============================================================ */
function isMobile() {
    return window.innerWidth <= 768;
}

function prefersReducedMotion() {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

/* ============================================================
   IDIOMA
   ============================================================ */
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Atualiza todos os elementos com atributos data-pt / data-en / data-es
    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) el.textContent = text;
    });

    // Atualiza title da página
    const titleEl = document.querySelector('title');
    if (titleEl) {
        const titleText = titleEl.getAttribute('data-' + lang);
        if (titleText) document.title = titleText;
    }

    // Atualiza lang do html
    const langMap = { pt: 'pt-BR', en: 'en', es: 'es' };
    document.documentElement.setAttribute('lang', langMap[lang] || lang);

    // Atualiza botões de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Atualiza placeholders do formulário
    updateFormPlaceholders(lang);
}

function detectBrowserLanguage() {
    const nav = navigator.language || navigator.userLanguage || 'pt';
    const code = nav.toLowerCase().slice(0, 2);
    if (code === 'es') return 'es';
    if (code === 'en') return 'en';
    return 'pt';
}

/* ============================================================
   MENU MOBILE
   ============================================================ */
function toggleMobileMenu() {
    const nav = document.getElementById('nav-menu');
    const btn = document.querySelector('.mobile-menu-toggle');
    if (!nav) return;

    const isOpen = nav.classList.toggle('active');
    if (btn) {
        btn.setAttribute('aria-expanded', String(isOpen));
        btn.textContent = isOpen ? '✕' : '☰';
    }
}

function closeMobileMenu() {
    const nav = document.getElementById('nav-menu');
    const btn = document.querySelector('.mobile-menu-toggle');
    if (!nav) return;

    nav.classList.remove('active');
    if (btn) {
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = '☰';
    }
}

/* ============================================================
   ANIMAÇÕES — fade-in com IntersectionObserver
   ============================================================ */
function applyAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    // Se prefere menos movimento, mostra tudo imediatamente
    if (prefersReducedMotion()) {
        elements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ============================================================
   ACESSIBILIDADE
   ============================================================ */
function improveAccessibility() {
    // Marca o link ativo na navegação com base na página atual
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href')?.split('/').pop() || '';
        const isHome = (currentPage === '' || currentPage === 'index.html') &&
                       (linkPage === 'index.html' || linkPage === '' || linkPage === '#home');
        const isMatch = linkPage && linkPage !== '#home' && currentPage === linkPage;
        if (isHome || isMatch) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

/* ============================================================
   PERFORMANCE
   ============================================================ */
function optimizePerformance() {
    // Lazy loading para imagens que não têm o atributo
    document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}

/* ============================================================
   NAV MOBILE — fechar ao clicar em link
   ============================================================ */
function addMobileNavEvents() {
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMobile()) closeMobileMenu();
        });
    });
}

/* ============================================================
   LAYOUT
   ============================================================ */
function adjustLayout() {
    // Ajusta padding do main para compensar o header sticky
    const header = document.querySelector('header');
    const main   = document.querySelector('main');
    if (header && main) {
        // Sem manipulação extra; CSS sticky já cuida disso
    }
}

/* ============================================================
   EFEITOS VISUAIS (só desktop, sem prefers-reduced-motion)
   ============================================================ */
function initVisualEffects() {
    // Efeito de brilho sutil no cursor sobre cards
    document.querySelectorAll('.section-card, .service-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--mouse-x');
            card.style.removeProperty('--mouse-y');
        });
    });
}

/* ============================================================
   FORMULÁRIO DE CONTATO
   ============================================================ */
const formPlaceholders = {
    pt: { name: 'Seu nome completo', email: 'seu@email.com', subject: 'Assunto da mensagem', message: 'Como podemos ajudá-lo?' },
    en: { name: 'Your full name', email: 'you@email.com', subject: 'Message subject', message: 'How can we help you?' },
    es: { name: 'Su nombre completo', email: 'su@email.com', subject: 'Asunto del mensaje', message: '¿Cómo podemos ayudarle?' },
};

function updateFormPlaceholders(lang) {
    const p = formPlaceholders[lang] || formPlaceholders.pt;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.placeholder = val; };
    set('contact-name',    p.name);
    set('contact-email',   p.email);
    set('contact-subject', p.subject);
    set('contact-message', p.message);
}

function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const name    = form.querySelector('#contact-name')?.value.trim();
    const email   = form.querySelector('#contact-email')?.value.trim();
    const message = form.querySelector('#contact-message')?.value.trim();

    if (!name || !email || !message) {
        const msg = {
            pt: 'Por favor, preencha todos os campos obrigatórios.',
            en: 'Please fill in all required fields.',
            es: 'Por favor, complete todos los campos requeridos.',
        };
        alert(msg[currentLanguage] || msg.pt);
        return;
    }

    // Feedback visual
    const btn = form.querySelector('.btn-submit');
    if (btn) {
        const origText = btn.textContent;
        btn.disabled = true;
        btn.textContent = { pt: 'Enviando…', en: 'Sending…', es: 'Enviando…' }[currentLanguage];
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = origText;
        }, 3000);
    }

    // Abre cliente de e-mail como fallback
    const subject  = encodeURIComponent(form.querySelector('#contact-subject')?.value || 'Contato via site');
    const body     = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:contato@lessamachado.com.br?subject=${subject}&body=${body}`;
}

/* ============================================================
   DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    const reduceMotion = prefersReducedMotion();

    // Idioma
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const initialLanguage = savedLanguage || detectBrowserLanguage();
    changeLanguage(initialLanguage);

    // Funcionalidades
    applyAnimations();
    smoothScroll();
    optimizePerformance();
    addMobileNavEvents();
    adjustLayout();

    // Acessibilidade
    improveAccessibility();

    // Efeitos visuais: só desktop sem reduced-motion
    if (!reduceMotion && !isMobile()) {
        initVisualEffects();
    }

    // Hero — aparecer na carga
    const hero = document.querySelector('.hero');
    if (hero) {
        if (reduceMotion) {
            hero.classList.add('is-visible');
        } else {
            setTimeout(() => hero.classList.add('is-visible'), 80);
        }
    }
});

/* ============================================================
   EVENTOS GLOBAIS
   ============================================================ */

// Fechar menu ao redimensionar para desktop
window.addEventListener('resize', () => {
    if (!isMobile()) closeMobileMenu();
});

// Fechar menu ao clicar fora
document.addEventListener('click', (event) => {
    const nav = document.getElementById('nav-menu');
    const btn = document.querySelector('.mobile-menu-toggle');
    if (nav?.classList.contains('active') &&
        !nav.contains(event.target) &&
        !btn?.contains(event.target)) {
        closeMobileMenu();
    }
});

// Fechar menu com ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
});

// Prevenir zoom por pinch em iOS
document.addEventListener('touchmove', (event) => {
    if (event.scale !== 1) event.preventDefault();
}, { passive: false });

/* ============================================================
   EXPORTS (funções chamadas inline no HTML)
   ============================================================ */
window.changeLanguage   = changeLanguage;
window.toggleMobileMenu = toggleMobileMenu;
window.submitForm       = submitForm;
