/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const {body, validationResult} = require('express-validator');
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
router.post('/login',
  // USER INPUT VALIDATION
  body('emailLogin').isEmail(),
  body('passwordLogin').isLength({min: 7}),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const templateVars = {
        errorMsg: errors.array()[0].msg
      };
      return res.status(400).render('errorHandle', templateVars);
    }

    //EMAIL SHOULD NOT BE CASE SENSITIVE
    const email = req.body.emailLogin.toLowerCase();
    const password = req.body.passwordLogin;

    userQueries.getUserByEmail(email)
      .then((user) => {
      // IF user not exist or random input email password
      // Render error
        if (!user) {

          return res.status(501).render('errorHandle', {errorMsg: 'SORRY, CAN NOT FIND USER, PLEASE TRY AGAIN. '});
        }
        // IF user exist and password match: return session
        const {id, name, password: hashedPassword} = user;
        if (bcrypt.compareSync(password, hashedPassword)) {

          req.session['user_id'] =  id;
          req.session['user_name'] = name;
          return res.redirect('/quizzes');
        }
        // IF password not match return error
        return res.status(401).render('errorHandle', {errorMsg: 'SORRY, INVALID INPUT VALUE, PLEASE TRY AGAIN. '});
      });
  });


// GET SIGN UP PAGE

router.get('/register', (req, res) => {
  if (req.session.user_id) {
    return res.redirect('/quizzes');
  }

  res.render('users_register');
});

// POST SIGN UP SUBMIT

router.post('/register',
  body('name').isLength({ min: 2 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({min: 7}),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const templateVars = {
        errorMsg: errors.array()[0].msg
      };
      return res.status(400).render('errorHandle', templateVars);
    }
    let {name, email, password, passwordConfirm} = req.body;
    //EMAIL SHOULD NOT BE CASE SENSITIVE
    email = email.toLowerCase();


    if (password !== passwordConfirm) {
      return res.status(401).render('errorHandle', {errorMsg: 'PASSWORD WAS NOT THE SAME, PLEASE TRY AGAIN. '});
    }

    try {
      // 1. CHECK TO SEE IF EMAIL HAS REGISTERED
      userQueries.getUserByEmail(email)
        .then((response) => {
          if (!response) {
            const hashedPassword = bcrypt.hashSync(password, 12);
            const user = {name, email, password: hashedPassword};
            // 2. NO REGISTER CREATE NEW USER
            userQueries.createNewUser(user)
              .then((response) => {
                req.session['user_id'] = response.id;
                req.session['user_name'] = name;
                return res.redirect('/quizzes');
              });
          // 3.HAS REGISTERED POP ERROR MESSAGE
          } else {
            return res.status(400).render('errorHandle', {errorMsg: 'THE USER HAS ALREADY REGISTERED, PLEASE USE DIFFERENT EMAIL. '});
          }
        });

    } catch (error) {
      console.error(error.message);
      return res.status(500);
    }
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
    });
});

module.exports = router;
