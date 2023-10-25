const Expense = require('./models/Expense');
const express = require('express');
const expenseRouter = express.Router();


//GET ALL EXPENSES
expenseRouter.get('', async (req,res,next) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json({expenses: expenses[0]});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//CREATE A NEW EXPENSE AND ADD IT TO THE DATABASE
expenseRouter.post('', async (req,res,next) => {
    try {
        let {title, amount, budgetId} = await req.body;
        let expense = new Expense(title,amount,budgetId);
        await expense.save();
        res.status(200).json({message: "expense created"});
    }
    catch (error) {
        console.log(error);
        next(error);
    }
    
})

//GET A SPECIFIC EXPENSE BY ID
expenseRouter.get('/:id', async (req,res,next) => {
    try {
        let id = req.params.id;
        let expense = await Expense.findById(id);
        res.status(200).json({expense: expense[0]});
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

//UPDATE AN EXPENSE
expenseRouter.put('/:id', async (req,res,next) => {
    try {
        let id = req.params.id;
        let {title, amount} = req.body;
        let expense = await Expense.update(id,title,amount);
        res.status(200).json({message: "expense updated", expense: expense[0]});
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

//DELETE AN EXPENSE
expenseRouter.delete('/:id', async (req,res,next) => {
    try {
        let id = req.params.id;
        await Expense.delete(id);
        res.status(200).json({message: "expense deleted"});
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = expenseRouter;