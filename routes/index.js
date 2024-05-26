var express = require('express');
var router = express.Router();

// const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database('database/db.sqlite')

// function databaseRoute(req, res, next) {
//   db.serialize(() => {
//     const query = `CREATE TABLE IF NOT EXISTS accounts (
//       username VARCHAR(255) NOT NULL,
//       password VARCHAR(255) NOT NULL,
//       phone VARCHAR(255) NOT NULL,
//       price INT
//     );`

//     db.run(query);
//   })
// }

/* GET home page. */
router.get('/', function(req, res, next) {
  const isLoggedIn = req.session.isLoggedIn;
  const username = req.session.username?.toUpperCase();
  const price = req.session.price || 0;
  res.render('index', { isLoggedIn, username, price });
});

module.exports = router;
