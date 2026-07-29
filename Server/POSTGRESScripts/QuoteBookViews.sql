drop procedure if exists addQuote;
drop function if exists getQuoteByID;
drop function if exists getRandomQuote;
drop view if exists total_quotes;
drop view if exists stats_by_person;
drop view if exists quotes_by_month;

CREATE OR REPLACE procedure addQuote(lines varchar(255)[], people varchar(255)[], current_user_id int, date date)
as $$
DECLARE
    current_name varchar(255);
	current_quote_id int = 1000;
	line_count int = 1;
BEGIN
	insert into quote_head (date,creator_id) values (date,current_user_id) returning quote_id into current_quote_id;
    FOR current_name IN SELECT unnest(people) LOOP
		insert into quote_line (line_num,person_id,quote_id,text) values (line_count,(select person_id from person where "name" = current_name and created_by = current_user_id),current_quote_id,lines[line_count]);
		line_count = line_count + 1;
--        RAISE NOTICE 'Value: %', current_name;
    END LOOP;
END 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE function getQuoteByID(target_quote_id int)
returns table(quote_agg _varchar, names_agg _varchar, quote_date date, context varchar(255))
as $$
BEGIN
    return query(
	  with aggregate_quotes as (
         select array_agg(text) as quote_agg,array_agg(name) as names_agg ,max(quote_id) as quote_id 
         from quote_line ql join person p on (ql.person_id = p.person_id) 
         where ql.quote_id = target_quote_id)
      select aggregate_quotes.quote_agg,aggregate_quotes.names_agg,qh.date as quote_date,qh.context from aggregate_quotes join quote_head qh on (qh.quote_id = aggregate_quotes.quote_id));
END 
$$ LANGUAGE plpgsql;

CREATE OR REPLACE function getRandomQuote(current_user_id int)
returns table(quote_agg _varchar, names_agg _varchar, quote_date date, context varchar(255))
as $$
declare 
	temp int;
BEGIN
	select quote_id into temp from quote_head qh where qh.creator_id = 1 order by random() limit 1;
    return query(select * from getQuoteByID(temp));
END 
$$ LANGUAGE plpgsql;

create or replace view total_quotes as 
	select qh.quote_id, qh.creator_id from (quote_head qh
	join quote_line ql on (qh.quote_id = ql.quote_id)); 


create or replace view stats_by_person as 
	select p.name, temp.count, p.created_by
		from ( select ql.person_id,count(ql.person_id) as count 
			from quote_line ql group by ql.person_id) as temp 
			join person p on (p.person_id = temp.person_id)
		order by temp.count desc;

create or replace view quotes_by_month as
with processing1 as (
	select date_trunc('month',date) as dateInfo, count(date) from quote_head group by dateInfo order by count desc
	)
	select concat(to_char(dateInfo,'yyyy'),'-', to_char(dateInfo,'MM')) as date,count from processing1 order by date desc;

