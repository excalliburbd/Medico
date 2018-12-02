const express = require('express');
const router = express.Router();

router.get('/:userid', function(req, res, next) {
  res.render('chatroom', {
    chatid: req.params.userid
  });
});

module.exports = router;
