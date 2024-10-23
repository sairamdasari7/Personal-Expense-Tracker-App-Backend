const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());  


app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to the Personal Expense Tracker API!',
        description: 'This API allows you to manage your personal financial records. Use the following endpoints to interact with the API:',
        endpoints: {
            'GET /api/transactions': 'Retrieve all transactions',
            'GET /api/transactions/:id': 'Retrieve a transaction by ID',
            'POST /api/transactions': 'Add a new transaction',
            'PUT /api/transactions/:id': 'Update a transaction by ID',
            'DELETE /api/transactions/:id': 'Delete a transaction by ID',
            'GET /api/summary': 'Retrieve summary of transactions'
        },
        url: 'http://localhost:3000/api/transactions'
    });
});

app.use('/api', transactionRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
