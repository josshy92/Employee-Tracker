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
            choices: ["View all roles","View all employees", "View all departments", "Add Employee", "Update Employee", "Add Role", "Add Department"]
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
            case "no other employees":
                let teamData = renderHTML(team)
                fs.writeFile('./src/index.html', teamData, (err) =>
                    err ? console.log(err) : console.log('Successfully created Team Profile!')
                );
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



stateAction();