const express = require("express");
const path = require('path');
const mysql = require("mysql");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));


app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})


app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5200, () => {
    console.log("Server started on Port 5200");
})