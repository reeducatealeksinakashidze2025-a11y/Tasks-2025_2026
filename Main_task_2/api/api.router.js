const express = require('express');
const router = express.Router();
const fs = require('fs/promises')


// router.get('/expenses', async (req, res) => {
//     const data = await fs.readFile('expenses.json', 'utf8')
//     const expenses = JSON.parse(data)
//     res.json(expenses);
// });


router.post('/expenses', async (req, res) => {
    const { title, category, amount } = req.body;
    const data = await fs.readFile('expenses.json', 'utf8')
    const expenses = JSON.parse(data)
    const lastId = expenses[expenses.length - 1]?.id || 0;

    const newExpense = {
        id: lastId + 1,
        title,
        category,
        amount,
        data: new Date()
    };
    expenses.push(newExpense);
    await fs.writeFile('expenses.json', JSON.stringify(expenses))

    res.redirect('/');
});

router.get('/expenses/:id/delete', async (req, res) => {
    const id = Number(req.params.id);
    const data = await fs.readFile('expenses.json', 'utf8')
    const expenses = JSON.parse(data)
    const index = expenses.findIndex(u => u.id === id);
    expenses.splice(index, 1);
    await fs.writeFile('expenses.json', JSON.stringify(expenses))
    res.redirect('/');
});

router.post('/expenses/:id/update', async (req, res) => {
    const id = Number(req.params.id);
    const data = await fs.readFile('expenses.json', 'utf8')
    const expenses = JSON.parse(data)
    const index = expenses.findIndex(u => u.id === id);

    const { title, category, amount } = req.body;
    const updateReq = {};

    if (title) updateReq.title = title;
    if (category) updateReq.category = category;
        if (amount) updateReq.amount = amount;
        updateReq.data= new Date();


    expenses[index] = {
        ...expenses[index],
        ...updateReq
    };
    await fs.writeFile('expenses.json', JSON.stringify(expenses))

    res.redirect('/');
});

module.exports = router;
