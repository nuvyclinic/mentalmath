// Mental Math — lógica do jogo. Usado por jogo.html e embutido em mental-math.html (gerado por scripts/build.mjs).
let rnd=Math.random;
const t=L.t,$=s=>document.querySelector(s),R=(a,b)=>a+Math.floor(rnd()*(b-a+1));
const OPS=['+','−','×','÷','!','²','√','%','^'],LB={'!':'n!','²':'x²','^':'xⁿ'},AL={'+':'op_add','−':'op_sub','×':'op_mul','÷':'op_div','!':'op_f','²':'op_q','√':'op_r','%':'op_p','^':'op_x'},XC={'!':'f','²':'q','√':'r','%':'p','^':'x'},LV=[1,2,3,4].map(i=>t('lv'+i)),
MODES={sprint:'60″',n30:'30',daily:'20',surv:'∞'},
AS=[[2,20],[10,99],[100,999],[1000,9999]],
MU=[[[2,9],[2,9]],[[11,99],[2,9]],[[11,29],[11,29]],[[11,99],[11,99]]],
FN=[[4,6],[5,7],[6,9],[7,10]];
let cfg={ops:['+','−'],lvl:2,mode:'sprint',dec:false,snd:true},rec={},S;
try{const d=JSON.parse(localStorage.getItem('calcmental')||'{}');Object.assign(cfg,d.cfg);rec=d.rec||{}}catch(e){}
if(!Array.isArray(cfg.ops))cfg.ops=[];
cfg.ops=OPS.filter(o=>cfg.ops.includes(o));if(!cfg.ops.length)cfg.ops=['+'];
if(!MODES[cfg.mode])cfg.mode='sprint';
cfg.lvl=Math.min(4,Math.max(1,+cfg.lvl||2));cfg.dec=!!cfg.dec;cfg.snd=cfg.snd!==false;
const save=()=>{try{localStorage.setItem('calcmental',JSON.stringify({cfg,rec}))}catch(e){}};
const day=()=>{try{return new Date().toLocaleDateString('en-CA',{timeZone:'America/Sao_Paulo'})}catch(e){return new Date().toISOString().slice(0,10)}},rk=()=>(cfg.mode==='daily'?'daily'+day():cfg.mode)+cfg.lvl+(cfg.dec?'d':'')+cfg.ops.map(o=>XC[o]||'').join(''),cm=x=>String(x).replace('.',L.dec),
fmt=r=>TM()?cm((r/1000).toFixed(1))+'s':r,
fmtRec=r=>TM()?fmt(r):L.n('hits',r),
num=n=>n.toLocaleString(L.lang==='pt'?'pt-BR':L.lang),
F=n=>{const i=Math.floor(n/10),f=n%10;return f?i+'.'+f:String(i)},
show=id=>{document.querySelectorAll('section').forEach(s=>s.classList.toggle('on',s.id===id));$('main').classList.toggle('play',id==='game');document.body.classList.toggle('play',id==='game')},
norm=v=>{let x=v.replace(',','.');if(x[0]==='.')x='0'+x;return x.includes('.')?x.replace(/0+$/,'').replace(/\.$/,''):x};

