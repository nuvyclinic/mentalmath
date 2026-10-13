// Cria o cliente do Supabase e explica exatamente o que está errado, se algo estiver.
window.MMclient=function(){
  const t=window.L?L.t:k=>k;
  if(!window.MM)throw new Error(t('e_cfg'));
  const k=String(MM.key||'');
  if(!k||/^COLE/.test(k))throw new Error(t('e_key'));
  let secret=/^sb_secret_/.test(k);
  try{if(k.startsWith('eyJ'))secret=secret||JSON.parse(atob(k.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))).role==='service_role'}catch(e){}
  if(secret)throw new Error(t('e_secret'));
  if(!/^https:\/\/[a-z0-9]+\.supabase\.co\/?$/.test(String(MM.url||'')))throw new Error(t('e_url'));
  if(!window.supabase)throw new Error(t('e_lib'));
  return supabase.createClient(MM.url,k);
};
// Guarda os arquivos do site para o jogo abrir sem internet (no app Android os arquivos já vêm dentro do APK).
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')&&!window.Capacitor)
  addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(e=>console.warn('Service worker:',e.message)));
