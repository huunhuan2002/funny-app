var express = require('express');
var router = express.Router();
var googleSheet = require('../service/GoogleSheet');

async function login(userName, password) {
  const userList = await googleSheet.loadUserList();
  if (userList) {
    const userInfor = userList.find((data) => {
      if (Array.isArray(data) && data[0] && data[1]) {
        return userName === data[0] && password === data[1];
      }

      return false;
    });

    if (userInfor) {
      return {
        userName: userName,
        price: userInfor[2]
      }
    } else {
      const isUserNameExisted = userList.some((data) => {
        if (Array.isArray(data) && data[0]) {
          return userName === data[0];
        }
        return false;
      });

      if (!isUserNameExisted) {
        const newDatas = [[userName, password, 0, '', new Date().toString(), new Date().toString()]];
        await googleSheet.writeNewData(newDatas);

        return {
          userName,
          price: 0
        }
      }
    }
  }

  return null;
}

router.post('/login', async function(req, res, next) {
  const payload = req.body;

  try {
    const userLoggedIn = await login(payload.username?.toLowerCase() || '', payload.password);

    if (userLoggedIn) {
      req.session.isLoggedIn = true;
      req.session.username = userLoggedIn.userName;
      req.session.price = userLoggedIn.price;
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

  try {
    const userLoggedIn = await login(payload.AccountID?.toLowerCase() || '', payload.AccountPWD);

    if (userLoggedIn) {
      req.session.isLoggedIn = true;
      req.session.username = userLoggedIn.userName;
      req.session.price = userLoggedIn.price;
      res.status(200).json({ success: true });
    } else {
      const Error = {
        "Code": 1002,
        "Message": "Tài khoản hoặc mật khẩu sai"
      };
      res.status(400).json({Error})
    }
  } catch (error) {
    const Error = {
      "Code": 1002,
      "Message": "Tài khoản hoặc mật khẩu sai"
    };
    res.status(400).json({Error})
  }
});

router.post('/register', async function(req, res, next) {
  const payload = req.body;

  try {
    const userList = await googleSheet.loadUserList();
    const userInfor = userList.find((data) => {
      if (Array.isArray(data) && data[0] && data[1]) {
        return payload.username === data[0];
      }

      return false;
    });
    if (userInfor) {
      res.redirect('/');
    } else {
      const newDatas = [[payload.username, payload.password, 0, payload.phone, new Date().toString(), new Date().toString()]];
      await googleSheet.writeNewData(newDatas);
      req.session.isLoggedIn = true;
      req.session.username = payload.username;
      req.session.price = 0;
      res.redirect('/');
    }
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
