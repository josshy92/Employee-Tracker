INSERT INTO department (department_name)
VALUES ("Human Resources"),
       ("Sales"),
       ("IT"),
       ("Customer Service");

INSERT INTO employee_role (title, salary,department_id)
VALUES ("Benefits Trainer", 50000, 1),
       ("Lead Sales", 60000, 2),
       ("Software Engineer", 100000, 3),
       ("CSA", 40000, 4);

INSERT INTO employee_info (first_name, last_name,  role_id)
VALUES ("Liz","Test", 1),
       ("Kari", "Testing", 2),
       ("Mari", "Testa",  3),
       ("Ganyu", "Miho", 4);
