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
    connection.end();
    // runSearch();
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

                case "UPDATE EMPLOYEE":
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function employeeSearch() {
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].first_name, res[i].last_name);
        }
        runSearch();
    });
}

function roleSearch() {
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].title);
        }
        runSearch();
    });
}

function departmentSearch() {
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].name);
        }
        runSearch();
    });
}

function departmentAdd() {
    inquirer.prompt([
        name: "name",
        message: "What is the department you'd like to add?"
    ]).then(res => {
        connection.query(query, function (err, res) {
            "INSERT INTO department SET ?",
            {
                name: res.name,
            }, function (err, res) {
                if (err) throw err
                departmentSearch();
            }
        });
    })
};

function roleAdd() {
    inquirer.prompt([
        name: "name",
        message: "What is the role you'd like to add?"
    ]).then(res => {
        connection.query(query, function (err, res) {
            "INSERT INTO role SET ?",
            {
                name: res.name,
            }, function (err, res) {
                if (err) throw err
                roleSearch();
            }
        });
    })
};

function employeeAdd() {
    inquirer.prompt([
        name: "name",
        message: "What is the name of the employee you'd like to add?"
    ]).then(res => {
        connection.query(query, function (err, res) {
            "INSERT INTO employee SET ?",
            {
                name: res.name,
            }, function (err, res) {
                if (err) throw err
                employeeSearch();
            }
        });
    })
};

function deleteEmployee() {
    connection.query(
        "DELETE FROM employees WHERE ?",
        {
            name: "Kalani"
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee deleted!\n");
            // Call readProducts AFTER the DELETE completes
            runSearch();
        }
    );
};

function deleteRole() {
    connection.query(
        "DELETE FROM roles WHERE ?",
        {
            name: "Intern"
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " roles deleted!\n");
            runSearch();
        }
    );
};

function deleteDepartment() {
    connection.query(
        "DELETE FROM department WHERE ?",
        {
            name: "Sales"
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " roles deleted!\n");
            runSearch();
        }
    );
};