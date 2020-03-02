const mysql = require("mysql");
const inquirer = require("inquirer");
console.table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "employeetracker_DB"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Working!")
    // connection.end();
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "VIEW all EMPLOYEES",
                "VIEW all ROLES",
                "VIEW all DEPARTMENTS",
                "ADD EMPLOYEE",
                "ADD DEPARTMENT",
                "ADD ROLE",
                "UPDATE EMPLOYEE ROLE",
                "UPDATE MANAGER",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "VIEW all EMPLOYEES":
                    employeeSearch();
                    break;

                case "VIEW all ROLES":
                    roleSearch();
                    break;

                case "VIEW all DEPARTMENTS":
                    departmentSearch();
                    break;

                case "ADD EMPLOYEE":
                    employeeAdd();
                    break;

                case "ADD ROLE":
                    roleAdd();
                    break;

                case "ADD DEPARTMENT":
                    departmentAdd();
                    break;

                case "UPDATE EMPLOYEE ROLE":
                    employeeUpdate();
                    break;

                case "UPDATE MANAGER":
                    managerUpdate();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function employeeSearch() {
    connection.query("SELECT * FROM EMPLOYEE ", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].first_name, res[i].last_name);
        }
        runSearch();
    });
}

function roleSearch() {
    connection.query("SELECT * FROM role ", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].title);
        }
        runSearch();
    });
}

function departmentSearch() {
    connection.query("SELECT * FROM department ", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].name);
        }
        runSearch();
    });
}

function departmentAdd() {
    inquirer.prompt([{
        name: "name",
        message: "What is the department you'd like to add?"
    }]).then(res => {
        connection.query("INSERT INTO department SET ? ", {
            name: res.name,
        }, function (err, res) {
            if (err) throw err
            departmentSearch();
        });
    })
};

function roleAdd() {
    inquirer.prompt([{
        name: "title",
        message: "What is the role you'd like to add?"
    },
    {
        name: "salary",
        message: "What is the salary for this role?"
    },
    {
        name: "departmentid",
        message: "What is the department ID of this role?"
    }
    ]).then(res => {
        connection.query("INSERT INTO role SET ?", {
            title: res.title,
            salary: res.salary,
            department_id: res.departmentid
        }, function (err, res) {
            if (err) throw err
            roleSearch();
        });
    })
};

function employeeAdd() {
    inquirer.prompt([{
        name: "first_name",
        message: "What is the frist name of the employee you'd like to add?"
    }, {

        name: "last_name",
        message: "What is the last name of the employee you'd like to add?"
    }, {

        name: "role_id",
        message: "What is the role id of the employee you'd like to add?"
    }, {
        name: "manager_id",
        message: "What is the manager id assigned to this employee?"
    }
    ]).then(res => {
        connection.query("INSERT INTO employee SET ?", {
            first_name: res.first_name,
            last_name: res.last_name,
            role_id: res.role_id,
            manager_id: res.manager_id
        }, function (err, res) {
            if (err) throw err
            employeeSearch();
        }
        );
    })
};

function employeeUpdate() {
    inquirer.prompt([{
        name: "id",
        message: "What is the id of the role you'd like to update?"
    },
    {
        name: "title",
        message: "What is the new role title?"
    },
    {
        name: "salary",
        message: "What is the salary for this role?"
    },
    {
        name: "departmentid",
        message: "What is the department ID of this role?"
    }
    ]).then(res => {
        connection.query("UPDATE role SET title = ? , salary = ? , department_id = WHERE id = ? ", [
            res.title,
            res.salary,
            res.departmentid,
            res.id
        ], function (err, res) {
            if (err) throw err
        });
    })
}

function managerUpdate() {
    inquirer.prompt([{
        name: "last_name",
        message: "What is the last name of the employee you'd like to update the manager for?"
    }, {
        name: "manager_id",
        message: "What is the new manager ID you'd like to assign this employee too?"
    }
    ]).then(res => {
        connection.query("UPDATE employee SET manager_id = ? WHERE last_name = ?", [
            res.manager_id,
            res.last_name
        ], function (err, res) {
            if (err) throw err
        });
    })
}