var express = require('express');
var router = express.Router();

const authMid = function (req, res, next) {
  if (!req.session.isLoggedIn) {
    res.redirect('/');
  } else {
    next();
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  const isLoggedIn = req.session.isLoggedIn;
  const username = req.session.username;

  const linkGame = isLoggedIn ? `https://www.vb9553v.net/` : '#';
  const profileLink = isLoggedIn ? '/mobile/profile' : '#';
  const transactionLink = isLoggedIn ? '/mobile/transaction' : '#';
  const loggedClass = isLoggedIn ? 'isLoggedIn' : 'notLoggedIn';
  res.render('mobile', { title: 'Express', isLoggedIn, username, linkGame, loggedClass, profileLink, transactionLink });
});

router.get('/profile', authMid, function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

router.get('/promotion', function(req, res, next) {
  res.render('promotion', { title: 'Express' });
});

router.get('/recharge', authMid, function(req, res, next) {
  res.render('recharge', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/support', function(req, res, next) {
  res.render('support', { title: 'Express' });
});

router.get('/transaction', authMid, function(req, res, next) {
  res.render('transaction', { title: 'Express' });
});

module.exports = router;
