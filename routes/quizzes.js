const express = require('express');
const router  = express.Router();

// >>> /quizzes

// RENDER SHOW ALL QUIZZES PAGE
router.get('/', (req, res) => {
  res.render('quizzes');
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
