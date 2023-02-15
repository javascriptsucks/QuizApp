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
  if (req.session.user_id) {
    return res.redirect('/quizzes');
  }
  res.render('users_login');
});

// LOGIN PAGE SUBMIT
router.post('/login', (req, res) => {
  const email = req.body.emailLogin;
  const password = req.body.passwordLogin;


  if (!email || !password) {
    return res.render('errorhandle');
  }

  userQueries.getUserByEmail(email)
    .then((user) => {
      // IF user not exist or random input email password
      // Render error
      if (!user) {
        return res.render('errorHandle');
      }
      // IF user exist and password match: return session
      const {id, name, password: hashedPassword} = user;
      if (bcrypt.compareSync(password, hashedPassword)) {

        req.session['user_id'] =  id;
        req.session['user_name'] = name;
        return res.redirect('/quizzes');
      }
      // IF password not match return error
      return res.render('errorHandle');
    });
});


// GET SIGN UP PAGE

router.get('/register', (req, res) => {
  if (req.session.user_id) {
    return res.redirect('/quizzes');
  }
  // const userId = req.session.user_id;
  // const userName = req.session.user_name;
  res.render('users_register');
});

// POST SIGN UP SUBMIT

router.post('/register', (req, res) => {
  const {name, email, password, passwordConfirm} = req.body;

  if (!name || !email || !password || !passwordConfirm) {
    return res.render('errorHandle');
  }
  if (password !== passwordConfirm) {
    return res.render('errorHandle');
  }
  const hashedPassword = bcrypt.hashSync(password, 12);
  const user = {name, email, password: hashedPassword};
  userQueries.createNewUser(user)
    .then((response) => {
      req.session['user_id'] = response.id;
      req.session['user_name'] = name;
      return res.redirect('/quizzes');
    });

});

// LOGOUT BUTTON SUBMIT
router.post('/logout', (req, res) => {
  req.session['user_id'] = null;
  req.session['user_name'] = null;
  res.redirect('/');
});


// GET ALL QUIZZES CREATED BY LOGGED-IN USER
router.get('/:user_id', (req, res) => {
  const userId = req.params.user_id;

  userQueries.getQuizzesByCreator(userId)
    .then((quizzes) => {
      const userName = req.session.user_name;

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
