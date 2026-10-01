// Cria o cliente do Supabase e explica exatamente o que está errado, se algo estiver.
window.MMclient=function(){
  if(!window.MM)throw new Error('O config.js não carregou: confira se está na raiz do repositório e se a linha não tem erro de digitação (aspas, vírgula, ponto e vírgula).');
  const k=String(MM.key||'');
  if(!k||/^COLE/.test(k))throw new Error('O config.js ainda tem a chave de exemplo: cole a chave publishable (sb_publishable_...) entre as aspas.');
  let secret=/^sb_secret_/.test(k);
  try{if(k.startsWith('eyJ'))secret=secret||JSON.parse(atob(k.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))).role==='service_role'}catch(e){}
  if(secret)throw new Error('ATENÇÃO: essa é a chave SECRETA. Use a publishable e gire (troque) a secreta no Supabase, pois ela ficou pública.');
  if(!/^https:\/\/[a-z0-9]+\.supabase\.co\/?$/.test(String(MM.url||'')))throw new Error('A URL do Supabase no config.js está incorreta.');
  if(!window.supabase)throw new Error('A biblioteca do Supabase não carregou (internet instável ou bloqueador de anúncios).');
  return supabase.createClient(MM.url,k);
};
