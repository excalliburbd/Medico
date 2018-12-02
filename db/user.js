const knex = require('./connections');
const bcrypt = require('bcryptjs');

function createUser (user) {
  const {
    password,
    username,
    name,
    email,
    doctor
  } = user;

  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return knex('users')
    .insert({
      username: username,
      password: hash,
      email: email,
      name: name,
      doctor: doctor
    })
    .returning('*');
}


module.exports = {
  createUser
}
