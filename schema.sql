DROP DATABASE IF EXISTS employeetracker_DB;
CREATE database employeetracker_DB;

USE employeetracker_DB;

CREATE TABLE employee
(
  id INT NOT NULL
  auto_increment,
  first_name VARCHAR
  (50) NOT NULL,
  last_name VARCHAR
  (50) NOT NULL,
  role_id INT
  (20) NOT NULL,
  manager_id int NULL,
  PRIMARY KEY
  (id)
);


  CREATE TABLE role
  (
    id INT NOT NULL
    auto_increment,
  title VARCHAR
    (50) NOT NULL,
  salary DECIMAL
    (10,4) NOT NULL,
  department_id INT
    (20) NOT NULL,
  PRIMARY KEY
    (id)
);

    CREATE TABLE department
    (
      id INT NOT NULL
      auto_increment,
  name VARCHAR
      (50) NOT NULL,
  PRIMARY KEY
      (id)
);

      SELECT *
      FROM employee;
      SELECT *
      FROM role;
      SELECT *
      FROM department;

      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ("Brittni", "Lighthizer", "1", "2"),
        ("Kalani", "Kitkouski", "2", "1"),
        ("Tara", "Hughes", "3", "2");

      INSERT INTO role
        (title, salary, department_id)
      VALUES
        ("Salesperson", 80500, "1"),
        ("Lead Engineer", 95000, "2"),
        ("Lawyer", 105000, "3");

      INSERT INTO department
        (name)
      VALUES
        ("Sales"),
        ("Engineering"),
        ("Legal");