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
                "View All Employees by Department",
                "View All Employees by Manager",
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

                case "View All Employees by Department":
                    viewEmployeesDept();
                    break;

                case "View All Employees by Manager":
                    viewEmployeesManager();
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

                    // case "exit":
                    //     connection.end();
                    //     break;
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

function viewEmployeesDept() {
    inquirer.prompt({
        name: "employeeDept",
        type: "list",
        message: "Select a department",
        choices: [
            "HR",
            "Sales",
            "IT",
            "Operations",
        ]
    }).then(function (answer) {
        console.log("fetching employee department data...")
        var query = "SELECT employees.id, first_name, last_name, department.name AS department FROM employees JOIN role ON employees.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?"

        connection.query(query, {
            employeeDept: answer.employeeDept
        }, function (err, res) {
            if (err) {
                throw err
            } else {
                for (var i = 0; i < res.length; i++) {
                    console.table(res)
                }
                start();
            }
        });
    })

}

// function viewEmployeesManager() {}

// function addEmployee() {}

// function removeEmployee() {}

// function updateEmployeeRole() {}

// function updateEmployeeManager() {}




// value is the id 