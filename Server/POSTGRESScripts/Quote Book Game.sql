drop table if exists "person" cascade;
drop table if exists "quote" cascade;
drop table if exists "people_in" cascade;
drop table if exists "group_head" cascade;
drop table if exists "group_line" cascade;
drop table if exists "users" cascade;

CREATE TABLE "person" (
  "person_id" int generated always as identity primary key,
  "user_id" int,
  "name" varchar,
  "createdby" int
);

CREATE TABLE "quote" (
  "quote_id" int generated always as identity primary key,
  "date" date,
  "num_people" int,
  "text" varchar(255),
  "context" varchar(255),
  "created_by" int
);

CREATE TABLE "people_in" (
  "person_id" int,
  "quote_id" int,
  "position_in_quote" int,
  
  constraint people_in_pk primary key (person_id,quote_id)
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

ALTER TABLE "people_in" ADD FOREIGN KEY ("person_id") REFERENCES "person" ("person_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "people_in" ADD FOREIGN KEY ("quote_id") REFERENCES "quote" ("quote_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "group_line" ADD FOREIGN KEY ("group_id") REFERENCES "group_head" ("group_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "group_head" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "person" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "quote" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "person" ADD FOREIGN KEY ("createdby") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "group_line" ADD FOREIGN KEY ("person_id") REFERENCES "person" ("person_id") DEFERRABLE INITIALLY IMMEDIATE;

