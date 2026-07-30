# Integrativa Health Tech — site institucional

Site estático (HTML + CSS, sem build) recriado a partir de
<https://integrativa.grupoerviegas.com.br/>, pronto para publicação no GitHub Pages.

## Estrutura

```
.
├── index.html                  # página única (âncoras: #inicio #sobre #solucoes #contato)
├── 404.html                    # página de erro do GitHub Pages
├── .nojekyll                   # publica os arquivos sem processamento do Jekyll
├── .github/workflows/deploy.yml
└── assets/
    ├── css/
    │   ├── style-integrativa-ajustado.css   # estilos do site
    │   └── plugins/                         # bootstrap + fontawesome (reset e ícones)
    ├── fonts/                  # webfonts do Font Awesome
    ├── img/                    # logos e favicon
    └── js/main.js              # formulário de contato + menu ativo na rolagem
```

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

Crie um arquivo `CNAME` na raiz com o domínio (ex.: `integrativa.grupoerviegas.com.br`)
e aponte o DNS para o GitHub Pages.

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
