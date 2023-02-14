const express = require('express');
const router = express.Router();
const quizzesQueries = require('../db/queries/quizzes');

// quizAttempt post create new attempt rows
router.post('/', (req, res) => {
  const userId = req.cookies.user_id;
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

