const mysql = require('mysql2');

// Connection to the database
const connection = mysql.createConnection({
  host: 'localhost', // Computer
  user: 'root', // Username
  password: 'Goldy312', // Password
  database: 'chillux', // Database name
});

// Connect to the database:
connection.connect((error) => {
  if (error) {
    console.log('Failed to create connection + ' + error);
    return;
  }
  console.log('Connected to MySQL');
});

// One function for executing select / insert / update / delete:
const execute = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, result) => {
      if (error) {
        console.log('Error ' + error);
        return reject(error);
      }
      resolve(result);
    });
  });
};

const executeWithParameters = (sql, parameters) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, parameters, (error, result) => {
      if (error) {
        console.log('Error ' + error);
        console.log('Failed interacting with DB, calling reject');
        return reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = {
  execute,
  executeWithParameters,
};
