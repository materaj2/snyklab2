const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
  db.run("INSERT INTO users (username, password) VALUES ('admin', 'password1234!!!')");
  db.run('CREATE TABLE flags (id INTEGER PRIMARY KEY, flag TEXT)');
  db.run("INSERT INTO flags (flag) VALUES ('webtool{YJ7d!a4sZP4gXKV3JcKRsK}')");
});

app.get('/login', (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  // Vulnerable SQL query
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.get(query, (err, row) => {
    if (row) {
      res.send('<h1>Login Successful!</h1>');
    } else {
      res.send('<h1>Login Failed!</h1>');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
