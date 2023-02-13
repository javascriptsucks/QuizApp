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

// GET LOGIN PAGE
router.get('/login', (req, res) => {
  if (req.cookies.user_id) {
    return res.redirect('/quizzes');
  }
  res.render('login');
});

// LOGIN PAGE SUBMIT
router.post('/login', (req, res) => {
  const email = req.body.emailLogin;
  userQueries.getUserByEmail(email)
    .then((user) => {
      const id = user.id;
      const name = user.name;
      res.cookie('user_id', id);
      res.cookie('user_name', name);
      res.redirect('/quizzes');
    });
});

// LOGOUT BUTTON SUBMIT
router.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.clearCookie('user_name');
  res.redirect('/');
});

module.exports = router;
