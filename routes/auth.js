var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise')

require('dotenv').config()

function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_SCHEMA
  });
}

router.post('/login', async function(req, res, next) {
  const payload = req.body;
  const q = 'select * from accounts where username = ? and password = ?';
  const params = [payload.username.toLowerCase(), payload.password];

  try {
    const connection = await getConnection();
    const [rows] = await connection.query(q, params);

    if (rows.length) {
      req.session.isLoggedIn = true;
      req.session.username = rows[0].username;
      req.session.price = rows[0].price;
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false })
    }
  } catch (error) {
    res.status(400).json({ success: false })
  }
});

router.post('/login-web', async function(req, res, next) {
  const payload = req.body;

  const q = 'select * from accounts where username = ? and password = ?';
  const params = [payload.AccountID.toLowerCase(), payload.AccountPWD];
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(q, params);

    if (rows.length) {
      req.session.isLoggedIn = true;
      req.session.username = rows[0].username;
      req.session.price = rows[0].price;
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false })
    }
  } catch (error) {
    res.status(400).json({ success: false })
  }
});

router.post('/register', async function(req, res, next) {
  const payload = req.body;

  const q = 'INSERT INTO accounts VALUES (?, ?, ?, ?)';
  const params = [payload.username, payload.password, payload.phone, 0];

  try {
    const connection = await getConnection();
    await connection.query(q, params);
    res.redirect('/');
  } catch (error) {
    res.redirect('/');
  }
});

router.get('/logout', function (req, res) {
  req.session.isLoggedIn = false;
  req.session.username = undefined;

  res.redirect('/');
})

module.exports = router;
