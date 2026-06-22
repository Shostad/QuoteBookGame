select * from public.person p;
select * from public.users u ;
select * from quote;
select count(created_by) from quote where created_by = 1;

SELECT * FROM users ORDER BY id asc;

select * from "quote" q join users u on (q.quote_id = u.id);
select * from "person" q join users u on (q.person_id = u.id);
