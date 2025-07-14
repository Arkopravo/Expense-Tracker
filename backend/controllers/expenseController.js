const Expense = require('../models/Expense');
const xlsx = require('xlsx');

exports.addExpense = async (req, res) => {
    
    const userId = req.user._id;

    try {
        const { icon, category, amount, date } = req.body;

        // validate income data
        if (!category || !amount) {
            return res.status(400).json({ message: "Source and amount are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: date ? new Date(date) : new Date() // default to current date if not provided
        });

        await newExpense.save();

        res.status(201).json({
            message: "Expense added successfully",
            expense: newExpense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Error adding income", error: error.message 
        });
    }
}

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching expense", error: error.message
        });
    }
}


exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findOneAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Error deleting expense", error: error.message 
        });
    }
}

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});

        // prepare data for Excel
        const data = expense.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'expense');
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error downloading expense report", error: error.message
        });
    }
}