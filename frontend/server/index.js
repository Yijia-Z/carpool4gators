const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_mysql_database_name'
  });

  pool.query('SELECT * FROM users', (err, results, fields) => {
    if (err) {
      console.error(err);
    } else {
      console.log(results);
    }
  });