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
  const username = req.session.username;

  const linkGame = isLoggedIn ? `https://www.vb9553v.net/` : '#';
  const profileLink = isLoggedIn ? '/profile' : '#';
  const transactionLink = isLoggedIn ? '/transaction' : '#';
  const loggedClass = isLoggedIn ? 'isLoggedIn' : 'notLoggedIn';
  res.render('index', { title: 'Express', isLoggedIn, username, linkGame, loggedClass, profileLink, transactionLink });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

router.get('/promotion', function(req, res, next) {
  res.render('promotion', { title: 'Express' });
});

router.get('/recharge', function(req, res, next) {
  res.render('recharge', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/support', function(req, res, next) {
  res.render('support', { title: 'Express' });
});

router.get('/transaction', function(req, res, next) {
  res.render('transaction', { title: 'Express' });
});

module.exports = router;
