# Mental Math — site (GitHub Pages + Supabase)

Arquivos: `index.html` (login), `jogo.html` (jogo), `ranking.html`, `site.css`, `config.js`, `bg.jpg`.

1. Em `config.js`, troque `COLE_AQUI_A_CHAVE_PUBLICA` pela chave **publishable** (`sb_publishable_...`) do Supabase
   (Project Settings > API Keys). Nunca use a chave secret/service_role.
2. Envie todos os arquivos para a raiz do repositório e ative o GitHub Pages (Settings > Pages > Deploy from a branch > main / root).
3. No Supabase: Authentication > Sign In / Providers > Email > desative "Confirm email";
   Authentication > URL Configuration > Site URL = https://SEU_USUARIO.github.io/mentalmath/ (e o mesmo em Redirect URLs).
