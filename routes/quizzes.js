const express = require('express');
const router = express.Router();
const quizzesQueries = require('../db/queries/quizzes');
const quizQuestionsQueries = require('../db/queries/quiz_questions');

router.use((req, res, next) => {
  if (!req.cookies.user_id) {
    return res.redirect('/');
  }
  next();
});

// >>> /quizzes

// RENDER SHOW ALL PUBLIC QUIZZES PAGE
router.get('/', (req, res) => {
  quizzesQueries.getPublicQuizzes()
    .then((quizzes) => {
      const userName = req.cookies.user_name;
      const userId = req.cookies.user_id;
      const templateVars = {
        quizzes,
        userName,
        userId
      };

      res.render('quizzes', templateVars);
    });
});



// RENDER CREATE NEW QUIZ PAGE
router.get('/new', (req, res) => {
  const userId = req.cookies.user_id;
  const userName = req.cookies.user_name;

  const templateVars = {
    userId,
    userName
  };
  res.render('quizzes_new', templateVars);
});




// RENDER INDIVIDUAL QUIZ PAGE
router.get('/:quiz_id', (req, res) => {
  const quizId = req.params.quiz_id;
  quizzesQueries.getQuizzesQuestionsById(quizId)
    .then((questions) => {
      const userName = req.cookies.user_name;
      const userId = req.cookies.user_id;
      const templateVars = {
        questions,
        userName,
        userId
      };
      res.render('quizzes_show', templateVars);
    });
});




// POST CREATE NEW QUIZ PAGE
router.post('/new', (req, res) => {
  const userId = req.cookies.user_id;
  const { title, description, isPublic, numOfQuestions } = req.body;

  if (!userId || !title || !description || !isPublic || !numOfQuestions) {
    res.render('errorhandle');
  }

  const quiz = { userId, title, description, isPublic, numOfQuestions };


  quizzesQueries.createNewQuizzes(quiz)
    .then((quizRes) => {

      const quizId = quizRes.id;

      // LOOP THROUGH REQ.BODY, GRAB ALL THE VALUES.
      for (let i = 1; i <= numOfQuestions; i++) {
        const questionText = req.body[`question${i}`];
        const answerText = req.body[`answer${i}`];

        console.log('Start to print output of all questions input!!!!!', quizId, questionText, answerText);

        const question = { quizId, questionText, answerText };

        quizQuestionsQueries.createQuesFromQuesObj(question)
          .then(() => console.log('Insert data to questions'));
      }

      res.redirect('/');
    });
});



// router.get()


module.exports = router;
