//make variables for apps
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);


//start asking questions
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

// start specific scenarios
const employeesInfo = () => {
    db.query("SELECT  employee_info.id, employee_info.first_name, employee_info.last_name, employee_role.title, employee_role.salary, department.department_name, employee_info.manager_id FROM employee_info LEFT JOIN employee_role ON employee_info.role_id=employee_role.id LEFT JOIN department ON employee_role.department_id=department.id", function (err, result, fields) {
        console.table(result);
        stateAction();
    });
}
const rolesInfo = () => {
    db.query("SELECT  employee_role.id, employee_role.title, department.department_name, employee_role.salary FROM employee_role LEFT JOIN department ON employee_role.department_id=department.id", function (err, result, fields) {
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
            },

        },
        {
            type: 'input',
            message: 'Who is their manager? *Please enter ID number of manager, if none please press Enter*',
            name: 'manager',
        },
    ])
        .then((response) => {
            console.log(response)
            // if connection is successful
            db.query('INSERT INTO employee_info SET ?;', {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: response.employeeRole,
                manager_id: response.manager
            });
            stateAction();
        })
}




function updateEmployeeRole() {
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
                message: 'What is the name of the new roll this employee will belong to?',
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
            ); stateAction();
        })
}



function addRole() {
    inquirer
        .prompt([
            {
                name: 'roleTitle',
                type: 'input',
                message: 'What is the title for the new role?'
            },
            {
                name: 'newSalary',
                type: 'input',
                message: 'What is the salary for this new role',
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return `You did not enter a valid number`
                    } else if (answer === "") {
                        return `Please enter your role id number`
                    }
                    return true;
                }
            },
            {
                name: 'deptId',
                type: 'input',
                message: 'What department ID number will this role belong to?',
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return `You did not enter a valid number`
                    } else if (answer === "") {
                        return `Please enter department id number`
                    }
                    return true;
                }
            }
        ]).then((response) => {
            console.log(response)
            // if connection is successful
            db.query('INSERT INTO employee_role SET ?;', {
                title: response.roleTitle,
                salary: response.newSalary,
                department_id: response.deptId
            });
            stateAction();
        })
}


function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'departmentName',
                type: 'input',
                message: 'What is the name of the new department?'
            }
        ]).then((response) => {
            console.log(response)
            // if connection is successful
            db.query('INSERT INTO department SET ?;', {
                department_name: response.departmentName
            });
            stateAction();
        })
}

// invoke function
stateAction();
