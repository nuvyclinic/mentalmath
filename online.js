// Mental Math — parte online do jogo (conta, Top 5 e envio ao ranking). Fica fora de mental-math.html.
(async()=>{
  const $=s=>document.querySelector(s),t=L.t;
  try{
    const sb=window.MMclient?MMclient():null;
    if(!sb)throw new Error(t('e_mm'));
    const {data:{session}}=await sb.auth.getSession();
    const guest=sessionStorage.getItem('mm_guest');
    // Sem internet dá para treinar mesmo sem conta: só não pontua no ranking.
    if(!session&&!guest&&navigator.onLine){location.replace('index.html');return}
    let nk=t('guest');
    const out=$('#out');
    if(session){
      const {data}=await sb.from('profiles').select('nickname').eq('id',session.user.id).maybeSingle();
      nk=data?data.nickname:t('player');out.textContent=t('out');
      out.onclick=async()=>{await sb.auth.signOut();location.replace('index.html')};
    }else{out.textContent=t('login');out.onclick=()=>{sessionStorage.removeItem('mm_guest');location.replace('index.html')}}
    $('#nick').textContent=nk;$('#who').hidden=false;
    window.MMtop5=async()=>{
      if(!navigator.onLine){$('#top5box').hidden=true;return}
      try{
        const {data,error}=await sb.rpc('leaderboard',{p_board:bk(),p_period:'all'});
        if(error)throw error;
        const el=$('#top5');el.innerHTML='';
        (data||[]).slice(0,5).forEach(r=>{
          const d=document.createElement('div');d.className='t5'+(r.nickname===nk?' me':'');
          [(['🥇','🥈','🥉'][r.pos-1]||'#'+r.pos),r.nickname,fmtRec(r.score)].forEach(v=>{const s=document.createElement('span');s.textContent=v;d.appendChild(s)});
          el.appendChild(d);
        });
        if(!(data||[]).length)el.textContent=t('top5_empty');
        $('#top5box').hidden=false;
      }catch(e){$('#top5box').hidden=true}
    };
    window.MMtop5();
    addEventListener('online',()=>window.MMtop5());
    window.MMsubmit=async r=>{
      const el=$('#sent');
      if(!session){el.textContent=t('need_account');return}
      if(!r.valid){el.textContent=t('incomplete');return}
      if(!navigator.onLine){el.textContent=t('offline_send');return}
      el.textContent=t('sending');
      try{
        const {error}=await sb.rpc('submit_run',{p_board:r.board,p_mode:r.mode,p_score:r.score,p_ok:r.ok,p_err:r.err});
        if(error){el.textContent=['too_fast','implausible','bad_day','login_required'].includes(error.message)?t(error.message):t('send_fail');return}
        const {data:lb}=await sb.rpc('leaderboard',{p_board:r.board,p_period:'all'});
        const i=(lb||[]).findIndex(x=>x.nickname===nk);
        el.textContent=t('sent')+(i>=0?t('sent_pos',{i:i+1,n:lb.length}):'');
      }catch(e){el.textContent=t('send_fail')}
    };
  }catch(e){console.warn('Online indisponível:',e.message);window.MMsubmit=async()=>{$('#sent').textContent=navigator.onLine?t('rank_off',{e:e.message}):t('offline_send')}}
})();
