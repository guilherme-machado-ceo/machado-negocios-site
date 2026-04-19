# Lessa-Machado — Website (GitHub Pages)

Site institucional estático da **Lessa-Machado Negócios & Cia**.

🌐 **Site:** https://guilherme-machado-ceo.github.io/machado-negocios-site/

---

## 🇧🇷 Português

### Visão geral

Site estático (HTML + CSS + JS) com quatro páginas institucionais e seletor de idioma PT / EN / ES. Deploy automático no **GitHub Pages** via GitHub Actions.

### Estrutura

```
├── index.html              # Home
├── quemsomos.html          # Quem Somos
├── servicos.html           # Serviços
├── entreemcontato.html     # Contato
├── style.css               # Estilos globais (Playfair Display + DM Sans)
├── script.js               # JS (idiomas, menu mobile, animações, a11y)
├── .nojekyll               # Evita processamento Jekyll no GitHub Pages
└── .github/workflows/
    └── pages.yml           # Workflow de deploy automático
```

### Rodando localmente

```bash
python -m http.server 8080
# ou
npx serve .
```

Acesse: http://localhost:8080

### Deploy

O deploy é automático a cada push na branch `main`. Basta configurar o GitHub Pages no repositório:

1. Settings → Pages
2. Source: **GitHub Actions**

### Contribuição

- Abra uma issue com contexto e print/vídeo (se for mudança visual)
- Envie um PR com descrição objetiva do que mudou

---

## 🇺🇸 English

### Overview

Static site (HTML + CSS + JS) with four institutional pages and a PT / EN / ES language switcher. Auto-deployed to **GitHub Pages** via GitHub Actions.

### Project structure

```
├── index.html              # Home
├── quemsomos.html          # About Us
├── servicos.html           # Services
├── entreemcontato.html     # Contact
├── style.css               # Global styles (Playfair Display + DM Sans)
├── script.js               # JS (languages, mobile menu, animations, a11y)
├── .nojekyll               # Prevent Jekyll processing on GitHub Pages
└── .github/workflows/
    └── pages.yml           # Automatic deploy workflow
```

### Running locally

```bash
python -m http.server 8080
# or
npx serve .
```

Then open: http://localhost:8080

### Deploy

Automatic on every push to `main`. Configure GitHub Pages:

1. Settings → Pages
2. Source: **GitHub Actions**

### Contributing

- Open an issue with context and screenshot/video (for visual changes)
- Submit a PR with a clear description of what changed

---

## 📝 Licença / License

© 2026 Lessa-Machado Negócios & Cia. Todos os direitos reservados. / All rights reserved.
