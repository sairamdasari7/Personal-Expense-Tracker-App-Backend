const db = require('../config/db');

const getAllTransactions = (callback) => {
    db.all('SELECT * FROM transactions', [], (err, rows) => {
        callback(err, rows);
    });
};

const getTransactionById = (id, callback) => {
    db.get('SELECT * FROM transactions WHERE id = ?', [id], (err, row) => {
        callback(err, row);
    });
};

const createTransaction = (transaction, callback) => {
    const { type, category, amount, date, description } = transaction;
    const insert = 'INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)';
    db.run(insert, [type, category, amount, date, description], function (err) {
        callback(err, { id: this.lastID });
    });
};

const updateTransaction = (id, transaction, callback) => {
    const { type, category, amount, date, description } = transaction;
    const update = 'UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?';
    db.run(update, [type, category, amount, date, description, id], function (err) {
        callback(err);
    });
};

const deleteTransaction = (id, callback) => {
    db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
        callback(err);
    });
};

const getSummary = (callback) => {
    const query = `
        SELECT 
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpenses,
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS balance
        FROM transactions
    `;
    db.get(query, [], (err, row) => {
        callback(err, row);
    });
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary
};
