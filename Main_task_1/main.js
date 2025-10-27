#!/usr/bin/env node
import { Command } from 'commander'
import { readFile, writeFile } from './utils.js'

const program = new Command()

program
    .name('expense-cli')
    .description('expense cli tool"')
    .version('1.0.0')
program
    .command('getById')
    .description('get item by id')
    .argument('<id>', 'item id')
    .action(async (id) => {
        const expenses = await readFile('expense.json', 'utf8')
        const expense = expenses.find(o => o.id === Number(id))
        if (!expense) {
            console.log("The item could not be found")
            return
        }
        console.log(expense)
    })

program
    .command('show')
    .description('show list to expense')
    .option('--asc', 'sort ascending by price')
    .option('--desc', 'sort descending by price')
    .option('-c, --category <category>', 'find item by category')
    .action(async (opts) => {
        let expenses = await readFile('expense.json', 'utf8')
        if (opts.asc)
            expenses.sort((a, b) => a.price - b.price)
        else if (opts.desc)
            expenses.sort((a, b) => b.price - a.price)


        if (opts.category) {
            expenses = expenses.filter(o => o.category === opts.category)
        }

        console.log(expenses)
    })
program
    .command('search')
    .description('search on expense by date')
    .argument('<date>', 'search by create date')
    .action(async (date) => {
        let expenses = await readFile('expense.json', 'utf8')

        expenses = expenses.filter(o => {
            const createdDate = o.createdAt.split('T')[0];
            return createdDate === date;
        })
        console.log(expenses)

    })

program
    .command('add')
    .description('add item to expenses')
    .arguments('<category> <price>', 'post object example: add eat 25')
    .action(async (category, price) => {
        if (price < 10) {
            console.log('The amount must be more than 10')
            return
        }
        const expenses = await readFile('expense.json', 'utf8')
        const lastId = expenses[expenses.length - 1]?.id || 0
        const expense = {
            id: lastId + 1,
            category,
            price: Number(price),
            lastModifaidAt: null,
            createdAt: new Date()
        }
        expenses.push(expense)
        await writeFile('expense.json', expenses)

    })
program
    .command('update')
    .description('update existing item')
    .argument('<id>', 'unique movie id')
    .option('-c, --category, <category>', 'name property')
    .option('-p, --price, <price>', 'name property')
    .action(async (id, opts) => {
        const expenses = await readFile('expense.json', 'utf8')
        const indexOfItem = expenses.findIndex(o => o.id === Number(id))
        if (indexOfItem === -1) {
            console.log('The item could not be found')
            return
        }
        const updateReq = {}
        if (opts.category) {
            updateReq['category'] = opts.category
        }

        if (opts.price) {
            updateReq['price'] = Number(opts.price)
        }

        updateReq['lastModifaidAt'] = new Date()

        expenses[indexOfItem] = {
            ...expenses[indexOfItem],
            ...updateReq
        }

        await writeFile('expense.json', expenses)
        console.log("Updated successfully", expenses[indexOfItem])
    })



program
    .command('delete')
    .description('delete item from expenses')
    .argument('<id>')
    .action(async (id) => {
        const expenses = await readFile('expense.json', 'utf8')

        const indexOfItem = expenses.findIndex(o => o.id === Number(id))
        if (indexOfItem === -1) {
            console.log('The item could not be deleted')
            return
        }
        expenses.splice(indexOfItem, 1)
        await writeFile('expense.json', expenses)
        console.log('delete successfully')

    })
program.parse()