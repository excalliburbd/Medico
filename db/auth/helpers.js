const bcrypt = require('bcryptjs');
const knex = require('../connections');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({status: 'Please log in'});
  return next();
}

function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    {status: 'You are already logged in'});
  return next();
}

const loginToChat = (req, res, next) => {
  if (!req.user) 
    return res.render('chatroom', {
      chatid: req.params.userid,
      showLogin: true
    });

  return next();
}

module.exports = {
  comparePass,
  loginRequired,
  loginRedirect,
  loginToChat,
};