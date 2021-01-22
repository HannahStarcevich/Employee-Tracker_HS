var mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start()
});

function start() {
    inquirer.prompt({
            name: "start",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager"
            ]
        })
        .then(function (answer) {
            switch (answer.start) {
                case "View All Employees":
                    viewEmployees();
                    break;

                case "View All Departments":
                    viewAllDept();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;

                case "End":
                    connection.end();
                    break;
            }
        })
}


function viewEmployees() {
    console.log("fetching employee data...")
    var query = "SELECT employees.id, first_name, last_name, department.name AS department, role.title AS role, salary, manager_id FROM employees JOIN role ON employees.role_id = role.id JOIN department ON role.department_id = department.id"

    connection.query(query, function (err, res) {
        if (err) {
            throw err
        } else {
            console.table(res)
            start()
        }
    })
}

function viewAllDept() {

    console.log("fetching department data...")

    connection.query("SELECT * FROM department", {

    }, function (err, res) {
        if (err) {
            throw err
        } else {
            console.table(res)
        }
        start();
    })
}


function viewAllRoles() {

    console.log("fetching role data...")

    connection.query("SELECT * FROM role", {

    }, function (err, res) {
        if (err) {
            throw err
        } else {
            console.table(res)
        }
        start();
    })
}

function addEmployee() {

    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([{
                    name: "firstName",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "role",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].title);
                        }
                        return choiceArray;
                    }
                }
            ]).then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].title === answer.choice) {
                        chosenItem = results[i];
                    }
                }

            })
    })
}




// function removeEmployee() {}

// function updateEmployeeRole() {}

// function updateEmployeeManager() {}




// value is the id 