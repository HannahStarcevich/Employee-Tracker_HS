USE employee_tracker_db;


-- department
INSERT INTO department (name)
VALUES ("HR"), ("Sales"), ("IT"), ("Operations");

-- role
INSERT INTO role (title, salary, department_id)
VALUES ("Recruiter", 70000, 1), ("Technical Recruiter", 80000, 1), ("Seller", 95000, 2),("Software Engineer", 120000, 3),("Operations Lead", 90000, 4),("Boss", 140000, 3);

-- employees
INSERT INTO employees (first_name, last_name, role_id)
VALUES ("head", "hancho", 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("hannah", "banana", 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("joe", "shmoe", 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("jack", "black", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("jessie", "bessie", 3, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("mike", "ike", 5, 1);