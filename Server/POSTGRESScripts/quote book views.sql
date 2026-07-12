select * from public.person p;
select * from public.users u ;
select * from quote_head;
select * from quote_line ql;
select count(created_by) from quote where created_by = 1;
select count(created_by) from person where created_by = 1;

select * from "quote" q where created_by = 1;
SELECT * FROM users ORDER BY id asc;

select * from "quote" q join users u on (q.quote_id = u.id);
select * from "person" q join users u on (q.person_id = u.id);


select person_id from person where "name" = 'Sam' and created_by = 1;


CREATE OR REPLACE procedure addQuote(text_in varchar(255), people varchar[], user_id int,date date)
as $$
DECLARE
    current_name varchar(255);
	current_quote_id int = 1000;
	person_count int = 1;
BEGIN
	insert into quote (text,num_people,created_by,date) values (text_in,cardinality(people),user_id,date) returning quote_id into current_quote_id;
    FOR current_name IN SELECT unnest(people) LOOP
		insert into people_in (person_id,quote_id,position_in_quote) values ((select person_id from person where "name" = current_name and created_by = 1),current_quote_id,person_count);
		person_count = person_count +1;
--        RAISE NOTICE 'Value: %', current_name;
    END LOOP;
END 
$$ LANGUAGE plpgsql;

 call addQuote('asd',array['Sam','Taron'],1);


CREATE OR REPLACE procedure addQuote(lines varchar(255)[], people varchar(255)[], user_id int, date date)
as $$
DECLARE
    current_name varchar(255);
	current_quote_id int = 1000;
	line_count int = 1;
BEGIN
	insert into quote_head (date,creator_id) values (date,user_id) returning quote_id into current_quote_id;
    FOR current_name IN SELECT unnest(people) LOOP
		insert into quote_line (line_num,person_id,quote_id,text) values (line_count,(select person_id from person where "name" = current_name and created_by = 1),current_quote_id,lines[line_count]);
		line_count = line_count + 1;
--        RAISE NOTICE 'Value: %', current_name;
    END LOOP;
END 
$$ LANGUAGE plpgsql;

call addQuote(ARRAY['line1','line2'],ARRAY['Sam', 'Birui'],1,CAST('2026/06/23' AS DATE));
 
 
 drop procedure addquote;
 
 insert into quote (text,num_people,created_by,date) values ('asdtext_in',2,1,CAST('2026/06/23' AS DATE) );
 
 select * from "quote" q ;
 
 with target_person_id as (select p.person_id from person p where p.name = 'Rohit' and p.created_by = 1 limit 1)
 	select t.quote_id from people_in t where t.person_id = target_person_id;
 
create or replace function get_quotes_by_person(input_name varchar) 
	returns table 
		(quote_id int,
		 quote_text varchar,
		 context varchar,
		 quote_date date)
		as $$
	begin
		return query
			with ids_for_relevant_quotes as (select t.quote_id from people_in t where t.person_id = (
 				select p.person_id from person p where p.name = input_name and p.created_by = 1 limit 1))
			select q.quote_id,q.text,q.context,q.date from ids_for_relevant_quotes ifrq
 				join quote q on q.quote_id = ifrq.quote_id;
	end $$ LANGUAGE plpgsql;
 	
drop function get_quotes_by_person;

select quote_text,context,quote_date from get_quotes_by_person(cast('Taron' as varchar));

with select person_id from person where "name" = 'Rohit' and created_by = 1 limit 1;

select * from "quote" q where q.created_by =1 order by date desc;



create or replace function get_quote_by_id(input_id int)
	returns table 
		(quote_text varchar,
	 	context varchar,
	 	people varchar[],
	 	date date)
	as $$
	begin
	return query
	select x.quote_text,x.context,ARRAY_AGG(x.name) as people,x.date from (
		select q.text as quote_text,p."name",q.date,q.context  
		from "quote" q 
		join people_in pi on pi.quote_id = q.quote_id 
		join person p on p.person_id = pi.person_id 
		where q.quote_id = input_id ) as x
		group by x.quote_text,x.date,x.context;
	end $$ LANGUAGE plpgsql;

drop function get_quote_by_id;

 select * from get_quote_by_id(1);
 
create or replace function get_quotes_by_ids(input_ids int[])
	returns table 
		(quote_text varchar,
	 	context varchar,
	 	people varchar[],
	 	date date)
	as $$
	declare 
		current_index int;
	begin
		create temp table current_output (quote_text varchar,
	 			context varchar,
	 			people varchar[],
	 			date date) on commit drop;
		for current_index in select unnest(input_ids) loop
			insert into current_output (quote_text,context,people,date) select * from get_quote_by_id(input_ids[current_index]);
		end loop;
		return query (select * from current_output);
	end $$ LANGUAGE plpgsql;
	
select * from get_quotes_by_ids(ARRAY[1,2,3]);

create or replace view total_quotes as 
	select qh.quote_id, qh.creator_id from (quote_head qh
	join quote_line ql on (qh.quote_id = ql.quote_id)); 

select * from total_quotes;
drop view total_quotes;

create or replace view stats_by_person as 
	select p.name, temp.count 
		from ( select ql.person_id,count(ql.person_id) as count 
			from quote_line ql group by ql.person_id) as temp 
			join person p on (p.person_id = temp.person_id)
		order by temp.count desc; 

select * from stats_by_person;
drop view stats_by_person;

select * from (quote_head qh
	join quote_line ql on (qh.quote_id = ql.quote_id))
