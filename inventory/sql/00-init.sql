\c postgres
drop database inventory;
create database inventory;
\c inventory
create table users (
	user_id serial primary key,
	email text not null,
	created timestamp default current_timestamp
	);
create table questionnaires (
	questionnaire_id serial primary key,
	answers jsonb not null default '{}',
	submitted timestamp default current_timestamp,
	user_id integer references users (user_id)
	);
create table marketplaces (
	marketplace_id serial primary key,
	marketplace_name text not null
	);
insert into marketplaces (marketplace_name) values
	('shopify'), 
	('taobao'), 
	('wechat');
create table items (
	item_id serial primary key,
	details jsonb not null default '{}',
	marketplace_id integer references marketplaces (marketplace_id) not null
	);

