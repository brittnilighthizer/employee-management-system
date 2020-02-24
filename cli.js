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

// function runSearch() {
//     inquirer
//         .prompt({
//             name: "action",
//             type: "list",
//             message: "What would you like to do?",
//             choices: [
//                 "VIEW all EMPLOYEES",
//                 "VIEW all ROLES",
//                 "VIEW all DEPARTMENTS",
//                 "ADD EMPLOYEE",
//                 "ADD DEPARTMENT",
//                 "ADD ROLE",
//                 "UPDATE EMPLOYEE ROLE",
//                 "exit"
//             ]
//         })
//         .then(function (answer) {
//             switch (answer.action) {
//                 case "VIEW all EMPLOYEES":
//                     employeeSearch();
//                     break;

//                 case "VIEW all ROLES":
//                     break;

//                 case "VIEW all DEPARTMENTS":
//                     break;

//                 case "ADD EMPLOYEE":
//                     break;

//                 case "ADD ROLE":
//                     break;

//                 case "ADD DEPARTMENT":
//                     break;

//                 case "UPDATE EMPLOYEE":
//                     break;
                    
//                 case "exit":
//                     connection.end();
//                     break;
//             }
//         });
// }

// function employeeSearch() {  
//     connection.query(query, function(err, res) {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].first_name, res[i].last_name);
//     }
//     runSearch();
//   });
// }