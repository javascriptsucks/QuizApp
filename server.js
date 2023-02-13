// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Middleware
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const quizzesAPIroutes = require('./routes/quizzes-api');
const quizzesRoutes = require('./routes/quizzes');
const quizAttemptRoutes = require('./routes/quizAttempt');

// Helper Function for user ID query
const userQueries = require('./db/queries/users');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/api/quizzes', quizzesAPIroutes);
app.use('/quizzes', quizzesRoutes);
app.use('/quizAttempt', quizAttemptRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const user_id = req.cookies.user_id;
  if (user_id) {
    return res.redirect('/quizzes');
    
    // userQueries.getUserByID(user_id)
    //   .then(user => {

    //     const templateVars = {
    //       id: user_id,
    //       name: user.name
    //     };

    //     console.log('templateVars:', templateVars);
    //     return res.render('index', templateVars);
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   });
  }

  return res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
