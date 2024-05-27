var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const isLoggedIn = req.session.isLoggedIn;
  const username = req.session.username?.toUpperCase();
  const price = req.session.price || 0;
  res.render('index', { isLoggedIn, username, price });
});

module.exports = router;
