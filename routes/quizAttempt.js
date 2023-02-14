const express = require('express');
const router = express.Router();
const quizzesQueries = require('../db/queries/quizzes');
const quizAttemptsQueries = require('../db/queries/quiz_attempts');

// quizAttempt post create new attempt rows
router.post('/', (req, res) => {
  const userId = req.cookies.user_id;
  const quizId = req.query.quizid;
  const score = 0;
  quizzesQueries.getQuizzesQuestionsById(quizId)
    .then(questions => {
      console.log(`All questions check order: ${questions}`);
      console.log(`All answers check order: ${req.body}`);
    });




  res.redirect('/');
  // quizAttemptsQueries.createAttempt(attempt)
});



// quizAttempt/
router.get('/:attempt_id', (req, res) => {
  const attemptID = req.params.attempt_id;

  quizzesQueries.getQuizAttemptById(attemptID)
    .then(attempt => {
      return res.render('quiz_attempt', { attempt });
    });

});

module.exports = router;

