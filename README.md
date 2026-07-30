# Integrativa Health Tech — site institucional

Site estático (HTML + CSS, sem build) recriado a partir de
<https://integrativa.grupoerviegas.com.br/>, pronto para publicação no GitHub Pages.

## Estrutura

```
.
├── index.html                  # página única (âncoras: #inicio #sobre #solucoes #contato)
├── 404.html                    # página de erro do GitHub Pages
├── robots.txt / sitemap.xml    # indexação
├── .nojekyll                   # publica os arquivos sem processamento do Jekyll
├── .github/workflows/deploy.yml
└── assets/
    ├── css/
    │   ├── style-integrativa-ajustado.css   # estilos do site
    │   └── plugins/                         # bootstrap + fontawesome (reset e ícones)
    ├── fonts/                  # webfonts do Font Awesome
    ├── img/                    # logos, favicon e og-image.jpg (card social 1200x630)
    └── js/main.js              # formulário de contato + menu ativo na rolagem
```

Publicado em <https://four-life.github.io/site-integrativa/>.

## Rodar localmente

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Publicar no GitHub Pages

1. Crie o repositório no GitHub e envie o código:

   ```bash
   git remote add origin https://github.com/<usuario>/<repositorio>.git
   git push -u origin main
   ```

2. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. O workflow `deploy.yml` roda a cada push na `main` e publica em
   `https://<usuario>.github.io/<repositorio>/`.

### Domínio próprio

1. Crie um arquivo `CNAME` na raiz com o domínio (ex.: `integrativa.grupoerviegas.com.br`).
2. No DNS, aponte o subdomínio para `four-life.github.io` (registro `CNAME`).
3. **Atualize as URLs absolutas**, que hoje apontam para o endereço do GitHub Pages:
   `og:url`, `og:image` e `<link rel="canonical">` no `index.html`, mais o `<loc>`
   do `sitemap.xml` e o `Sitemap:` do `robots.txt`.

## Formulário de contato

O GitHub Pages serve apenas arquivos estáticos e não processa `POST`. O envio
abre o cliente de e-mail do visitante com os dados preenchidos, endereçado ao
e-mail definido em `data-mailto` no `index.html`.

Para receber os envios direto num serviço, troque por um endpoint de terceiros:

```html
<form class="iht-form" action="https://formspree.io/f/SEU_ID" method="post">
```

e remova o `data-mailto` (o `assets/js/main.js` só intercepta o formulário quando
esse atributo existe).
