const transactionModel = require('../models/transactionModel');

const getTransactions = (req, res) => {
    transactionModel.getAllTransactions((err, transactions) => {
        if (err) return res.status(500).json({ error: err.message });
        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json(transactions);
    });
};

const getTransaction = (req, res) => {
    const id = req.params.id;
    transactionModel.getTransactionById(id, (err, transaction) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(transaction);
    });
};

const createTransaction = (req, res) => {
    const transaction = req.body;
    transactionModel.createTransaction(transaction, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(result);
    });
};

const updateTransaction = (req, res) => {
    const id = req.params.id;
    const transaction = req.body;
    transactionModel.updateTransaction(id, transaction, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
};

const deleteTransaction = (req, res) => {
    const id = req.params.id;
    transactionModel.deleteTransaction(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
};

const getSummary = (req, res) => {
    transactionModel.getSummary((err, summary) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(summary);
    });
};

module.exports = {
    getTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary
};
