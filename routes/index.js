const express = require('express');
const router = express.Router();

const user = require('../db/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  user.getAllUser().then(
    users => {
      const chunks = [];

      for(let i=0; i<users.length; i+=3) {
        chunks.push(users.slice(i, i+3));
      }

      res.render('index', {
        userRow: chunks
      });
    }
  )
});

module.exports = router;
