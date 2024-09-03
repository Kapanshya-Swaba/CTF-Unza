'use strict;'

const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const dotenv = require('dotenv');
require('dotenv').config();

SERVER_PORT = 3000;
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createConnection({
    host: process.env.DB_Host,
    user: process.env.DB_USER,
    password: process.env.DB_password,
    database: process.env.DB_Name,
  });

  db.connect((err) =>{
    if(err){
        console.error('Error connecting to the database:');
        console.error(`Error code: ${err.code}`);
        console.error(`Error message: ${err.message}`);
        console.error(`Error stack: ${err.stack}`);
        process.exit(1); // Exit the process with a failure code
      throw err;
      console.log(err)

    }else {
      console.log("Connected to database");
    }
  });





// app.post('/' , function(req,res) {
//     let num1 = Number(req.body.number1);
//     let num2 = Number(req.body.number2);

//     let result = num1 + num2;
//     res.send("The result of the calculation is: " + result);
// console.log(req.body);
    

// })

// =======> Checking for login credentials <======= ///

app.post('/process-form', (req, res) => {
  // Access form data from req.body
  const username = req.body.email;
  const password = req.body.password;

  // Query the database to check credentials
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db2.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 1) {
      // Successful login
      res.redirect('/index.html');
    } else {
      // Invalid credentials
      res.status(401).send('Invalid username or password');
    }
  });
});

app.get("/submit", function(res){
        res.sendFile(__dirname + 'Pages/submit.html');
       
});

app.get("/About", function(){

});
app.listen( SERVER_PORT , (err) => {
  if(err){
    console.log("Something went wrong", err)
    return;
  }
    console.log("Server is running on ${SERVER_PORT}");
});

