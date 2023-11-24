# PersonalBudget
PersonalBudget is a budget management application that allows users to efficiently organize their finances by creating envelopes and tracking expenses.

# Introduction
Managing personal finances can be a challenging task. PersonalBudget aims to simplify this process by providing a user-friendly interface for creating envelopes and tracking expenses. Envelopes act as virtual containers for budget categories, helping users allocate funds and monitor their spending.

# Features
Envelopes: Create personalized envelopes for different budget categories such as groceries, entertainment, and more.

Expenses: Log and categorize your expenses under respective envelopes to keep a detailed record.

Dashboard: Get an overview of your budget with a comprehensive dashboard that displays spending patterns and remaining balances.

# Tech Stack
The project is built using the following technologies:

- Backend:
Node.js
Express
MySQL

- Frontend:
React

# Installation
To run PersonalBudget locally, follow these steps:

- Clone the repository:

git clone https://github.com/MehdiGrimault/PersonalBudget.git

cd PersonalBudget

- Create .env in server folder and copy the following lines :
NODE_ENV=development

PORT=5500

DB_HOST=localhost

DB_USER=root

DB_NAME=budget

DB_PASSWORD=

- Install dependencies:

cd server

npm install

cd ../client

npm install

- Set up the database:

Create a MySQL database and configure the connection in the backend/config/database.js file

bash
Copy code
# Start the server
npm start

Access the application at http://localhost:4000 in your web browser.

# Usage
Open the application in your web browser.

Create envelopes for different budget categories.

Log your expenses under the respective envelopes.

Monitor your spending patterns and remaining balances on the dashboard.
