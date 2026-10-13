-- Mental Math — ranking geral por pontos (pontos por acerto conforme a dificuldade).
-- Só ACRESCENTA funções e um índice: não altera tabelas, dados nem as funções já existentes.
--
-- Pontos de uma partida = acertos × pontos por acerto × bônus do modo × precisão
--   • pontos por acerto: tabela abaixo (operação × nível), proporcional ao tempo típico
--     de cada conta, com bônus crescente nos níveis difíceis. Com várias operações,
--     vale a média (cada questão sorteia uma delas). Decimais: ×1,5 nas contas + − × ÷.
--   • bônus do modo: Desafio do dia ×1,2 · Sobrevivência ×1,3.
--   • precisão: acertos / (acertos + erros).
--   • trava contra valores impossíveis: no máximo 10× mais rápido que o tempo típico
--     (Sobrevivência: no máximo 150 acertos).
-- O jogo (points.js) faz a mesma conta para mostrar os pontos ao jogador.

create or replace function public.run_points(p_board text, p_mode text, p_score integer, p_ok integer, p_err integer)
returns integer
language sql
immutable
set search_path to ''
as $$
  with a as (
    select string_to_array(p_board, '|') as p
  ), c as (
    select case when p_mode = 'daily' then p[3] else p[2] end as lvl,
           coalesce(case when p_mode = 'daily' then p[4] else p[3] end = '1', false) as dec,
           coalesce(case when p_mode = 'daily' then p[5] else p[4] end, '') as ops
    from a
  ), t(op, l1, l2, l3, l4) as (
    values ('+', 25,  65, 150, 375), ('−', 25,  70, 160, 390), ('×', 20,  65, 225, 600),
           ('÷', 25,  65, 225, 600), ('²', 10,  55, 125, 225), ('√', 10,  45, 100, 180),
           ('%', 60, 110, 200, 450), ('^', 20,  65, 200, 375), ('!', 20,  55, 150, 270)
  ), v as (
    -- Conta só com inteiros (pontos ×10, bônus de nível ×100) para dar exatamente o mesmo
    -- resultado que o JavaScript do jogo.
    select sum(case c.lvl when '1' then t.l1 when '2' then t.l2 when '3' then t.l3 when '4' then t.l4 end
               * case when c.dec and t.op in ('+', '−', '×', '÷') then 15 else 10 end)::bigint as sp10,
           count(*)::bigint as n,
           max(case c.lvl when '1' then 100 when '2' then 110 when '3' then 125 when '4' then 150 end)::bigint as tilt
    from c
    cross join lateral regexp_split_to_table(c.ops, '') as ch
    join t on t.op = ch
  ), k as (
    select v.sp10, v.n,
           case when p_mode = 'surv'   then 150
                when p_mode = 'sprint' then (600 * v.n * v.tilt) / v.sp10
                else (greatest(p_score, 0)::bigint * v.n * v.tilt) / (100 * v.sp10)
           end as cap
    from v
    where v.sp10 > 0 and v.tilt is not null
  )
  select coalesce((
    select round((least(p_ok, k.cap) * k.sp10 * case p_mode when 'daily' then 12 when 'surv' then 13 else 10 end * p_ok)::numeric
                 / (100 * k.n * (p_ok + p_err)))::integer
    from k
    where p_ok > 0
  ), 0);
$$;

-- Ranking geral: soma dos pontos de cada jogador no período ('day', 'week' ou 'all').
-- No Desafio do dia conta só a melhor partida de cada dia (as questões se repetem).
create or replace function public.leaderboard_points(p_period text default 'all')
returns table(pos bigint, nickname text, points bigint, runs bigint)
language sql
stable
set search_path to ''
as $$
  with f as (
    select r.user_id, r.board, r.mode, public.run_points(r.board, r.mode, r.score, r.ok, r.err) as pts
    from public.runs r
    where case p_period
            when 'day'  then r.created_at >= (date_trunc('day', now() at time zone 'America/Sao_Paulo') at time zone 'America/Sao_Paulo')
            when 'week' then r.created_at >= now() - interval '7 days'
            else true end
  ), d as (
    select f.user_id, max(f.pts) as pts, count(*) as n from f where f.mode = 'daily' group by f.user_id, f.board
    union all
    select f.user_id, f.pts, 1 from f where f.mode <> 'daily'
  ), s as (
    select d.user_id, sum(d.pts)::bigint as points, sum(d.n)::bigint as runs from d group by d.user_id
  )
  select row_number() over (order by s.points desc, p.nickname) as pos, p.nickname, s.points, s.runs
  from s join public.profiles p on p.id = s.user_id
  where s.points > 0
  order by pos
  limit 100;
$$;

grant execute on function public.run_points(text, text, integer, integer, integer) to anon, authenticated;
grant execute on function public.leaderboard_points(text) to anon, authenticated;

create index if not exists runs_created_idx on public.runs (created_at desc);
