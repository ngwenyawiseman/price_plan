CREATE TABLE price_plan (
    id INT PRIMARY KEY IDENTITY(1,1),
    plan_name NVARCHAR(255),
    sms_price DECIMAL(10, 2),
    call_price DECIMAL(10, 2)
);

-- DROP TABLE price_plan;
