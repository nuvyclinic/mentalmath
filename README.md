Mental Math é um jogo interativo baseado na web projetado para aprimorar sua velocidade de raciocínio aritmético e concentração. Os jogadores resolvem desafios matemáticos sob limites de tempo rigorosos, acumulando pontos e competindo com jogadores do mundo inteiro.

✨ Funcionalidades

🎮 Jogabilidade Dinâmica: Geração de problemas matemáticos em tempo real com feedback visual instantâneo.

🏆 Rankings Globais e Regionais: Dispute posições com jogadores de todo o mundo ou filtre por região.

🔐 Contas e Apelidos: Autenticação segura alimentada pelo Supabase.

📱 Design Responsivo e Acessível: Otimizado tanto para desktop (teclado físico) quanto para dispositivos móveis (teclado numérico na tela).

🌍 Preparado para Multilíngue: Arquitetura estruturada para localização global (PT, EN, ES e mais).

## 🚀 Como rodar localmente

O projeto é 100% estático (HTML, CSS e JS puros), sem etapa de build:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

`mental-math.html` é uma versão autônoma do jogo (tudo embutido em um arquivo, sem login nem ranking), que funciona até offline.

## 📁 Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Login, cadastro, recuperação de senha e acesso como convidado |
| `jogo.html` | O jogo (configuração, partida, resultado e envio ao ranking) |
| `ranking.html` | Ranking por modo/nível, filtrado por hoje, semana ou sempre |
| `config.js` / `mm.js` | Chave pública do Supabase e criação do cliente |
| `site.css` / `pc.css` | Estilos gerais e layout para telas largas (≥ 1200px) |
| `manifest.webmanifest` | Permite instalar o jogo como app no celular |

## 🔑 Recuperação de senha

O botão "Esqueci minha senha" envia um e-mail pelo Supabase com um link de volta para `index.html`. Para funcionar, o endereço do site precisa estar em **Supabase → Authentication → URL Configuration → Redirect URLs** (por exemplo `https://seu-dominio/index.html`).
