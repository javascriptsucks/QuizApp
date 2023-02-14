const express = require('express');
const router = express.Router();
const quizzesQueries = require('../db/queries/quizzes');

// quizAttempt/
router.get('/:attempt_id', (req, res) => {
  const attemptID = req.params.attempt_id;

  quizzesQueries.getQuizAttemptById(attemptID)
    .then(attempt => {
      return res.render('quiz_attempt', { attempt });
    });

});

module.exports = router;
