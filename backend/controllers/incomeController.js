const Income = require('../models/Income');
const xlsx = require('xlsx');

exports.addIncome = async (req, res) => {
    
    const userId = req.user._id;

    try {
        const { icon, source, amount, date } = req.body;

        // validate income data
        if (!source || !amount) {
            return res.status(400).json({ message: "Source and amount are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: date ? new Date(date) : new Date() // default to current date if not provided
        });

        await newIncome.save();

        res.status(201).json({
            message: "Income added successfully",
            income: newIncome
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Error adding income", error: error.message 
        });
    }
}

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({userId}).sort({date: -1});
        res.json(income);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching income", error: error.message
        });
    }
}


exports.deleteIncome = async (req, res) => {
    try {
        await Income.findOneAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Error deleting income", error: error.message 
        });
    }
}

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({userId}).sort({date: -1});

        // prepare data for Excel
        const data = income.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error downloading income report", error: error.message
        });
    }
}