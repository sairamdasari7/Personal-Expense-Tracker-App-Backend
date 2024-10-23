const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Categories table created.');
                db.get('SELECT COUNT(*) as count FROM categories', [], (err, row) => {
                    if (row.count === 0) {
                        const insert = 'INSERT INTO categories (name, type) VALUES (?, ?)';
                        db.run(insert, ['Salary', 'income']);
                        db.run(insert, ['Food', 'expense']);
                        db.run(insert, ['Transport', 'expense']);
                        db.run(insert, ['Gifts', 'income']);
                        console.log('Dummy categories added.');
                    }
                });
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            description TEXT
        )`, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Transactions table created.');
                db.get('SELECT COUNT(*) as count FROM transactions', [], (err, row) => {
                    if (row.count === 0) {
                        const insert = 'INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)';
                        db.run(insert, ['income', 'Salary', 5000, '2024-10-01', 'Monthly salary']);
                        db.run(insert, ['expense', 'Food', 200, '2024-10-02', 'Groceries']);
                        db.run(insert, ['expense', 'Transport', 50, '2024-10-03', 'Bus fare']);
                        db.run(insert, ['income', 'Gifts', 1000, '2024-10-04', 'Gift from grandparents']);
                        db.run(insert, ['expense', 'Food', 100, '2024-10-05', 'Dining out']);
                        console.log('Dummy transactions added.');
                    }
                });
            }
        });
    }
});

module.exports = db;
