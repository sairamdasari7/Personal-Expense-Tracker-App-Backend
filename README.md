# Personal Expense Tracker API

## API Endpoints

### Transactions

- **GET /transactions**: Retrieve all transactions
- **GET /transactions/:id**: Retrieve a transaction by ID
- **POST /transactions**: Add a new transaction
  - **Request Body**:
    ```json
    {
      "type": "income | expense",
      "category": "string",
      "amount": "number",
      "date": "YYYY-MM-DD",
      "description": "string"
    }
    ```
- **PUT /transactions/:id**: Update a transaction by ID
  - **Request Body**:
    Same as POST request body.
- **DELETE /transactions/:id**: Delete a transaction by ID
- **GET /transactions/summary**: Retrieve a summary of transactions (total income, total expenses, balance)
