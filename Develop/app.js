const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMembers = [];
const teamNameArr = [];
const idArr = [];

const teamNames = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "teamname",
            message: "What is your team's name?",
            validate: answer => {
                if (answer != "") {
                    return true
                }
                return "Please enter a team name."
            }
        }
    ]).then(answer => {
        const teamName = answer.teamname;
        teamNameArr.push(teamName);
        addManager();
    })
};

const addManager = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Manager Name:",
            validate: answer => {
                if (answer != "") {
                    return true
                }
                return "Please enter a name."
            }
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID:",
            validate: answer => {
                const idChr = answer.match(/^[1-9]\d*$/);
                if (idChr) {
                    if (idArr.includes(answer)) {
                        return "Please enter a unique ID #"
                    }
                    return true
                }
                return "Please enter a number greater than 0."
            }
        },
        {
            type: "input",
            name: "email",
            message: "Email Address:",
            validate: answer => {
                const emailChr = answer.match(/\S+@\S+\.\S+/);
                if (emailChr) {
                    return true
                }
                return "Please enter a valid email address."
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Office Phone Number:",
            validate: answer => {
                const idChr = answer.match(/^[1-9]\d*$/);
                if (idChr) {
                    return true
                }
                return "Please enter a valid phone number."
            }
        }
    ]).then(answer => {
        const manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
        teamMembers.push(manager);
        idArr.push(answer.id);
        addEmployees();
    })
};

const addEmployees = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What kind of employee do you want to add?",
            choices: ["Intern", "Engineer", "None, please build the team profiles."]
        }
    ]).then(answer => {
        switch (answer.role) {
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            default:
                getTeam();
        }
    })
};

const addEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Engineer Name:",
            validate: answer => {
                if (answer != "") {
                    return true
                }
                return "Please enter a name."
            }
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID:",
            validate: answer => {
                const idChr = answer.match(/^[1-9]\d*$/);
                if (idChr) {
                    if (idArr.includes(answer)) {
                        return "Please enter a unique ID #"
                    }
                    return true
                }
                return "Please enter a number greater than 0."
            }
        },
        {
            type: "input",
            name: "email",
            message: "Email Address:",
            validate: answer => {
                const emailChr = answer.match(/\S+@\S+\.\S+/);
                if (emailChr) {
                    return true
                }
                return "Please enter a valid email address."
            }
        },
        {
            type: "input",
            name: "github",
            message: "Github Username:",
            validate: answer => {
                if (answer != "") {
                    return true
                }
                return "Please enter a name."
            }
        }
    ]).then(answer => {
        const engineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
        teamMembers.push(engineer);
        idArr.push(answer.id);
        addEmployees();
    })
};

const addIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Intern Name:",
            validate: answer => {
                if (answer != "") {
                    return true
                }
                return "Please enter a name."
            }
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID:",
            validate: answer => {
                const idChr = answer.match(/^[1-9]\d*$/);
                if (idChr) {
                    if (idArr.includes(answer)) {
                        return "Please enter a unique ID #"
                    }
                    return true
                }
                return "Please enter a number greater than 0."
            }
        },
        {
            type: "input",
            name: "email",
            message: "Email Address:",
            validate: answer => {
                const emailChr = answer.match(/\S+@\S+\.\S+/);
                if (emailChr) {
                    return true
                }
                return "Please enter a valid email address."
            }
        },
        {
            type: "input",
            name: "school",
            message: "School Name:",
            validate: answer => {
                if (answer != "") {
                    return true
                }
                return "Please enter a school name."
            }
        }
    ]).then(answer => {
        const intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        teamMembers.push(intern);
        idArr.push(answer.id);
        addEmployees();
    })
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

const getTeam = async() => {
    fs.writeFile(`./output/${teamNameArr[0]}.html`, render(teamMembers), (err) => {
        if (err) throw err
        console.log("The profiles have been generated.");
    })
};

teamNames();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
