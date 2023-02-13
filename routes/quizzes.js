const express = require('express');
const router  = express.Router();
const quizzesQueries = require('../db/queries/quizzes');


// >>> /quizzes

// RENDER SHOW ALL QUIZZES PAGE
router.get('/', (req, res) => {
  quizzesQueries.getQuizzes()
    .then((quizzes) => {
      console.log(quizzes);
      const templateVar = {quizzes};
      res.render('quizzes', templateVar);
    })
  ;
});

// RENDER CREATE NEW QUIZ PAGE
router.get('/new', (req, res) => {
  res.render('quizzes_new');
});

// RENDER INDIVIDUAL QUIZ PAGE
router.get('/:quiz_id', (req, res) => {
  res.render('quizzes_show');
});

// router.get()


module.exports = router;
