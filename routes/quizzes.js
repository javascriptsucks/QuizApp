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

// RENDER SHOW ALL QUIZZES PAGE
router.get('/', (req, res) => {
  quizzesQueries.getQuizzes()
    .then((quizzes) => {
      const user_name = req.cookies.user_name;

      const templateVars = {
        quizzes,
        user_name
      };

      res.render('quizzes', templateVars);
    })
  ;
});



// RENDER CREATE NEW QUIZ PAGE
router.get('/new', (req, res) => {
  res.render('quizzes_new');
});

// POST CREATE NEW QUIZ PAGE
router.post('/new', (req, res) => {
  const userId = req.cookies.user_id;
  const {title, description, isPublic, numOfQuestions} = req.body;
  if (!userId || !title || !description || !isPublic || !numOfQuestions) {
    res.render('errorhandle');
  }
  const quiz = {userId, title, description, isPublic, numOfQuestions};


  quizzesQueries.createNewQuizzes(quiz)
    .then((quizRes) => {
      const quizId = quizRes.id;
      // Loop for req.body grap all values
      for (let i = 1; i <= numOfQuestions; i++) {
        const questionText = req.body[`question${i}`];
        const answerText = req.body[`answer${i}`];

        const question = {quizId, questionText, answerText};

        quizQuestionsQueries.createQusFromQusObj(question)
          .then(() => console.log('Insert data to questions'));
      }


      res.redirect('/');
    });
});




// RENDER INDIVIDUAL QUIZ PAGE
router.get('/:quiz_id', (req, res) => {
  const quizId = req.params.quiz_id;
  quizzesQueries.getQuizzesQuestionsById(quizId)
    .then((questions) => {
      const user_name = req.cookies.user_name;
      const templateVars = {
        questions,
        user_name
      };
      res.render('quizzes_show', templateVars);
    });
});

// router.get()


module.exports = router;
