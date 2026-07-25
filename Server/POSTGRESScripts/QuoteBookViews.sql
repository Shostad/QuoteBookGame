drop procedure if exists addQuote;
drop view if exists total_quotes;
drop view if exists stats_by_person;
drop view if exists quotes_by_month;

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

CREATE OR REPLACE procedure addQuote(lines varchar(255)[], people varchar(255)[], user_id int)
as $$
DECLARE
    current_name varchar(255);
	current_quote_id int = 1000;
	line_count int = 1;
BEGIN
	insert into quote_head (date,creator_id) values (CAST('01/01/28' as DATE),user_id) returning quote_id into current_quote_id;
    FOR current_name IN SELECT unnest(people) LOOP
		insert into quote_line (line_num,person_id,quote_id,text) values (line_count,(select person_id from person where "name" = current_name and created_by = 1),current_quote_id,lines[line_count]);
		line_count = line_count + 1;
    END LOOP;
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

