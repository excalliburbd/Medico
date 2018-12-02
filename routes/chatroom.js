const express = require('express');
const router = express.Router();

const authHelpers = require('../db/auth/helpers');

router.get('/:userid', authHelpers.loginToChat, function(req, res, next) {
  res.render('chatroom', {
    chatid: req.params.userid,
    user: req.user
  });
});

module.exports = router;
