var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database/db.sqlite')

router.post('/login', function(req, res, next) {
  const payload = req.body;

  db.serialize(() => {
    const stmt = db.prepare('select * from accounts where username = ? and password = ?');
    stmt.all([payload.username.toLowerCase(), payload.password], (err, rows) => {
      console.log('rows', rows);
      if (rows.length) {
        req.session.isLoggedIn = true;
        req.session.username = rows[0].username;
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false })
      }
    })
    stmt.finalize();
  });
});

router.post('/register', function(req, res, next) {
  const payload = req.body;

  db.serialize(() => {
    const stmt = db.prepare('INSERT INTO accounts VALUES (?, ?, ?, ?)');
    stmt.run(payload.username, payload.password, payload.phone, 0);
    stmt.finalize();
    res.redirect('/');
  });
});

router.get('/logout', function (req, res) {
  req.session.isLoggedIn = false;
  req.session.username = undefined;

  res.redirect('/');
})

module.exports = router;
