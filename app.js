const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const inquirer = require("inquirer");
const fs = require("fs");

// Async functino to start the application
async function start(){
    console.log("Please enter your team information");

    let teamHTML = "";

    // Determine how many members in the team
    let teamSize;
    await inquirer.prompt(
        {
            type: "number",
            message: "How many memners are in your team?",
            name: "noOfTeamMem"
        }
    )
    .then((data) => {
        // Number of members starts from 1
        teamSize = data.noOfTeamMem + 1;
    });
    
    for(i = 1; i < teamSize; i++){
        let name;
        let id;
        let title;
        let email;

        // Prompts user to enter the members' information 
        await inquirer.prompt([ 
            {
                type: "input",
                message: `What is employee (${i})'s name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s Email?`,
                name: "email"
            },
            {
                type: "list",
                message: `what the employee (${i})'s title?`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ])
        .then((data) => {
            name = data.name;
            id = data.id;
            title = data.title;
            email = data.email;
        });

        // Using switch to switch data based on the employee title
        switch (title){
            case "Manager":

                // Manager's Office Number
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the Manager's Office Number?",
                        name: "officeNo"
                    }
                ])
                .then((data) => {

                    const manager = new Manager(name, id, email, data.officeNo);
                    teamMember = fs.readFileSync("templates/manager.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

            // Intern's school
            case "Intern":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What school does the Intern attend?",
                        name: "school"
                    }
                ])
                .then((data) => {
                    const intern = new Intern(name, id, email, data.school);
                    teamMember = fs.readFileSync("templates/intern.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

            case "Engineer":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the Engineer's GitHub?",
                        name: "github"
                    }
                ])
                .then((data) => {
                    const engineer = new Engineer(name, id, email, data.github);
                    teamMember = fs.readFileSync("templates/engineer.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;
        }

    } 

    const mainHTML = fs.readFileSync("templates/main.html");
    teamHTML = eval('`'+ mainHTML +'`');
    fs.writeFile("output/team.html", teamHTML, function(err) {

        if (err) {
          return console.log(err);
        }
      
        console.log("Your HTML was successfully generated!");
      
      });
}

start();