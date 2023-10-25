const express = require('express');
const bodyparser = require('body-parser');
const envelopeRouter = require('./envelopes');
const expenseRouter = require('./expenses');
const app = express();
const PORT = process.env.PORT || 5500;

// Middleware pour traiter les données JSON dans le corps des requêtes
app.use(bodyparser.json());

// Définition des routes avec les routeurs
app.use('/expenses', expenseRouter);
app.use('/envelopes', envelopeRouter);

app.listen(PORT, () => {
    console.log(`You are listening on port ${PORT}`);
});

module.exports = app;