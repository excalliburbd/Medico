const express = require('express');
const router = express.Router();

const authHelpers = require('../db/auth/helpers');
const { handleResponse } = require('../utils');

router.get('/user', authHelpers.loginRequired, (req, res, next)  => {
  handleResponse(res, 200, 'success');
});

router.get('/admin', authHelpers.adminRequired, (req, res, next)  => {
  handleResponse(res, 200, 'success');
});

module.exports = router;