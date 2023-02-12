/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/:user_id', (req, res) => {
  res.render('users');
});

router.post('/login', (req, res) => {
  res.redirect('quizzes');
});

router.post('/logout', (req, res) => {
  res.redirect('index');
});

module.exports = router;
