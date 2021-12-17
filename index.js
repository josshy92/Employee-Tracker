const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');



const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);



const stateAction = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ["View all roles", "View all employees", "View all departments", "Add Employee", "Update Employee Role", "Add Role", "Add Department"]
        }
    ]).then(response => {
        switch (response.action) {
            case "View all roles":
                rolesInfo()
                break;
            case "View all employees":
                employeesInfo()
                break;
            case "View all departments":
                departmentInfo()
                break;
            case "Add Employee":
                addEmployee()
                break;
            case "Update Employee Role":
                updateEmployeeRole()
                break;
            case "Add Role":
                addRole()
                break;
            case "Add Department":
                addDepartment()
                break;
        }
    })
}

const employeesInfo = () => {
    db.query("SELECT * FROM employee_info", function (err, result, fields) {
        console.table(result);
        stateAction();
    });
}
const rolesInfo = () => {
    db.query("SELECT * FROM employee_role", function (err, result, fields) {
        console.table(result);
        stateAction();
    });
}
const departmentInfo = () => {
    db.query("SELECT * FROM department", function (err, result, fields) {
        console.table(result);
        stateAction();
    });
}
// const addEmployee = () => {

//         // db.query("INSERT INTO employee_info", function (err, result, fields) {
//         //     console.table(result);
//         //     stateAction();
//         // });
// }

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is their first name?',
            name: 'firstName',
        },

        {
            type: 'input',
            message: 'What is their last name?',
            name: 'lastName',
        },
        {
            type: 'input',
            message: "What is the employee's role ID number?",
            name: 'employeeRole',
            validate: (answer) => {
                if (isNaN(answer)) {
                    return `You did not enter a valid number`
                } else if (answer === "") {
                    return `Please enter your role id number`
                }
                return true;
            }
        }
    ])
        .then((response) => {
            console.log(response)
            // if connection is successful
            db.query('INSERT INTO employee_info SET ?;', {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: response.employeeRole
            });
            stateAction();
        })
}



stateAction();

function updateEmployee() {
    inquirer
        .prompt([
            {
                name: 'roleId',
                type: 'input',
                message: 'What is the ID number for the employee who is being updated?'
            },
            {
                name: 'newRole',
                type: 'input',
                message: 'What is the new rol?'
            }
        ]).then(res => {
            db.query('UPDATE employee_role SET ? WHERE ?;',
                [
                    {
                        title: res.newRole
                    },
                    {
                        id: res.roleId
                    }
                ]
            )
        })
}