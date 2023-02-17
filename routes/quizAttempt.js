const express = require('express');
const router = express.Router();
const quizzesQueries = require('../db/queries/quizzes');
const quizAttemptsQueries = require('../db/queries/quiz_attempts');

// /quizAttempt

// GET to render quiz_attempt page with info from db query.
router.get('/:attempt_id', (req, res) => {
  const attemptID = req.params.attempt_id;
  const userId = req.session.user_id;
  const userName = req.session.user_name;

  quizAttemptsQueries.getQuizAttemptById(attemptID)
    .then(attempt => {
      const templateVars = {
        userId,
        userName,
        attempt
      };
      return res.render('quiz_attempt', templateVars);
    });

});


// quizAttempt post create new attempt rows
router.post('/', (req, res) => {
  const userId = req.session.user_id;
  const quizId = req.body.quiz_id;
  let score = 0;

  quizzesQueries.getQuizzesQuestionsById(quizId)
    .then(questions => {
      const inputAnswer = Object.values(req.body);

      questions.forEach((question, index) => {
        if (question.answer.toLowerCase() === inputAnswer[index].toLowerCase()) {
          score++;
        }
      });

      const attempt = { quizId, userId, score };
      quizAttemptsQueries.createAttempt(attempt)
        .then(response => {
          return res.redirect(`/quizAttempt/${response.id}`);
        });
    });

});



module.exports = router;

