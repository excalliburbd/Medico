const express = require('express');
const router = express.Router();

const user = require('../db/user');
const authHelpers = require('../db/auth/helpers');
const passport = require('../db/auth/local');
const { handleResponse } = require('../utils');

router.post('/register', authHelpers.loginRedirect, (req, res)  => {
  return user.createUser(req.body)
    .then( response => { handleResponse(res, 200, response); })
    .catch((err) => { handleResponse(res, 500, err.detail); });
});

router.post('/login', authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { handleResponse(res, 500, 'error'); }
    if (!user) { handleResponse(res, 404, 'User not found'); }
    if (user) {
      req.logIn(user, function (err) {
        if (err) { handleResponse(res, 500, 'error'); }
        handleResponse(res, 200, 'success');
      });
    }
  })(req, res, next);
});

router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  handleResponse(res, 200, 'success');
});

module.exports = router;