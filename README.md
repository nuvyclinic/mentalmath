Mental Math é um jogo interativo baseado na web projetado para aprimorar sua velocidade de raciocínio aritmético e concentração. Os jogadores resolvem desafios matemáticos sob limites de tempo rigorosos, acumulando pontos e competindo com jogadores do mundo inteiro.

✨ Funcionalidades

🎮 Jogabilidade Dinâmica: Geração de problemas matemáticos em tempo real com feedback visual instantâneo.

🏆 Rankings Globais e Regionais: Dispute posições com jogadores de todo o mundo ou filtre por região.

🔐 Contas e Apelidos: Autenticação segura alimentada pelo Supabase.

📱 Design Responsivo e Acessível: Otimizado tanto para desktop (teclado físico) quanto para dispositivos móveis (teclado numérico na tela).

🌍 Preparado para Multilíngue: Arquitetura estruturada para localização global (PT, EN, ES e mais).

## 🚀 Como rodar localmente

O site é estático (HTML, CSS e JS puros). Basta servir a pasta:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## 📁 Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Login, cadastro, recuperação de senha e acesso como convidado |
| `jogo.html` | Página do jogo (só a marcação) |
| `game.js` / `game.css` | **Lógica e visual do jogo**: o único lugar para editar o jogo |
| `online.js` | Conta, Top 5 e envio ao ranking (só no site e no app) |
| `points.js` | Tabela de pontos por acerto do ranking geral |
| `ranking.html` | Ranking por modo/nível, filtrado por hoje, semana ou sempre |
| `i18n.js` | Todos os textos em português, inglês e espanhol |
| `config.js` / `mm.js` | Chave pública do Supabase e criação do cliente |
| `vendor/supabase.js` | Biblioteca do Supabase (cópia local, para funcionar offline) |
| `sw.js` | Service worker: guarda os arquivos para o jogo abrir sem internet |
| `site.css` / `pc.css` | Estilos das outras páginas e layout para telas largas (≥ 1200px) |
| `mental-math.html` | **Gerado automaticamente**: o jogo inteiro em um arquivo só, sem login nem ranking |
| `scripts/build.mjs` | Gera `mental-math.html` e a pasta `www/` do app |
| `capacitor.config.json`, `assets/` | Configuração, ícone e tela de abertura do app Android |
| `supabase/migrations/` | Mudanças do banco de dados (funções do ranking) |

### Editou o jogo? Rode o build

`mental-math.html` é gerado a partir de `jogo.html`, `game.js`, `game.css`, `points.js` e `i18n.js`. Depois de mudar qualquer um deles:

```bash
npm install    # só na primeira vez
npm run build
```

e faça commit do `mental-math.html` atualizado. O GitHub Actions avisa (falha) se você esquecer.

## 🏆 Ranking e pontos

O ranking tem duas visões:

- **Geral:** soma dos pontos de todas as partidas no período (hoje, semana ou sempre).
- **Por modo:** o melhor resultado de cada jogador numa configuração (modo, nível e operações).

Os 4 primeiros de cada ranking recebem os títulos **Arquimedes**, **Isaac Newton**, **Carl Friedrich Gauss** e **Leonhard Euler**.

**Pontos da partida = acertos × pontos por acerto × precisão** (acertos ÷ tentativas). O valor de cada acerto acompanha o tempo típico da conta, com bônus nos níveis difíceis:

| | Fácil | Médio | Difícil | Expert |
|---|---:|---:|---:|---:|
| + | 25 | 65 | 150 | 375 |
| − | 25 | 70 | 160 | 390 |
| × | 20 | 65 | 225 | 600 |
| ÷ | 25 | 65 | 225 | 600 |
| x² | 10 | 55 | 125 | 225 |
| √ | 10 | 45 | 100 | 180 |
| % | 60 | 110 | 200 | 450 |
| xⁿ | 20 | 65 | 200 | 375 |
| n! | 20 | 55 | 150 | 270 |

