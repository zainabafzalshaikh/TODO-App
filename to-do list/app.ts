#! /usr/bin/node env
import inquirer from "inquirer";
import chalk from "chalk";

let todos_list: string[] = [];

let condition = true;

while (condition) {
  const user_choice = await inquirer.prompt({
    name: "asking_users_choice",
    type: "list",
    message: chalk.bgYellow("What do you want to do?"),
    choices: ["Add Task","View Task","Update Task","Delete Task"],
  });

  if (user_choice.asking_users_choice === "Add Task") {
    let user_add = await inquirer.prompt({
      name: "ask_to_add",
      type: "input",
      message:chalk.green ("What Do You Want TO Add in Checklist?"),
      validate: function(value) { 
        if (value.trim() === "") {
            return "Please enter a valid task."; 
        }
        return true;
    }
    });
    if (user_add.ask_to_add.trim() !== "")
     {
        todos_list.push(user_add.ask_to_add);
        console.log(chalk.bgBlue("Task added successfully."));
    } else {
        console.log(chalk.bgRed("Invalid input. Task not added."));
    }

  } 
  if (user_choice.asking_users_choice === "View Task") {
    console.log(chalk.greenBright.bgGrey("Your Added Tasks Are:-"));
    console.log(chalk.bgBlue(todos_list));
  } 
  if (user_choice.asking_users_choice === "Update Task") {

    let user_update_items = await inquirer.prompt({
      name: "updateItem",
      type: "list",
      message: chalk.bgRed("What Task Do You Want To Update?"),
      choices: todos_list,
    });
    
    let user_updated_Value = await inquirer.prompt({
      name: "updatedValue",
      type: "input",
      message: chalk.bgYellow("Enter the updated value for '" + user_update_items.updateItem + "':"), 
    });

    const index = todos_list.indexOf(user_update_items.updateItem);

    if (index !== -1) {
      todos_list[index] = user_updated_Value.updatedValue; 
      console.log(chalk.green("Todo item updated successfully."));
      console.log(chalk.bgRed(todos_list));
    } 
  }

  if (user_choice.asking_users_choice === "Delete Task") {
    let user_delete = await inquirer.prompt({
      name: "index",
      type: "list",
      message:chalk.green( "Select the item you want to delete:"),
      choices: todos_list,
    });

    const indexToRemove = todos_list.indexOf(user_delete.index);

    if (indexToRemove !== -1)
      todos_list.splice(indexToRemove, 1);
      console.log(chalk.bgBlue("${user_delete.index} has been deleted."));
    }
    console.log(chalk.green("Updated To Do List:", todos_list));
  }
  let exit = await inquirer.prompt({
      name: "confirmationMessage",
      type: "confirm",
      message: chalk.bgYellow("Do You Want To Continue Task Management App?"),
      default: "yes",
    })
    condition = exit.confirmationMessage;

console.log(chalk.bgBlue("Yours checklist As:", todos_list));