const TM=()=>cfg.mode==='n30'||cfg.mode==='daily',NQ=()=>cfg.mode==='daily'?20:30,
mulberry=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296},
hash=s=>{let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const bk=()=>cfg.mode+'|'+(cfg.mode==='daily'?day()+'|':'')+cfg.lvl+'|'+(cfg.dec?1:0)+'|'+cfg.ops.join('');
let AC;
function audio(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume()}catch(e){}}
function plim(){
  if(!cfg.snd||!AC)return;
  try{
    const t=AC.currentTime,n=(f,g,d,w)=>{const x=AC.createOscillator(),v=AC.createGain();x.type='sine';x.frequency.value=f;v.gain.setValueAtTime(0,t+w);v.gain.linearRampToValueAtTime(g,t+w+.005);v.gain.exponentialRampToValueAtTime(.0001,t+w+d);x.connect(v);v.connect(AC.destination);x.start(t+w);x.stop(t+w+d+.03)};
    n(1318.5,.14,.35,0);n(1975.5,.12,.5,.07);n(3951,.04,.25,.07);
  }catch(e){}
}
function bzz(){
  if(!cfg.snd||!AC)return;
  try{const t=AC.currentTime,x=AC.createOscillator(),v=AC.createGain();x.type='sawtooth';x.frequency.setValueAtTime(190,t);x.frequency.exponentialRampToValueAtTime(95,t+.28);v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(.1,t+.01);v.gain.exponentialRampToValueAtTime(.0001,t+.3);x.connect(v);v.connect(AC.destination);x.start(t);x.stop(t+.32)}catch(e){}
}
const Lo=n=>{const p=Math.pow(10,String(n).length-1);return Math.floor(n/p)*p};
function hint(q,l){
  const {A,B,C,o}=q,x=q.dec?t('nodec'):'';
  if(o==='²'){const n=q.n,d=Math.abs(n-10*Math.round(n/10));
    if(!d)return t(l==1?'sq_zero1':'sq_zero2',{a:n/10});
    return l==1?t('sq1',{d}):(n-d>0?t('sq2',{a:n-d,b:n+d,p:(n-d)*(n+d),q:d*d}):t('tab',{n}))}
  if(o==='√'){const n=q.n,N=n*n,b=10*Math.floor(n/10),E={1:[1,9],4:[2,8],6:[4,6],9:[3,7]}[N%10];
    return l==1?t('rt1'):t('rt2',{t:b,tt:b*b,u:b+10,uu:(b+10)**2})+(E?t('rt_end',{x:E[0],y:E[1]}):'')}
  if(o==='^'){const b=q.n,e=q.x;return l==1?t('pw1'):(e==2?t('pw_sq',{b}):L.n('pw2',e-2,{b,bb:b*b,k:e-2}))}
  if(o==='%'){const p=q.p,b=q.bs;
    if(p===10||p===50)return t('pc'+p+'_'+l);
    if(p===25)return t('pc25_'+l,{b,h:cm(b/2)});
    return l==1?t('pc1'):t('pc2',{b,t:cm(b/10),p})}
  if(o==='!'){const n=q.n,m=q.m;
    if(m)return l==1?t('fm1'):t('fm2',{s:n+' × '+(n-1)+(n-m>2?' × '+(n-2):'')});
    return l==1?t('f1',{n}):t(n>4?'f2m':'f2',{n,a:n-1,p:n*(n-1),b:n-2,c:n-3})}
  if(l==1)return t({'+':'add1','−':'sub1','×':'mul1','÷':'div1'}[o])+(q.dec?t('dec1'):'');
  if(o==='+'||o==='−'){const p=Lo(B),r=B-p,s=o==='+'?'add':'sub';return (r?t(s+'2',{a:A,p,r:o==='+'?A+p:A-p,q:r}):t(s+'2r',{b:B}))+x}
  if(o==='×'){const p=Lo(A),r=A-p;return (r?t('mul2',{p,b:B,pb:p*B,r}):t('mul2t',{a:A,b:B}))+x}
  const p=Lo(C);return (p===C?t('div2t',{a:A,b:B}):t('div2',{p,b:B,pb:p*B,a:A}))+x;
}
function useHint(){
  if(!S||S.over||S.hl>=2)return;
  S.hl++;S.hints++;S.hq=1;if(TM())S.pen+=2000;
  S.hint=hint(S.q,S.hl)+(TM()?t('pen'):'');draw();
}
const SQ=[[2,12],[11,25],[21,50],[51,99]],PW=[[[2,5],[2,3]],[[2,9],[2,4]],[[2,9],[3,5]],[[3,12],[3,6]]],PC=[[10,20,25,50],[5,15,30,40,60,75],[12,15,35,45,65,80,90]],PB=[[20,200],[40,400],[100,1000],[100,2000]],
gcd=(a,b)=>b?gcd(b,a%b):a;
function gen2(o,l){
  const v='<span class="o">',e='</span>';let n,h,q,c,x,p,b;
  if(o==='²'){n=R(...SQ[l]);q=n+'²';h=n+v+'²'+e;c=n*n}
  else if(o==='√'){n=R(...SQ[l]);q='√'+n*n;h=v+'√'+e+n*n;c=n}
  else if(o==='^'){n=R(...PW[l][0]);x=R(...PW[l][1]);q=n+'^'+x;h=n+'<sup>'+x+'</sup>';c=Math.pow(n,x)}
  else{p=l<3?PC[l][R(0,PC[l].length-1)]:R(1,99);const st=100/gcd(p,100);b=st*R(Math.ceil(PB[l][0]/st),Math.floor(PB[l][1]/st));q=t('pct_q',{p,b});h=t('pct_q',{p:'\u0000',b}).replace('\u0000%',p+v+'%'+e);c=p*b/100}
  return{a:q,o,b:'',A:0,B:0,C:0,n,x,p,bs:b,h,t:q,dec:false,c:String(c)};
}
function gen(){
  const o=cfg.ops[R(0,cfg.ops.length-1)],l=cfg.lvl-1,k=cfg.dec?10:1,D=(n,s)=>s&&cfg.dec?cm((n/10).toFixed(1)):String(n);
  if(o==='!'){
    const [lo,hi]=FN[l],f=n=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r},v='<span class="o">!</span>';
    const n=R(lo,hi);let m,q,h,c;
    if(l>1&&R(0,1)){m=n-R(2,3);c=f(n)/f(m);q=n+'! ÷ '+m+'!';h=n+v+' ÷ '+m+v}
    else{c=f(n);q=n+'!';h=n+v}
    return{a:q,o,b:'',A:0,B:0,C:0,n,m,h,t:q,dec:false,c:String(c)};
  }
  if('²√%^'.includes(o))return gen2(o,l);
  let A,B,C,sb=1;
  if(o==='+'||o==='−'){A=R(AS[l][0]*k,AS[l][1]*k);B=R(AS[l][0]*k,AS[l][1]*k);if(o==='−'&&B>A)[A,B]=[B,A];C=o==='+'?A+B:A-B}
  else{const [x,y]=MU[l],q=R(x[0]*k,x[1]*k),m=R(...y);sb=0;if(o==='×'){A=q;B=m;C=q*m}else{C=q;B=m;A=q*m}}
  const a=D(A,1),b=D(B,sb);
  return{a,o,b,A,B,C,dec:cfg.dec,t:a+' '+o+' '+b,c:cfg.dec?F(C):String(C)};
}
function ui(){
  $('#ops').innerHTML=OPS.map(o=>`<button class="chip op" data-o="${o}" aria-pressed="${cfg.ops.includes(o)}" aria-label="${t('op',{o:t(AL[o])})}">${LB[o]||o}</button>`).join('');
  $('#lv').innerHTML=LV.map((n,i)=>`<button class="chip" data-l="${i+1}" aria-pressed="${cfg.lvl==i+1}">${n}</button>`).join('');
  $('#md').innerHTML=Object.entries(MODES).map(([k,g])=>`<button class="mode" data-m="${k}" aria-pressed="${cfg.mode==k}"><span class="bd">${g}</span><span><b>${t('m_'+k)}</b><small>${t('d_'+k)}</small></span></button>`).join('');
  $('#dec').setAttribute('aria-checked',cfg.dec);$('#snd').setAttribute('aria-checked',cfg.snd);
  const r=rec[rk()];
  $('#rec').textContent=r==null?t('no_rec'):t('rec',{r:fmtRec(r)});
  $('#ppa').textContent=t('ppa',{p:num(Math.round(MMpoints.perHit(cfg.lvl,cfg.dec,cfg.ops.join(''),cfg.mode)))});
  if(window.MMtop5)window.MMtop5();
}
$('#home').onclick=e=>{
  const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.o){const s=new Set(cfg.ops);s.has(d.o)?(s.size>1&&s.delete(d.o)):s.add(d.o);cfg.ops=OPS.filter(x=>s.has(x))}
  else if(d.l)cfg.lvl=+d.l;else if(d.m)cfg.mode=d.m;else if(d.d)cfg.dec=!cfg.dec;else if(d.s){cfg.snd=!cfg.snd;if(cfg.snd){audio();plim()}}else return;
  save();ui();
};