- Com várias operações, vale a média. Decimais: +50% nas contas + − × ÷.
- Desafio do dia: +20%, e conta só a melhor partida de cada dia (as questões se repetem). Sobrevivência: +30%.
- Uma trava descarta valores impossíveis (mais de 10× mais rápido que o normal).

A conta existe em dois lugares que precisam ficar iguais: `points.js` (para mostrar ao jogador) e a função `run_points` em `supabase/migrations/` (que monta o ranking). Para mudar a tabela, mude os dois e aplique a migração no Supabase.

## 🌍 Idiomas

O jogo detecta o idioma do aparelho (português, inglês ou espanhol) e tem um seletor no rodapé. Para mudar ou adicionar textos, edite `i18n.js`. Para um idioma novo, copie o bloco `en` com outra sigla (ex.: `fr`) e traduza.

## 📶 Offline

- **No site:** depois da primeira visita, o service worker guarda os arquivos e o jogo abre mesmo sem internet (também quando instalado pelo navegador com "Adicionar à tela inicial").
- **No app Android:** os arquivos já vêm dentro do APK.
- Sem internet dá para treinar normalmente; só o ranking e o login precisam de conexão.

## 📱 App Android (APK)

O app é o próprio site empacotado com o [Capacitor](https://capacitorjs.com). O GitHub Actions monta o APK sozinho; não precisa instalar o Android Studio.

**Baixar o APK de teste:** na aba **Actions** do GitHub → workflow **Android APK** → última execução verde → em **Artifacts**, baixe `mental-math-debug-apk` (é um .zip com o .apk dentro). No celular, abra o .apk e permita "instalar apps de fontes desconhecidas".

**Publicar um APK para qualquer pessoa baixar:** crie uma tag de versão (por exemplo, em **Releases → Draft a new release → tag `v1.0.0`**). O APK aparece anexado à release.

> O APK de teste é assinado com uma chave temporária diferente a cada build. Para atualizar, desinstale a versão anterior. Com a chave própria (abaixo), as atualizações instalam por cima.

### Chave própria e Play Store

Para a Play Store (e para atualizações instalarem por cima) o app precisa ser assinado sempre com a **mesma chave**. Crie uma vez, guarde o arquivo e as senhas em lugar seguro (se perder, não dá mais para atualizar o app na loja):

```bash
keytool -genkeypair -v -keystore mental-math.jks -alias mentalmath -keyalg RSA -keysize 2048 -validity 10000
base64 -w0 mental-math.jks   # copie o resultado
```

No GitHub: **Settings → Secrets and variables → Actions → New repository secret**, crie:

| Segredo | Valor |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | o texto gerado pelo `base64` |
| `ANDROID_KEYSTORE_PASSWORD` | a senha do keystore |
| `ANDROID_KEY_ALIAS` | `mentalmath` |
| `ANDROID_KEY_PASSWORD` | a senha da chave (geralmente a mesma) |

A partir daí, cada build também gera `mental-math.apk` (assinado) e `mental-math.aab`, que é o arquivo enviado ao Google Play Console (conta de desenvolvedor: taxa única de US$ 25).

O identificador do app é `com.nuvyclinic.mentalmath` (`capacitor.config.json`). Se quiser outro, troque **antes** da primeira publicação na loja, porque depois ele não pode mudar. A versão vem de `"version"` no `package.json`.

## 🔑 Recuperação de senha

O botão "Esqueci minha senha" envia um e-mail pelo Supabase com um link de volta para `index.html`. Para funcionar:

1. Cadastre o endereço do site em **Supabase → Authentication → URL Configuration → Redirect URLs** (ex.: `https://mtlmath.vercel.app/index.html`).
2. Para o botão aparecer também no app Android, preencha `site` em `config.js` com o endereço público do jogo (hoje: `"https://mtlmath.vercel.app/"`). O link do e-mail abre no navegador, e a nova senha vale no app.
