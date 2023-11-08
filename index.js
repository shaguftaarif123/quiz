#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const apilink = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apilink);
let startQuiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "What is Your Name?"
    });
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.blue("Correct"));
        }
        else {
            console.log(`correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.green.bold(name.fname)}, your score is 
      ${chalk.red.bold(score)} out of ${chalk.red.bold('5')}`);
};
startQuiz();
