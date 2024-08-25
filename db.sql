create table price_plan (
    id integer primary key AUTOINCREMENT,
    plan_name text,
    sms_price real,
    call_price real
);

select * from price_plan

insert into price_plan (plan_name, sms_price, call_price) values ('sms 101', 2.35, 0.37);
insert into price_plan (plan_name, sms_price, call_price) values ('call 101', 1.75, 0.65);
insert into price_plan (plan_name, sms_price, call_price) values ('call 201', 1.85, 0.85);
insert into price_plan (plan_name, sms_price, call_price) values ('call 101', 1.75, 0.65);
-- insert into price_plan (plan_name, sms_price, call_price) values ('Piwe', 1.35, 0.68);
insert into price_plan (plan_name, sms_price, call_price) values ('Sive', 1.55, 0.45); 
-- DELETE FROM price_plan WHERE id = 5
insert into price_plan (plan_name, sms_price, call_price) values ('Sive', 1.55, 0.45);
-- DELETE FROM price_plan WHERE id = 6