function start(){
  audio();
  rnd=cfg.mode==='daily'?mulberry(hash(day()+'|'+cfg.ops.join('')+cfg.lvl+cfg.dec)):Math.random;
  S={ok:0,err:0,st:0,ms:0,tm:[],pen:0,rv:[],msg:'',hints:0,hl:0,hq:0,hint:'',t0:performance.now(),over:false};
  $('#pad [data-k=","]').classList.toggle('off',!cfg.dec);$('#bar').classList.remove('low');
  show('game');next();tick();
}
function next(){S.q=gen();S.v='';S.hl=0;S.hq=0;S.hint='';S.q0=performance.now();S.lim=Math.max(800,6000*Math.pow(.96,S.ok));draw()}
function panel(){const a=S.tm.length?S.tm.reduce((x,y)=>x+y)/S.tm.length/1000:0;$('#kok').textContent=S.ok;$('#kerr').textContent=S.err;$('#kst').textContent=S.st;$('#kavg').textContent=a?cm(a.toFixed(2))+'s':'—';$('#khint').textContent=S.hints}
function draw(){
  panel();
  $('#qt').innerHTML=S.q.h||S.q.a+' <span class="o">'+S.q.o+'</span> '+S.q.b;
  $('#an').textContent=S.v.replace(',',L.dec);$('#hint').textContent=S.hint;const hb=$('#hb');hb.textContent=t(S.hl==1?'more_hint':'hint');hb.disabled=S.hl>=2;
  $('#sc').textContent=S.st>1?'🔥 '+S.st:'';
  $('#st').textContent=S.msg||L.n('hits',S.ok)+' · '+L.n('errs',S.err);
}
const fx=c=>{const e=$('#qc');e.classList.remove('ok','bad');void e.offsetWidth;e.classList.add(c)};
const miss=sk=>{
  S.err++;S.st=0;const c=cm(S.q.c),r=S.q.t+' = '+c;
  S.msg=sk?t('skipped',{c}):t('typed',{v:S.v.replace(',',L.dec)||t('nothing'),c});
  if(!S.rv.includes(r))S.rv.push(r);
  if(TM())S.pen+=3000;
  if(cfg.mode==='surv')end(t('end_wrong',{c}));
};
function press(k){
  if(!S||S.over)return;
  if(k==='s'){miss(1);if(!S.over)next();return}
  if(k===','&&(!cfg.dec||S.v.includes(',')))return;
  S.msg='';
  S.v=k==='b'?S.v.slice(0,-1):S.v+k;
  if(/\d/.test(S.v)&&norm(S.v)===S.q.c){
    S.ok++;S.st=S.hq?0:S.st+1;S.ms=Math.max(S.ms,S.st);S.tm.push(performance.now()-S.q0);plim();
    if(TM()&&S.ok>=NQ())return end(t('end_done'));
    next();fx('ok');
  }else if(S.v.length>=S.q.c.length){
    miss();bzz();
    if(!S.over){fx('bad');try{navigator.vibrate&&navigator.vibrate(18)}catch(e){}S.v='';draw()}
  }else draw();
}
function tick(){
  if(S.over)return;
  const n=performance.now(),el=n-S.t0+S.pen;let f,s;
  if(cfg.mode==='sprint'){const l=6e4-el;f=l/6e4;s=Math.ceil(Math.max(l,0)/1000)+'s';if(l<=0)return end(t('end_time'))}
  else if(TM()){f=1-S.ok/NQ();s=cm((el/1000).toFixed(1))+'s'}
  else{const l=S.lim-(n-S.q0);f=l/S.lim;s=cm((Math.max(l,0)/1000).toFixed(1))+'s';if(l<=0){bzz();return end(t('end_timeout'))}}
  $('#stat').textContent=s;$('#bar i').style.width=Math.max(0,f)*100+'%';
  $('#bar').classList.toggle('low',!TM()&&f<.2);
  S.raf=requestAnimationFrame(tick);
}
function end(msg){
  if(S.over)return;S.over=true;cancelAnimationFrame(S.raf);
  const el=performance.now()-S.t0+S.pen,tm=TM(),done=tm&&S.ok>=NQ(),sc=done?Math.round(el):S.ok,k=rk(),p=rec[k];
  const nr=tm?done&&(p==null||sc<p):S.ok>0&&(p==null||sc>p);
  if(nr){rec[k]=sc;save()}
  const tot=S.ok+S.err,avg=S.tm.length?S.tm.reduce((a,b)=>a+b)/S.tm.length/1000:0,valid=tm?done:S.ok>0;
  // Mesma conta do ranking geral (points.js = função run_points do Supabase)
  const pts=valid?MMpoints.run(cfg.mode,cfg.lvl,cfg.dec,cfg.ops.join(''),sc,S.ok,S.err):0;
  $('#et').textContent=msg;
  $('#eb').textContent=done?fmt(sc):S.ok;
  const er=$('#er');er.textContent=t(done?'total_time':'hits_word');er.appendChild(document.createElement('br'));
  if(nr){const b=document.createElement('span');b.className='badge';b.textContent=t('new_rec');er.appendChild(b)}
  else er.append(t('rec',{r:rec[k]==null?t('rec_none'):fmtRec(rec[k])}));
  $('#eg').innerHTML=[['s_pts',num(pts)],['s_ok',S.ok],['s_err',S.err],['s_acc',tot?Math.round(S.ok/tot*100)+'%':'—'],['s_avg',avg?cm(avg.toFixed(2))+'s':'—'],['s_ms',S.ms],['s_h',S.hints]].map(([a,b])=>`<div><b>${b}</b><span>${t(a)}</span></div>`).join('');
  $('#rv').innerHTML=S.rv.length?'<h2>'+t('review')+'</h2>'+S.rv.slice(0,5).map(r=>`<div>${r}</div>`).join(''):'';
  $('#rv').style.display=S.rv.length?'':'none';
  const dt=cfg.mode==='daily'?' '+L.dm(day()):'',u=/^https?:/.test(location.protocol)&&!/^https?:\/\/localhost/.test(location.href)?'\n'+location.href.replace(/[^/]*([?#].*)?$/,''):(window.MM&&MM.site?'\n'+MM.site:'');
  S.share='Mental Math · '+t('m_'+cfg.mode)+dt+' · '+LV[cfg.lvl-1]+' · '+cfg.ops.map(o=>LB[o]||o).join(' ')+(cfg.dec?' · '+t('decimals'):'')+'\n'+(done?'⏱ '+fmt(sc)+' · ':'')+L.n('hits',S.ok)+', '+L.n('errs',S.err)+(nr?t('share_rec'):'')+u;
  $('#share').textContent=t('share');
  if($('#sent'))$('#sent').textContent='';
  const lk=$('.lk');if(lk)lk.href='ranking.html#b='+encodeURIComponent(bk());
  show('end');
  if(window.MMsubmit)window.MMsubmit({mode:cfg.mode,board:bk(),score:sc,ok:S.ok,err:S.err,valid});
}

$('#pad').innerHTML=[1,2,3,4,5,6,7,8,9,',',0,'b'].map(k=>`<button data-k="${k}" aria-label="${k=='b'?t('k_del'):k==','?t('k_dec'):k}">${k=='b'?'⌫':k==','?L.dec:k}</button>`).join('');
$('#pad').onpointerdown=e=>{const b=e.target.closest('button');if(b){e.preventDefault();press(b.dataset.k)}};
$('#skip').onclick=()=>press('s');
$('#share').onclick=async()=>{
  if(!S||!S.share)return;const b=$('#share'),cap=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.Share;
  try{
    if(cap){await cap.share({text:S.share});return}
    if(navigator.share){await navigator.share({text:S.share});return}
    await navigator.clipboard.writeText(S.share);b.textContent=t('copied');
  }catch(e){if(e.name!=='AbortError'&&!/cancel/i.test(e.message||''))b.textContent=t('share_fail')}
};
$('#hb').onclick=useHint;
$('#go').onclick=$('#again').onclick=start;
$('#back').onclick=$('#quit').onclick=()=>{if(S){S.over=true;cancelAnimationFrame(S.raf)}ui();show('home')};
addEventListener('keydown',e=>{
  if(!$('#game').classList.contains('on')||e.repeat)return;
  if(/^\d$/.test(e.key))press(e.key);
  else if(e.key===','||e.key==='.')press(',');
  else if(e.key==='Backspace')press('b');
  else if(e.key==='h'||e.key==='H'||e.key==='?')useHint();
  else if(e.key==='Enter'||e.key===' ')e.preventDefault();
  else if(e.key==='Escape')$('#quit').click();
});
L.apply();ui();
