// Mental Math — textos em português, inglês e espanhol.
// Uso: L.t('chave', {param}) · L.n('hits', 3) para plural · elementos com data-i18n são traduzidos por L.apply().
(function(){
const D={
pt:{
  name:'Português',
  // login
  t_login:'Mental Math — Entrar',sub_login:'Entre para aparecer no ranking.',
  pitch1:'9 operações, 4 níveis e 4 modos de treino',pitch2:'Desafio do dia: as mesmas questões para todos',pitch3:'Ranking por modo e nível, com apelido',
  tab_in:'Entrar',tab_up:'Criar conta',nick:'Apelido',nick_ph:'3 a 16: letras, números, _ . -',email:'E-mail',pw:'Senha',pw_ph:'mínimo de 8 caracteres',
  forgot:'Esqueci minha senha',guest_play:'Jogar como convidado',new_pw:'Nova senha',save_pw:'Salvar nova senha',type_new_pw:'Digite sua nova senha.',
  need_email:'Digite seu e-mail acima para receber o link.',reset_sent:'Se houver uma conta com esse e-mail, enviamos um link para criar uma nova senha.',reset_fail:'Não foi possível enviar o e-mail.',
  nick_bad:'Apelido: 3 a 16 caracteres (letras, números, _ . -).',nick_taken:'Esse apelido já está em uso.',created:'Conta criada! Confirme o e-mail para entrar.',
  err_creds:'E-mail ou senha incorretos.',err_exists:'Este e-mail já está cadastrado.',err_confirm:'Confirme seu e-mail antes de entrar.',err_same_pw:'A nova senha precisa ser diferente da antiga.',err_unexpected:'Erro inesperado.',
  offline_login:'Sem internet: você pode jogar como convidado.',
  // configuração (mm.js)
  e_cfg:'O config.js não carregou: confira se está na raiz do repositório e se a linha não tem erro de digitação.',
  e_key:'O config.js ainda tem a chave de exemplo: cole a chave publishable (sb_publishable_...) entre as aspas.',
  e_secret:'ATENÇÃO: essa é a chave SECRETA. Use a publishable e gire (troque) a secreta no Supabase, pois ela ficou pública.',
  e_url:'A URL do Supabase no config.js está incorreta.',e_lib:'A biblioteca do Supabase não carregou.',e_mm:'Falta o arquivo mm.js no repositório.',
  // jogo — início
  sub_game:'Acertou, avança sozinho.',h_ops:'Operações',dec:'Números decimais',dec_d:'1 casa decimal, resposta com vírgula',snd:'Sons',snd_d:'“Plim” ao acertar, som grave ao errar',
  h_lvl:'Nível',h_mode:'Modo',go:'Começar',top5:'Top 5 desta configuração',ranking:'Ranking',out:'Sair',login:'Entrar',lang:'Idioma',
  op:'Operação {o}',op_add:'adição',op_sub:'subtração',op_mul:'multiplicação',op_div:'divisão',op_f:'fatorial',op_q:'quadrado',op_r:'raiz quadrada',op_p:'porcentagem',op_x:'potência',
  lv1:'Fácil',lv2:'Médio',lv3:'Difícil',lv4:'Expert',
  m_sprint:'Sprint de 60 segundos',d_sprint:'Máximo de acertos',m_n30:'30 questões',d_n30:'Menor tempo; cada erro soma 3s',
  m_daily:'Desafio do dia',d_daily:'20 questões iguais para todos hoje; menor tempo',m_surv:'Sobrevivência',d_surv:'O tempo encolhe; um erro encerra',
  r_sprint:'Sprint 60s',
  no_rec:'Sem recorde neste modo e nível.',rec:'Recorde: {r}',hits_1:'{n} acerto',hits_n:'{n} acertos',errs_1:'{n} erro',errs_n:'{n} erros',
  // jogo — partida
  quit:'Sair do treino',hint:'Dica',more_hint:'Mais dica',skip:'Pular',panel:'Painel',k_ok:'Acertos',k_err:'Erros',k_st:'Sequência',k_avg:'Tempo médio',k_hint:'Dicas',
  keys1:'Digite com o teclado: números, vírgula e ⌫ para apagar.',keys2:'H pede dica · Esc sai do treino.',k_del:'Apagar',k_dec:'Vírgula',
  pct_q:'{p}% de {b}',pen:' (+2s)',skipped:'Pulou · era {c}',typed:'Digitou {v} · era {c}',nothing:'nada',
  // jogo — fim
  end_wrong:'Errou · era {c}',end_done:'Concluído!',end_time:'Tempo!',end_timeout:'Tempo esgotado!',
  total_time:'tempo total',hits_word:'acertos',new_rec:'Novo recorde',rec_none:'sem registro',
  s_ok:'Acertos',s_err:'Erros',s_acc:'Precisão',s_avg:'Tempo médio por acerto',s_ms:'Maior sequência',s_h:'Dicas usadas',review:'Para revisar',
  again:'Jogar de novo',see_rank:'Ver ranking',back:'Voltar ao início',share:'Compartilhar resultado',copied:'Copiado ✓',share_fail:'Não foi possível compartilhar',
  share_rec:' · novo recorde!',decimals:'decimais',
  // jogo — online
  guest:'Convidado',player:'Jogador',top5_empty:'Ninguém pontuou aqui ainda. Seja o primeiro!',
  too_fast:'Aguarde alguns segundos entre partidas para pontuar.',implausible:'Pontuação fora do esperado: não registrada.',bad_day:'O Desafio do dia mudou: jogue o de hoje.',login_required:'Entre na sua conta para pontuar.',
  need_account:'Entre com uma conta para aparecer no ranking.',incomplete:'Partida incompleta: não enviada ao ranking.',sending:'Enviando ao ranking…',send_fail:'Não foi possível enviar ao ranking.',
  sent:'Enviado ao ranking ✓',sent_pos:' · você está em #{i} de {n}',rank_off:'Ranking indisponível: {e}',offline_send:'Sem internet: pontuação não enviada ao ranking.',
  // ranking
  t_rank:'Mental Math — Ranking',play_back:'‹ Jogar',p_day:'Hoje',p_week:'Semana',p_all:'Sempre',pick_board:'Escolha o ranking',loading:'Carregando…',
  nobody:'Ainda ninguém jogou. Seja o primeiro!',rank_fail:'Não foi possível carregar o ranking.',nobody_period:'Ninguém pontuou neste período ainda.',rank_offline:'Sem internet: o ranking precisa de conexão.',
  // dicas
  sq_zero1:'Termina em zero: calcule {a}² e acrescente dois zeros.',sq_zero2:'Comece por {a} × {a}.',
  sq1:'Use (n − d)(n + d) + d², com d a distância até a dezena mais próxima (aqui d = {d}).',sq2:'{a} × {b} = {p}. Falta somar {q}.',tab:'Use a tabuada do {n}.',
  rt1:'Procure o número que, multiplicado por ele mesmo, dá o valor. Comece pelo último dígito.',rt2:'Está entre {t} (pois {t}² = {tt}) e {u} (pois {u}² = {uu}).',rt_end:' A raiz termina em {x} ou {y}.',
  pw1:'Multiplique a base por ela mesma, o número de vezes do expoente.',pw_sq:'É um quadrado: {b} × {b}. Use (n − d)(n + d) + d².',pw2_1:'{b} × {b} = {bb}. Depois multiplique por {b} mais {k} vez.',pw2_n:'{b} × {b} = {bb}. Depois multiplique por {b} mais {k} vezes.',
  pc10_1:'10% é a décima parte: divida por 10.',pc10_2:'Basta andar a vírgula uma casa para a esquerda.',pc50_1:'50% é a metade.',pc50_2:'Divida por 2.',
  pc25_1:'25% é um quarto: a metade da metade.',pc25_2:'Metade de {b} = {h}. Agora tire a metade de novo.',
  pc1:'Monte com pedaços fáceis: 10% (dividir por 10), 5% (metade de 10%) e 1% (dividir por 100).',pc2:'10% de {b} = {t}. Combine 10%, 5% e 1% para chegar a {p}%.',
  fm1:'Cancele os fatores em comum: só sobram os números de cima que não aparecem embaixo.',fm2:'Sobram: {s}',
  f1:'Multiplique todos os inteiros de {n} até 1, guardando o resultado parcial.',f2:'{n} × {a} = {p}. Agora multiplique por {b}.',f2m:'{n} × {a} = {p}. Agora multiplique por {b}, depois por {c} e assim por diante.',
  add1:'Some por partes: primeiro o maior pedaço do segundo número, depois o resto.',sub1:'Subtraia por partes: tire primeiro o maior pedaço do segundo número, depois o resto.',
  mul1:'Decomponha o primeiro número em partes redondas e multiplique cada parte.',div1:'Pense ao contrário: qual número vezes o divisor dá o dividendo?',
  dec1:' Com decimais, ignore a vírgula e recoloque no fim (1 casa).',nodec:' (sem vírgula)',
  add2:'{a} + {p} = {r}. Falta somar {q}.',sub2:'{a} − {p} = {r}. Falta tirar {q}.',add2r:'Faça em uma etapa: some {b} completando até a próxima dezena.',sub2r:'Faça em uma etapa: tire {b} completando até a próxima dezena.',
  mul2:'{p} × {b} = {pb}. Falta {r} × {b}.',mul2t:'Conta direta da tabuada: lembre de {b} × {a}.',
  div2t:'Use a tabuada do {b}: qual resultado chega mais perto de {a}?',div2:'{p} × {b} = {pb}. Quanto falta para chegar a {a}?'
},
en:{
  name:'English',
  t_login:'Mental Math — Sign in',sub_login:'Sign in to appear on the leaderboard.',
  pitch1:'9 operations, 4 levels and 4 training modes',pitch2:'Daily challenge: the same questions for everyone',pitch3:'Leaderboard by mode and level, with a nickname',
  tab_in:'Sign in',tab_up:'Create account',nick:'Nickname',nick_ph:'3 to 16: letters, numbers, _ . -',email:'Email',pw:'Password',pw_ph:'at least 8 characters',
  forgot:'Forgot my password',guest_play:'Play as guest',new_pw:'New password',save_pw:'Save new password',type_new_pw:'Type your new password.',
  need_email:'Type your email above to receive the link.',reset_sent:'If an account exists for that email, we sent a link to create a new password.',reset_fail:'Could not send the email.',
  nick_bad:'Nickname: 3 to 16 characters (letters, numbers, _ . -).',nick_taken:'That nickname is already taken.',created:'Account created! Confirm your email to sign in.',
  err_creds:'Wrong email or password.',err_exists:'This email is already registered.',err_confirm:'Confirm your email before signing in.',err_same_pw:'The new password must be different from the old one.',err_unexpected:'Unexpected error.',
  offline_login:'No internet: you can still play as a guest.',
  e_cfg:'config.js did not load: check that it is in the repository root and has no typos.',
  e_key:'config.js still has the sample key: paste the publishable key (sb_publishable_...) between the quotes.',
  e_secret:'WARNING: this is the SECRET key. Use the publishable one and rotate the secret key in Supabase, since it is now public.',
  e_url:'The Supabase URL in config.js is wrong.',e_lib:'The Supabase library did not load.',e_mm:'mm.js is missing from the repository.',
  sub_game:'Get it right and it moves on.',h_ops:'Operations',dec:'Decimal numbers',dec_d:'1 decimal place, answer with a point',snd:'Sounds',snd_d:'A “ding” when right, a low tone when wrong',
  h_lvl:'Level',h_mode:'Mode',go:'Start',top5:'Top 5 for this setup',ranking:'Leaderboard',out:'Sign out',login:'Sign in',lang:'Language',
  op:'Operation {o}',op_add:'addition',op_sub:'subtraction',op_mul:'multiplication',op_div:'division',op_f:'factorial',op_q:'square',op_r:'square root',op_p:'percentage',op_x:'power',
  lv1:'Easy',lv2:'Medium',lv3:'Hard',lv4:'Expert',
  m_sprint:'60-second sprint',d_sprint:'As many right answers as possible',m_n30:'30 questions',d_n30:'Fastest time; each mistake adds 3s',
  m_daily:'Daily challenge',d_daily:'Same 20 questions for everyone today; fastest time',m_surv:'Survival',d_surv:'Time keeps shrinking; one mistake ends it',
  r_sprint:'Sprint 60s',
  no_rec:'No record for this mode and level.',rec:'Record: {r}',hits_1:'{n} right',hits_n:'{n} right',errs_1:'{n} mistake',errs_n:'{n} mistakes',
  quit:'Quit training',hint:'Hint',more_hint:'More help',skip:'Skip',panel:'Panel',k_ok:'Right',k_err:'Mistakes',k_st:'Streak',k_avg:'Average time',k_hint:'Hints',
  keys1:'Type on your keyboard: numbers, point and ⌫ to delete.',keys2:'H for a hint · Esc quits.',k_del:'Delete',k_dec:'Decimal point',
  pct_q:'{p}% of {b}',pen:' (+2s)',skipped:'Skipped · it was {c}',typed:'You typed {v} · it was {c}',nothing:'nothing',
  end_wrong:'Wrong · it was {c}',end_done:'Done!',end_time:'Time!',end_timeout:'Out of time!',
  total_time:'total time',hits_word:'right answers',new_rec:'New record',rec_none:'none yet',
  s_ok:'Right',s_err:'Mistakes',s_acc:'Accuracy',s_avg:'Average time per answer',s_ms:'Longest streak',s_h:'Hints used',review:'To review',
  again:'Play again',see_rank:'See leaderboard',back:'Back to start',share:'Share result',copied:'Copied ✓',share_fail:'Could not share',
  share_rec:' · new record!',decimals:'decimals',
  guest:'Guest',player:'Player',top5_empty:'Nobody has scored here yet. Be the first!',
  too_fast:'Wait a few seconds between games to score.',implausible:'Unexpected score: not recorded.',bad_day:'The daily challenge has changed: play today’s.',login_required:'Sign in to score.',
  need_account:'Sign in with an account to appear on the leaderboard.',incomplete:'Unfinished game: not sent to the leaderboard.',sending:'Sending to the leaderboard…',send_fail:'Could not send to the leaderboard.',
  sent:'Sent to the leaderboard ✓',sent_pos:' · you are #{i} of {n}',rank_off:'Leaderboard unavailable: {e}',offline_send:'No internet: score not sent to the leaderboard.',
  t_rank:'Mental Math — Leaderboard',play_back:'‹ Play',p_day:'Today',p_week:'Week',p_all:'All time',pick_board:'Choose a leaderboard',loading:'Loading…',
  nobody:'Nobody has played yet. Be the first!',rank_fail:'Could not load the leaderboard.',nobody_period:'Nobody has scored in this period yet.',rank_offline:'No internet: the leaderboard needs a connection.',
  sq_zero1:'It ends in zero: work out {a}² and add two zeros.',sq_zero2:'Start with {a} × {a}.',
  sq1:'Use (n − d)(n + d) + d², where d is the distance to the nearest ten (here d = {d}).',sq2:'{a} × {b} = {p}. Now add {q}.',tab:'Use the {n} times table.',
  rt1:'Look for the number that, multiplied by itself, gives the value. Start with the last digit.',rt2:'It is between {t} (since {t}² = {tt}) and {u} (since {u}² = {uu}).',rt_end:' The root ends in {x} or {y}.',
  pw1:'Multiply the base by itself as many times as the exponent says.',pw_sq:'It is a square: {b} × {b}. Use (n − d)(n + d) + d².',pw2_1:'{b} × {b} = {bb}. Then multiply by {b} once more.',pw2_n:'{b} × {b} = {bb}. Then multiply by {b} again, {k} more times.',
  pc10_1:'10% is one tenth: divide by 10.',pc10_2:'Just move the decimal point one place to the left.',pc50_1:'50% is half.',pc50_2:'Divide by 2.',
  pc25_1:'25% is a quarter: half of half.',pc25_2:'Half of {b} = {h}. Now halve it again.',
  pc1:'Build it from easy pieces: 10% (divide by 10), 5% (half of 10%) and 1% (divide by 100).',pc2:'10% of {b} = {t}. Combine 10%, 5% and 1% to reach {p}%.',
  fm1:'Cancel the common factors: only the top numbers that are not in the bottom remain.',fm2:'What remains: {s}',
  f1:'Multiply all the integers from {n} down to 1, keeping the running result.',f2:'{n} × {a} = {p}. Now multiply by {b}.',f2m:'{n} × {a} = {p}. Now multiply by {b}, then by {c}, and so on.',
  add1:'Add in parts: first the biggest chunk of the second number, then the rest.',sub1:'Subtract in parts: first take away the biggest chunk of the second number, then the rest.',
  mul1:'Split the first number into round parts and multiply each part.',div1:'Think backwards: what number times the divisor gives the dividend?',
  dec1:' With decimals, ignore the point and put it back at the end (1 place).',nodec:' (without the point)',
  add2:'{a} + {p} = {r}. Now add {q}.',sub2:'{a} − {p} = {r}. Now take away {q}.',add2r:'Do it in one step: add {b} by going up to the next ten.',sub2r:'Do it in one step: take away {b} by going down to the next ten.',
  mul2:'{p} × {b} = {pb}. Now add {r} × {b}.',mul2t:'Straight from the times table: remember {b} × {a}.',
  div2t:'Use the {b} times table: which result gets closest to {a}?',div2:'{p} × {b} = {pb}. How much is left to reach {a}?'
},
es:{
  name:'Español',
  t_login:'Mental Math — Entrar',sub_login:'Entra para aparecer en el ranking.',
  pitch1:'9 operaciones, 4 niveles y 4 modos de práctica',pitch2:'Desafío del día: las mismas preguntas para todos',pitch3:'Ranking por modo y nivel, con apodo',
  tab_in:'Entrar',tab_up:'Crear cuenta',nick:'Apodo',nick_ph:'3 a 16: letras, números, _ . -',email:'Correo',pw:'Contraseña',pw_ph:'mínimo 8 caracteres',
  forgot:'Olvidé mi contraseña',guest_play:'Jugar como invitado',new_pw:'Nueva contraseña',save_pw:'Guardar nueva contraseña',type_new_pw:'Escribe tu nueva contraseña.',
  need_email:'Escribe tu correo arriba para recibir el enlace.',reset_sent:'Si existe una cuenta con ese correo, enviamos un enlace para crear una nueva contraseña.',reset_fail:'No se pudo enviar el correo.',
  nick_bad:'Apodo: 3 a 16 caracteres (letras, números, _ . -).',nick_taken:'Ese apodo ya está en uso.',created:'¡Cuenta creada! Confirma tu correo para entrar.',
  err_creds:'Correo o contraseña incorrectos.',err_exists:'Este correo ya está registrado.',err_confirm:'Confirma tu correo antes de entrar.',err_same_pw:'La nueva contraseña debe ser distinta de la anterior.',err_unexpected:'Error inesperado.',
  offline_login:'Sin internet: puedes jugar como invitado.',
  e_cfg:'config.js no se cargó: comprueba que está en la raíz del repositorio y que no tiene errores de escritura.',
  e_key:'config.js todavía tiene la clave de ejemplo: pega la clave publishable (sb_publishable_...) entre las comillas.',
  e_secret:'ATENCIÓN: esta es la clave SECRETA. Usa la publishable y rota la secreta en Supabase, porque quedó pública.',
  e_url:'La URL de Supabase en config.js es incorrecta.',e_lib:'La biblioteca de Supabase no se cargó.',e_mm:'Falta el archivo mm.js en el repositorio.',
  sub_game:'Si aciertas, avanza solo.',h_ops:'Operaciones',dec:'Números decimales',dec_d:'1 decimal, respuesta con coma',snd:'Sonidos',snd_d:'Un “plin” al acertar, un tono grave al fallar',
  h_lvl:'Nivel',h_mode:'Modo',go:'Empezar',top5:'Top 5 de esta configuración',ranking:'Ranking',out:'Salir',login:'Entrar',lang:'Idioma',
  op:'Operación {o}',op_add:'suma',op_sub:'resta',op_mul:'multiplicación',op_div:'división',op_f:'factorial',op_q:'cuadrado',op_r:'raíz cuadrada',op_p:'porcentaje',op_x:'potencia',
  lv1:'Fácil',lv2:'Medio',lv3:'Difícil',lv4:'Experto',
  m_sprint:'Sprint de 60 segundos',d_sprint:'Máximo de aciertos',m_n30:'30 preguntas',d_n30:'Menor tiempo; cada error suma 3s',
  m_daily:'Desafío del día',d_daily:'20 preguntas iguales para todos hoy; menor tiempo',m_surv:'Supervivencia',d_surv:'El tiempo se acorta; un error termina',
  r_sprint:'Sprint 60s',
  no_rec:'Sin récord en este modo y nivel.',rec:'Récord: {r}',hits_1:'{n} acierto',hits_n:'{n} aciertos',errs_1:'{n} error',errs_n:'{n} errores',
  quit:'Salir de la práctica',hint:'Pista',more_hint:'Más pista',skip:'Saltar',panel:'Panel',k_ok:'Aciertos',k_err:'Errores',k_st:'Racha',k_avg:'Tiempo medio',k_hint:'Pistas',
  keys1:'Escribe con el teclado: números, coma y ⌫ para borrar.',keys2:'H pide una pista · Esc sale.',k_del:'Borrar',k_dec:'Coma',
  pct_q:'{p}% de {b}',pen:' (+2s)',skipped:'Saltaste · era {c}',typed:'Escribiste {v} · era {c}',nothing:'nada',
  end_wrong:'Fallaste · era {c}',end_done:'¡Terminado!',end_time:'¡Tiempo!',end_timeout:'¡Se acabó el tiempo!',
  total_time:'tiempo total',hits_word:'aciertos',new_rec:'Nuevo récord',rec_none:'sin registro',
  s_ok:'Aciertos',s_err:'Errores',s_acc:'Precisión',s_avg:'Tiempo medio por acierto',s_ms:'Mejor racha',s_h:'Pistas usadas',review:'Para repasar',
  again:'Jugar otra vez',see_rank:'Ver ranking',back:'Volver al inicio',share:'Compartir resultado',copied:'Copiado ✓',share_fail:'No se pudo compartir',
  share_rec:' · ¡nuevo récord!',decimals:'decimales',
  guest:'Invitado',player:'Jugador',top5_empty:'Nadie ha puntuado aquí todavía. ¡Sé el primero!',
  too_fast:'Espera unos segundos entre partidas para puntuar.',implausible:'Puntuación inesperada: no registrada.',bad_day:'El desafío del día cambió: juega el de hoy.',login_required:'Entra en tu cuenta para puntuar.',
  need_account:'Entra con una cuenta para aparecer en el ranking.',incomplete:'Partida incompleta: no enviada al ranking.',sending:'Enviando al ranking…',send_fail:'No se pudo enviar al ranking.',
  sent:'Enviado al ranking ✓',sent_pos:' · estás en el #{i} de {n}',rank_off:'Ranking no disponible: {e}',offline_send:'Sin internet: puntuación no enviada al ranking.',
  t_rank:'Mental Math — Ranking',play_back:'‹ Jugar',p_day:'Hoy',p_week:'Semana',p_all:'Siempre',pick_board:'Elige el ranking',loading:'Cargando…',
  nobody:'Nadie ha jugado todavía. ¡Sé el primero!',rank_fail:'No se pudo cargar el ranking.',nobody_period:'Nadie ha puntuado en este periodo todavía.',rank_offline:'Sin internet: el ranking necesita conexión.',
  sq_zero1:'Termina en cero: calcula {a}² y añade dos ceros.',sq_zero2:'Empieza por {a} × {a}.',
  sq1:'Usa (n − d)(n + d) + d², con d la distancia a la decena más cercana (aquí d = {d}).',sq2:'{a} × {b} = {p}. Falta sumar {q}.',tab:'Usa la tabla del {n}.',
  rt1:'Busca el número que, multiplicado por sí mismo, da el valor. Empieza por el último dígito.',rt2:'Está entre {t} (porque {t}² = {tt}) y {u} (porque {u}² = {uu}).',rt_end:' La raíz termina en {x} o {y}.',
  pw1:'Multiplica la base por sí misma tantas veces como indica el exponente.',pw_sq:'Es un cuadrado: {b} × {b}. Usa (n − d)(n + d) + d².',pw2_1:'{b} × {b} = {bb}. Después multiplica por {b} una vez más.',pw2_n:'{b} × {b} = {bb}. Después multiplica por {b} otras {k} veces.',
  pc10_1:'El 10% es la décima parte: divide entre 10.',pc10_2:'Basta mover la coma un lugar a la izquierda.',pc50_1:'El 50% es la mitad.',pc50_2:'Divide entre 2.',
  pc25_1:'El 25% es un cuarto: la mitad de la mitad.',pc25_2:'La mitad de {b} = {h}. Ahora saca la mitad otra vez.',
  pc1:'Arma con partes fáciles: 10% (dividir entre 10), 5% (mitad del 10%) y 1% (dividir entre 100).',pc2:'El 10% de {b} = {t}. Combina 10%, 5% y 1% para llegar al {p}%.',
  fm1:'Cancela los factores comunes: solo quedan los números de arriba que no aparecen abajo.',fm2:'Quedan: {s}',
  f1:'Multiplica todos los enteros desde {n} hasta 1, guardando el resultado parcial.',f2:'{n} × {a} = {p}. Ahora multiplica por {b}.',f2m:'{n} × {a} = {p}. Ahora multiplica por {b}, después por {c} y así sucesivamente.',
  add1:'Suma por partes: primero la parte más grande del segundo número, después el resto.',sub1:'Resta por partes: quita primero la parte más grande del segundo número, después el resto.',
  mul1:'Descompón el primer número en partes redondas y multiplica cada parte.',div1:'Piensa al revés: ¿qué número por el divisor da el dividendo?',
  dec1:' Con decimales, ignora la coma y vuelve a ponerla al final (1 decimal).',nodec:' (sin coma)',
  add2:'{a} + {p} = {r}. Falta sumar {q}.',sub2:'{a} − {p} = {r}. Falta quitar {q}.',add2r:'Hazlo en un paso: suma {b} completando hasta la siguiente decena.',sub2r:'Hazlo en un paso: quita {b} completando hasta la siguiente decena.',
  mul2:'{p} × {b} = {pb}. Falta {r} × {b}.',mul2t:'Directo de la tabla: recuerda {b} × {a}.',
  div2t:'Usa la tabla del {b}: ¿qué resultado se acerca más a {a}?',div2:'{p} × {b} = {pb}. ¿Cuánto falta para llegar a {a}?'
}};
const KEY='mm_lang';
let lang;
try{lang=localStorage.getItem(KEY)}catch(e){}
if(!D[lang])lang=[...(navigator.languages||[navigator.language||''])].map(x=>String(x).slice(0,2).toLowerCase()).find(x=>D[x])||'pt';
const t=(k,p)=>{const s=D[lang][k]??D.pt[k]??k;return p?s.replace(/\{(\w+)\}/g,(m,x)=>p[x]??m):s};
window.L={
  lang,t,
  n:(k,n,p)=>t(k+(n==1?'_1':'_n'),Object.assign({n},p)),
  dec:lang==='en'?'.':',',
  // "2026-10-09" -> 09/10 (pt, es) ou 10/09 (en)
  dm:d=>lang==='en'?d.slice(5,7)+'/'+d.slice(8):d.slice(8)+'/'+d.slice(5,7),
  apply(root){
    root=root||document;document.documentElement.lang=lang==='pt'?'pt-BR':lang;
    root.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));
    root.querySelectorAll('[data-i18n-ph]').forEach(e=>e.placeholder=t(e.dataset.i18nPh));
    root.querySelectorAll('[data-i18n-aria]').forEach(e=>e.setAttribute('aria-label',t(e.dataset.i18nAria)));
    const ti=document.querySelector('title[data-i18n]');if(ti)document.title=t(ti.dataset.i18n);
    root.querySelectorAll('select.lang').forEach(s=>{
      s.innerHTML='';s.setAttribute('aria-label',t('lang'));
      Object.keys(D).forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=D[k].name;o.selected=k===lang;s.appendChild(o)});
      s.onchange=()=>{try{localStorage.setItem(KEY,s.value)}catch(e){}location.reload()};
    });
  }
};
})();
