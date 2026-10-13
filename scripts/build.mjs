// Mental Math — build sem dependências.
//   node scripts/build.mjs          gera mental-math.html (versão de arquivo único) e a pasta www/ (usada pelo app Android)
//   node scripts/build.mjs --check  só confere se mental-math.html está atualizado (usado no CI)
import {readFileSync,writeFileSync,mkdirSync,rmSync,cpSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>readFileSync(join(root,f),'utf8');
const dataUri=(f,type)=>`data:${type};base64,${readFileSync(join(root,f)).toString('base64')}`;
const inlineImages=css=>css
  .replace(/url\(bg-game\.jpg\)/g,`url("${dataUri('bg-game.jpg','image/jpeg')}")`)
  .replace(/url\(bg-pc\.jpg\)/g,'var(--pcbg)');
const script=f=>{const js=read(f);if(/<\/script/i.test(js))throw new Error(f+' contém </script>');return `<script>\n${js}</script>`};

// ---- mental-math.html: o mesmo jogo de jogo.html, sem a parte online, tudo em um arquivo só ----
function standalone(){
  let html=read('jogo.html');
  const swap=(a,b)=>{if(!html.includes(a))throw new Error('Não achei em jogo.html: '+a);html=html.replace(a,()=>b)};
  html=html.replace(/<!--online-->[\s\S]*?<!--\/online-->\n?/g,'');
  swap(html.match(/<!-- O visual e a lógica.*-->/)?.[0]??'<!-- comentário de jogo.html -->',
    '<!-- ARQUIVO GERADO por scripts/build.mjs a partir de jogo.html, game.css, game.js, points.js e i18n.js. Não edite aqui: edite os originais e rode "npm run build". -->\n'+
    `<link rel="icon" type="image/png" href="${dataUri('favicon-32.png','image/png')}">`);
  swap('<link rel="stylesheet" href="game.css">',`<style>\n${inlineImages(read('game.css'))}</style>`);
  swap('<link rel="stylesheet" href="pc.css" media="(min-width: 1200px)">',`<style>@media (min-width:1200px){\n:root{--pcbg:url("${dataUri('bg-pc.jpg','image/jpeg')}")}\n${inlineImages(read('pc.css'))}\n}</style>`);
  swap('<script src="i18n.js"></script>',script('i18n.js'));
  swap('<script src="points.js"></script>',script('points.js'));
  swap('<script src="game.js"></script>',script('game.js'));
  return html;
}

const out=standalone();
if(process.argv.includes('--check')){
  if(read('mental-math.html')!==out){console.error('mental-math.html está desatualizado: rode "npm run build" e faça commit.');process.exit(1)}
  console.log('mental-math.html está atualizado.');
}else{
  writeFileSync(join(root,'mental-math.html'),out);
  // ---- www/: arquivos que vão dentro do app (Capacitor) ----
  const www=join(root,'www');
  rmSync(www,{recursive:true,force:true});mkdirSync(www);
  for(const f of ['index.html','jogo.html','ranking.html','mental-math.html','game.css','site.css','pc.css','i18n.js','points.js','game.js','online.js','mm.js','config.js',
    'bg.jpg','bg-pc.jpg','bg-game.jpg','favicon.ico','favicon-32.png','apple-touch-icon.png','icon.svg','manifest.webmanifest','vendor'])
    cpSync(join(root,f),join(www,f),{recursive:true});
  console.log('Gerados: mental-math.html e www/');
}
