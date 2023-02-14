/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const userQueries = require('../db/queries/users');



// >>> PATH: /users <<<

// GET LOGIN PAGE
router.get('/login', (req, res) => {
  if (req.cookies.user_id) {
    return res.redirect('/quizzes');
  }
  const userId = req.cookies.user_id;
  const userName = req.cookies.user_name;
  res.render('login', { userId, userName });
});

// LOGIN PAGE SUBMIT
router.post('/login', (req, res) => {
  const email = req.body.emailLogin;
  const password = req.body.passwordLogin;
  // const hashedPassword = bcrypt.hashSync(password, 12);
  // console.log(email, hashedPassword);

  if (!email || !password) {
    res.render('errorhandle');
  }


  userQueries.getUserByEmail(email)
    .then((user) => {
      const {id, name, password: hashedPassword} = user;
      console.log(hashedPassword);
      if (bcrypt.compareSync(password, hashedPassword)) {

        res.cookie('user_id', id);
        res.cookie('user_name', name);
        res.redirect('/quizzes');
      }

      res.render('errorHandle');
    });
});

// LOGOUT BUTTON SUBMIT
router.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.clearCookie('user_name');
  res.redirect('/');
});


// GET ALL QUIZZES CREATED BY LOGGED-IN USER
router.get('/:user_id', (req, res) => {
  const userId = req.params.user_id;

  userQueries.getQuizzesByCreator(userId)
    .then((quizzes) => {
      const userName = req.cookies.user_name;

      const templateVars = {
        quizzes,
        userName,
        userId
      };

      res.render('quizzes_user', templateVars);
    })
  ;
});

module.exports = router;
