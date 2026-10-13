// Mental Math — pontos do ranking geral. É a MESMA conta da função run_points no Supabase
// (supabase/migrations/*_ranking_pontos.sql): se mudar a tabela aqui, mude lá também.
//   pontos = acertos × pontos por acerto × bônus do modo × precisão (acertos ÷ tentativas)
(function(g){
  // Pontos por acerto: operação → [Fácil, Médio, Difícil, Expert]
  const TABLE={'+':[25,65,150,375],'−':[25,70,160,390],'×':[20,65,225,600],'÷':[25,65,225,600],
    '²':[10,55,125,225],'√':[10,45,100,180],'%':[60,110,200,450],'^':[20,65,200,375],'!':[20,55,150,270]};
  // Bônus de nível (×100), de modo (×10) e de decimais (×10): tudo em inteiros, como no banco.
  const TILT=[100,110,125,150],MODE={daily:12,surv:13},DEC=15,BASIC='+−×÷';
  const sum10=(lvl,dec,ops)=>{
    const v=[...ops].filter(o=>TABLE[o]&&TILT[lvl-1]);
    return {n:v.length,s:v.reduce((t,o)=>t+TABLE[o][lvl-1]*(dec&&BASIC.includes(o)?DEC:10),0)};
  };
  // Pontos por acerto: média das operações escolhidas (cada questão sorteia uma delas).
  const perHit=(lvl,dec,ops,mode)=>{const {n,s}=sum10(lvl,dec,ops);return n?s*(MODE[mode]||10)/(100*n):0};
  // score = tempo em ms (30 questões e Desafio do dia) ou acertos (Sprint e Sobrevivência)
  const run=(mode,lvl,dec,ops,score,ok,err)=>{
    const {n,s}=sum10(lvl,dec,ops),tilt=TILT[lvl-1];
    if(!n||ok<=0)return 0;
    // Trava contra valores impossíveis: no máximo 10× mais rápido que o tempo típico.
    const cap=mode==='surv'?150:mode==='sprint'?Math.floor(600*n*tilt/s):Math.floor(Math.max(score,0)*n*tilt/(100*s));
    return Math.round(Math.min(ok,cap)*s*(MODE[mode]||10)*ok/(100*n*(ok+err)));
  };
  g.MMpoints={TABLE,TILT,MODE,DEC,perHit,run};
})(typeof window!=='undefined'?window:globalThis);
