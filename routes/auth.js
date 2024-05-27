var express = require('express');
var router = express.Router();
var mysql = require('mysql')

require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_SCHEMA
})

connection.connect()

router.post('/login', function(req, res, next) {
  const payload = req.body;
  const q = 'select * from accounts where username = ? and password = ?';
  const params = [payload.username.toLowerCase(), payload.password];
  connection.query(q, params, function(err, rows) {
    if (rows.length) {
      req.session.isLoggedIn = true;
      req.session.username = rows[0].username;
      req.session.price = rows[0].price;
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false })
    }
  });
});

router.post('/login-web', function(req, res, next) {
  const payload = req.body;

  const q = 'select * from accounts where username = ? and password = ?';
  const params = [payload.AccountID.toLowerCase(), payload.AccountPWD];
  connection.query(q, params, function(err, rows) {
    console.log('row', rows);
    if (rows.length) {
      req.session.isLoggedIn = true;
      req.session.username = rows[0].username;
      req.session.price = rows[0].price;
      res.status(200).json({ success: true });
    } else {
        const Error = {
          "Code": 1002,
          "Message": "Tài khoản hoặc mật khẩu sai"
        };
        res.status(400).json({Error})
    }
  });
});

router.post('/register', function(req, res, next) {
  const payload = req.body;

  const q = 'INSERT INTO accounts VALUES (?, ?, ?, ?)';
  const params = [payload.username, payload.password, payload.phone, 0];
  connection.query(q, params, function(err, rows) {
    res.redirect('/');
  });
});

router.get('/logout', function (req, res) {
  req.session.isLoggedIn = false;
  req.session.username = undefined;

  res.redirect('/');
})

module.exports = router;
