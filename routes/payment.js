var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('not found');
});

router.get('/qrcode', function(req, res, next) {
  res.render('payment_qrcode');
});

router.get('/select-bank', function(req, res, next) {
  res.render('select_bank');
});

router.get('/view-qr', function(req, res, next) {
  const username = req.session.username;
  const money = (req.session.money || 0) * 1000;
  const moneyFormatted = new Intl.NumberFormat('vi-VN').format(money);
  res.render('view_qr', { username, money: moneyFormatted });
});

router.post('/update-payment', function(req, res) {
  const body = req.body;
  req.session.money = body.money;

  res.redirect('/payment/select-bank');
})

module.exports = router;
