#!/usr/bin/env node
'use strict';

const { Database } = require('sqlite3').verbose();
const db = new Database('companyDB.sqlite', () => console.log('Connected!'));
const employees = require('./employees');

// errorHandler is a function which accepts an error object
const errorHandler = (err) => {
  if (err) { // If there is an error obj, it will be console logged
    console.log(`Msg: ${err}`);
  };
};

// db.run("DROP TABLE IF EXISTS employees");
db.run("CREATE TABLE IF NOT EXISTS employees (id INT, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT, salary INT)");

// const employeeArray = [
//   { id: 1, firstName: 'Anna', lastName: 'Chittom', jobTitle: 'Manager', address: '831 Glastonbury Road' },
//   { id: 2, firstName: 'Eddie', lastName: 'Jackson', jobTitle: 'Janitor', address: '850 Greenland Drive' },
//   { id: 3, firstName: 'Rob', lastName: 'Crandall', jobTitle: 'Cashier', address: '666 Rattlesnake Lane' },
//   { id: 4, firstName: 'Brandon', lastName: 'Green', jobTitle: 'President', address: '123 Langwood Court' },
//   { id: 5, firstName: 'Fred', lastName: 'Smith', jobTitle: 'Vice President', address: '500 Somewhere Lane' },
//   { id: 6, firstName: 'Jeff', lastName: 'Moseley', jobTitle: 'Security', address: '1040 Wynlands Circle' },
//   { id: 7, firstName: 'Joe', lastName: 'Green', jobTitle: 'Comedian', address: '555 Example Street' }
// ];

const employeeArray = employees.employees;
// console.log("array?", employeeArray);

employeeArray.forEach((obj) => {
  db.run(`INSERT INTO employees VALUES (${obj.id}, '${obj.firstName}', '${obj.lastName}', '${obj.jobTitle}', '${obj.address}', ${obj.salary})`);
});

// Write a statement to query the database and console.log() all employee records.
db.all("SELECT * FROM employees", (err, allRows) => {
  errorHandler(err);
  allRows.forEach(obj => {
    console.log(`${obj.id} ${obj.firstName} ${obj.lastName}: ${obj.jobTitle} -- ${obj.address}`);
  });
});

// Write a statement to query the database and console.log() each employees jobTitle.
db.all("SELECT * FROM employees", (err, allRows) => {
  errorHandler(err);
  allRows.forEach(obj => {
    console.log(`${obj.id} ${obj.firstName} ${obj.lastName}: ${obj.jobTitle}`);
  });
});

// Write a statement to query the database and console.log() each employees firstName, lastName and address only.
db.all("SELECT * FROM employees", (err, allRows) => {
  errorHandler(err);
  allRows.forEach(obj => {
    console.log(`${obj.id} ${obj.firstName} ${obj.lastName} -- ${obj.address}`);
  });
});

// Write a statement that returns all employees of a specified jobTitle
db.all("SELECT * FROM employees WHERE jobTitle = 'President'", (err, allRows) => {
  errorHandler(err);
  allRows.forEach(obj => {
    console.log(`${obj.firstName} ${obj.lastName}: ${jobTitle}`);
  });
});

// close db
db.close(err => {
  errorHandler(err); // Use custom error handling function
  console.log('Database closed'); // Will only log on successful close
});


            
