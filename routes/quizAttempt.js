const express = require('express');
const router = express.Router();

// quizAttempt/
router.get('/:attempt_id', (req, res) => {
  res.render('quiz_attempt');
});

module.exports = router;
