-- Create the table
CREATE TABLE price_plan (
    id INT IDENTITY(1,1) PRIMARY KEY,
    plan_name NVARCHAR(255),
    sms_price FLOAT,
    call_price FLOAT
);

-- Insert data into the table
INSERT INTO price_plan (plan_name, sms_price, call_price) VALUES ('sms 101', 2.35, 0.37);
INSERT INTO price_plan (plan_name, sms_price, call_price) VALUES ('call 101', 1.75, 0.65);
INSERT INTO price_plan (plan_name, sms_price, call_price) VALUES ('call 201', 1.85, 0.85);
INSERT INTO price_plan (plan_name, sms_price, call_price) VALUES ('call 101', 1.75, 0.65);
-- Uncomment the following line to insert 'Piwe'
-- INSERT INTO price_plan (plan_name, sms_price, call_price) VALUES ('Piwe', 1.35, 0.68);
INSERT INTO price_plan (plan_name, sms_price, call_price) VALUES ('Sive', 1.55, 0.45); 
-- DELETE FROM price_plan WHERE id = 5; -- If needed, uncomment to delete
INSERT INTO price_plan (plan_name, sms_price, call_price) VALUES ('Sive', 1.55, 0.45);
-- DELETE FROM price_plan WHERE id
