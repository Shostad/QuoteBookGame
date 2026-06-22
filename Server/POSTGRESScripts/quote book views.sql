select * from public.person p;
select * from public.users u ;
select * from quote;

SELECT * FROM users ORDER BY id asc;

select * from "quote" q join users u on (q.quote_id = u.id);
select * from "person" q join users u on (q.person_id = u.id);
