/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');


// router.get('/:user_id', (req, res) => {
//   res.render('users');
// });

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const email = req.body.emailLogin;
  userQueries.getUserByEmail(email)
    .then((user) => {
      const id = user.id;
      res.cookie('user_id', id);
      res.redirect('/quizzes');
    });
});

router.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/');
});

module.exports = router;
