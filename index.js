require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { connectMongoDb } = require('./db/db');
const fillDb = require('./db/fillDb');

const { PORT, MONGO_DB_URI } = process.env;

connectMongoDb(MONGO_DB_URI);

setInterval(fillDb, 30000);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('*', (req, res) => {
    res.json({ message: 'Hello from crawler' });
});

app.listen(PORT, () => {
    console.log(`Server up and running on PORT: ${PORT}`);
})