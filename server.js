var mysql = require("mysql");
const inquirer = require("inquirer");
const {
    promisify
} = require("util")

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
    connection.queryPromise = promisify(connection.query)
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
                "Update Employee Manager",
                "End"
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

async function addEmployee() {
    var allEmployees = await connection.queryPromise("SELECT * FROM employees")

    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([{
                    name: "first_name",
                    type: "input",
                    message: "What is the employee's first name?",
                    default: "paul"
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What is the employee's last name?",
                    default: "simon"
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is the role of this employee?",
                    choices: res.map((role) => ({
                        name: role.title,
                        value: role.id
                    }))
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Who is the manager of this employee?",
                    choices: allEmployees.map((manager) => ({
                        name: `${manager.first_name} ${manager.last_name}`,
                        value: manager.id
                    }))
                }
            ]).then((designation) => {
                connection.query("INSERT INTO employees SET ?", {
                    first_name: designation.first_name,
                    last_name: designation.last_name,
                    role_id: designation.role,
                    manager_id: designation.manager
                })
                start();
            })
    })
}

async function updateEmployeeRole() {
    var allEmployees = await connection.queryPromise("SELECT * FROM employees")

    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([

                {
                    name: "selectEmployee",
                    type: "list",
                    message: "Who's role do you want to update?",
                    choices: allEmployees.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }))
                }, {
                    name: "role",
                    type: "list",
                    message: "What is the role of this employee?",
                    choices: res.map((role) => ({
                        name: role.title,
                        value: role.id
                    }))
                },
            ]).then((designation) => {
                connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [
                    designation.role, designation.selectEmployee
                ])
                start();
            })
    })
}

function updateEmployeeManager() {

    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([

                {
                    name: "selectEmployee",
                    type: "list",
                    message: "Who's manager do you want to update?",
                    choices: res.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }))
                }, {
                    name: "manager",
                    type: "list",
                    message: "Who is the manager of this employee?",
                    choices: res.map((manager) => ({
                        name: `${manager.first_name} ${manager.last_name}`,
                        value: manager.id
                    }))
                },
            ]).then((designation) => {
                connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [
                    designation.role, designation.selectEmployee
                ])
                start();
            })
    })
}



// function removeEmployee() {}