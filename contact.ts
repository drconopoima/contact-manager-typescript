import './polyfills'
import { Command } from 'commander'
import * as inquirer from 'inquirer'
import chalk from 'chalk'
import * as actions from './logic';
import { getIdQuestions, questions, updateContactQuestions } from './questions'

const command = new Command();

command
    .version('1.0.0')
    .description('Contact Management System')

command
    .command('addContact')
    .alias('a')
    .description('Add a contact')
    .action(() => {
        console.log(chalk.yellow('=========*** Contact Management System ***=========='))
        inquirer.prompt(questions).then((answers) => actions.addContact(answers))
    })

command
    .command('getContact')
    .alias('g')
    .description('Get Contact')
    .action(() => {
        console.log(chalk.yellow('=========*** Contact Management System ***=========='))
        inquirer.prompt(getIdQuestions).then((answers: any) => actions.getContact(answers.id))
        
    })
command
    .command('updateContact')
    .alias('u')
    .description('Update Contact')
    .action(() => {
        console.log(chalk.yellow('=========*** Contact Management System ***=========='))
        inquirer.prompt(updateContactQuestions).then((answers) => actions.updateContact(answers))
    })
command
    .command('deleteContact')
    .alias('d')
    .description('Delete a contact')
    .action(() => {
        console.log(chalk.yellow('=========*** Contact Management System ***=========='))
        inquirer.prompt(getIdQuestions).then((answers: any) => actions.deleteContact(answers.id))
    })
command
    .command('getContactList')
    .alias('l')
    .description('Get Contact List')
    .action(() => {
        console.log(chalk.yellow('=========*** Contact Management System ***=========='))
        actions.getContactList()
    })

if(!process.argv.slice(2).length/* || !/[arudl]/.test(process.argv.slice(2))*/) {
    command.outputHelp()
    process.exit()
}
command.parse(process.argv)
