INSERT INTO departments (name, budget) VALUES
  ('Engineering', 1500000.00),
  ('Marketing', 800000.00),
  ('Sales', 600000.00),
  ('HR', 400000.00),
  ('Finance', 700000.00)
ON CONFLICT DO NOTHING;

INSERT INTO employees (name, department_id, salary, hire_date) VALUES
  ('Alice Johnson', 1, 95000.00, '2019-03-15'),
  ('Bob Smith', 2, 72000.00, '2020-07-01'),
  ('Carol White', 1, 110000.00, '2018-01-10'),
  ('David Brown', 3, 60000.00, '2021-09-22'),
  ('Eva Martinez', 4, 55000.00, '2022-02-14'),
  ('Frank Lee', 1, 88000.00, '2020-11-05'),
  ('Grace Kim', 5, 78000.00, '2019-06-30'),
  ('Hank Wilson', 3, 65000.00, '2021-04-17'),
  ('Iris Chen', 2, 69000.00, '2020-08-19'),
  ('Jack Turner', 1, 102000.00, '2017-12-01'),
  ('Karen Hall', 4, 52000.00, '2023-01-09'),
  ('Leo Adams', 5, 83000.00, '2018-09-25'),
  ('Mia Scott', 3, 67000.00, '2022-06-11'),
  ('Nate Green', 1, 91000.00, '2019-10-28'),
  ('Olivia Clark', 2, 74000.00, '2021-03-03'),
  ('Peter Lewis', 5, 79000.00, '2020-05-16'),
  ('Quinn Robinson', 4, 57000.00, '2023-07-22'),
  ('Rose Walker', 1, 98000.00, '2018-04-08'),
  ('Sam Harris', 3, 63000.00, '2022-11-14'),
  ('Tina Young', 2, 71000.00, '2021-08-27')
ON CONFLICT DO NOTHING;

INSERT INTO customers (name, email, city) VALUES
  ('Acme Corp', 'acme@example.com', 'New York'),
  ('BlueStar Inc', 'bluestar@example.com', 'Chicago'),
  ('CloudNine LLC', 'cloudnine@example.com', 'San Francisco'),
  ('DataPeak Co', 'datapeak@example.com', 'Austin'),
  ('EchoTech Ltd', 'echotech@example.com', 'Seattle'),
  ('FluxMedia', 'fluxmedia@example.com', 'Denver'),
  ('GreenWave', 'greenwave@example.com', 'Portland'),
  ('Hyperion Group', 'hyperion@example.com', 'Boston'),
  ('Ironclad LLC', 'ironclad@example.com', 'Miami'),
  ('JetSet Solutions', 'jetset@example.com', 'Los Angeles')
ON CONFLICT DO NOTHING;

INSERT INTO orders (customer_id, product, amount, created_at) VALUES
  (1, 'Cloud Storage Plan', 1200.00, '2024-01-15 10:30:00'),
  (2, 'Analytics Dashboard', 3500.00, '2024-01-18 14:00:00'),
  (3, 'API Gateway License', 800.00, '2024-02-02 09:15:00'),
  (4, 'Data Pipeline Setup', 5000.00, '2024-02-10 11:45:00'),
  (5, 'Security Audit', 2200.00, '2024-02-20 16:00:00'),
  (1, 'Premium Support', 600.00, '2024-03-01 08:00:00'),
  (6, 'Cloud Storage Plan', 1200.00, '2024-03-05 13:30:00'),
  (7, 'Load Balancer License', 1800.00, '2024-03-12 10:00:00'),
  (8, 'Data Pipeline Setup', 5000.00, '2024-03-18 15:20:00'),
  (9, 'Analytics Dashboard', 3500.00, '2024-03-22 12:00:00'),
  (10, 'API Gateway License', 800.00, '2024-04-01 09:30:00'),
  (2, 'Premium Support', 600.00, '2024-04-08 11:00:00'),
  (3, 'Security Audit', 2200.00, '2024-04-15 14:45:00'),
  (4, 'Load Balancer License', 1800.00, '2024-04-20 10:30:00'),
  (5, 'Cloud Storage Plan', 1200.00, '2024-05-03 09:00:00'),
  (6, 'Analytics Dashboard', 3500.00, '2024-05-10 13:00:00'),
  (7, 'API Gateway License', 800.00, '2024-05-17 15:00:00'),
  (8, 'Premium Support', 600.00, '2024-05-24 11:30:00'),
  (9, 'Data Pipeline Setup', 5000.00, '2024-06-01 09:45:00'),
  (10, 'Security Audit', 2200.00, '2024-06-08 14:00:00')
ON CONFLICT DO NOTHING;
