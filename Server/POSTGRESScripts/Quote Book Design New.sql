drop table if exists "person" cascade;
drop table if exists "quote" cascade;
drop table if exists "people_in" cascade;
drop table if exists "group_head" cascade;
drop table if exists "group_line" cascade;
drop table if exists "users" cascade;
drop table if exists "quote_head" cascade;
drop table if exists "quote_line" cascade;

CREATE TABLE "person" (
  "person_id" int generated always as identity primary key,
  "user_id" int,
  "name" varchar,
  "created_by" int
);

CREATE TABLE "quote_head" (
  "quote_id" int generated always as identity primary key,
  "date" date,
  "context" varchar(255),
  "creator_id" int
);

CREATE TABLE "quote_line" (
  "line_num" int,
  "quote_id" int,
  "person_id" int,
  "text" varchar(255),
  
  constraint quote_line_pk primary key (line_num,quote_id)
);

CREATE TABLE "group_head" (
  "group_id" int unique,
  "created_by" int,
  
  constraint group_head_pk primary key (group_id)
);

CREATE TABLE "group_line" (
  "group_id" int unique,
  "person_id" int,
  
  constraint group_line_pk primary key (group_id)
);

CREATE TABLE "users" (
  "id" integer generated always as identity primary key,
  "name" varchar(255) unique,
  "password" varchar(255)
);

ALTER TABLE "group_line" ADD FOREIGN KEY ("group_id") REFERENCES "group_head" ("group_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "group_head" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "person" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "quote_head" ADD FOREIGN KEY ("creator_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "quote_line" ADD FOREIGN KEY ("person_id") REFERENCES "person" ("person_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "quote_line" ADD FOREIGN KEY ("quote_id") REFERENCES "quote_head" ("quote_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "person" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "group_line" ADD FOREIGN KEY ("person_id") REFERENCES "person" ("person_id") DEFERRABLE INITIALLY IMMEDIATE;

