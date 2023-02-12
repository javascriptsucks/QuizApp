/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  console.log('users 🐷');
  // const id = req.cookies.user_id;
  userQueries.getUserById(
    // default id = 1
  )
    .then((user) => {
      console.log(user);
      const templateVars = {user};
      console.log(templateVars);
      // res.json(user);
      res.render('users',
        templateVars
      );
    });

});

module.exports = router;
