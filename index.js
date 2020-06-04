// global var
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

// questions
function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the project"
      },
      {
        type: "input",
        name: "description",
        message: "What is the description of the project"
      },
      {
        type: "input",
        name: "installation",
        message: "How do I install this project?"
      },
      {
        type: "input",
        name: "usage",
        message: "What is the usage?"
      },
      {
        type: "input",
        name: "license",
        message: "what is the license"
      },
      {
        type: "input",
        name: "contribution",
        message: "enter a github username"
      },
      {
        type: "input",
        name: "test",
        message: "examples of how to run a test"
      },
      {
        type: "input",
        name: "Username",
        message: "What is your github Username?"
      },
      {
        type: "input",
        name: "githubemail",
        message: "github email"
      }
    ]);
  }


// generate answers
  function generateHTML(answers) {
    const gitResponse = axios.get(`https://api.github.com/users/${answers.Username}`);
    const gitProfileImage = (`https://avatars.githubusercontent.com/${answers.Username}`);
    return `
    
${answers.title}
    \n  
    ${answers.description}
\n ----------------------------------------------------------------------------
    
    \n* [Installation] 
    \n* [Instructions] 
    \n* [License] 
    \n* [Contributors] 
    \n* [Tests] 
    \n* [bugs] 

\n ----------------------------------------------------------------------------
\n 
## Installation
${answers.installation}
\n
## Instructions
${answers.usage}
\n
## License 
contact ${answers.license} - for lincensing info.
\n
## Contributors
${answers.contribution}
\n
## Tests
${answers.test}
\n
## Bugs
Please report any bugs to ${answers.githubemail}

\n ${gitProfileImage}
`;}
  


promptUser()
  .then(function(answers) {
    const md = generateHTML(answers);

    return writeFileAsync("README.md", md);
  })
  .then(function() {
    console.log("Successfully wrote to README.MD");
  })
  .catch(function(err) {
    console.log(err);
  });

