const { name } = require('ejs')
const express = require('express')
const app = express()
const fs = require('fs/promises')

const apiRouter = require('./api/api.router');

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))



app.get('/', async (req, res) => {
    const category = req.query.category;
    const data = await fs.readFile('expenses.json', 'utf8')
    let expenses = JSON.parse(data)

    if (category) {
        expenses = expenses.filter(x =>
            x.category.includes(category)
        );
    }
    res.render('pages/home.ejs', { expenses })

})
app.get('/create', (req, res) => {
    res.render('pages/create.ejs')
})
app.get('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id)
    const data = await fs.readFile('expenses.json', 'utf8')
    const expenses = JSON.parse(data)
    const expense = expenses.find(u => u.id === id)
    res.render('pages/details.ejs', { expense })
})
app.get('/expenses/:id/details', async (req, res) => {
    const id = Number(req.params.id)
    const data = await fs.readFile('expenses.json', 'utf8')
    const expenses = JSON.parse(data)
    const expense = expenses.find(u => u.id === id)
    res.render('pages/update.ejs', { expense })
})
app.use('/api', apiRouter);


app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})