const express = require('express');
const router = express.Router();

const user = require('../db/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  user.getAllUser()
  .then(users => users.filter( user => {
    if (!req.user) return true;

    if (req.user.doctor) {
      if (user.doctor) return false;
    } else {
      if (!user.doctor) return false;
    }

    if (user.id === req.user.id) return false;

    return true;
  } )) 
  .then(
    users => {
      
      const chunks = [];

      for(let i=0; i<users.length; i+=3) {
        chunks.push(users.slice(i, i+3));
      }

      res.render('index', {
        userRow: chunks,
        user: req.user
      });
    }
  )
});

module.exports = router;
