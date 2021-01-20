USE employee_tracker_db;


-- department
INSERT INTO department (name)
VALUES ("bakery")

-- role
INSERT INTO role (title, salary, department_id)
VALUES ("head chef", "500000", 1)

-- employees
INSERT INTO employees (first_name, last_name, role_id)
VALUES ("hannah", "starcevich", 1)
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("kevin", "lyons", 1, 1)

