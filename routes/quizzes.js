const express = require('express');
const router = express.Router();
const quizzesQueries = require('../db/queries/quizzes');

router.use((req, res, next) => {
  if (!req.cookies.user_id) {
    return res.redirect('/users/login');
  }
  next();
});

// >>> /quizzes

// RENDER SHOW ALL QUIZZES PAGE
router.get('/', (req, res) => {
  quizzesQueries.getQuizzes()
    .then((quizzes) => {
      const templateVar = { quizzes };
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
  const quizId = req.params.quiz_id;
  quizzesQueries.getQuizzesQuestionsById(quizId)
    .then((questions) => {
      const templateVar = { questions };
      res.render('quizzes_show', templateVar);
    });
});

// router.get()


module.exports = router;
