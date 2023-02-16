const express = require('express');
const router = express.Router();
const quizzesQueries = require('../db/queries/quizzes');
const quizQuestionsQueries = require('../db/queries/quiz_questions');

router.use((req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect('/');
  }
  next();
});

// >>> /quizzes

// RENDER SHOW ALL PUBLIC QUIZZES PAGE
router.get('/', (req, res) => {
  const userId = req.session.user_id;
  quizzesQueries.getPublicQuizzes()
    .then((quizzes) => {
      const userName = req.session.user_name;
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
  const userId = req.session.user_id;
  const userName = req.session.user_name;

  const templateVars = {
    userId,
    userName
  };
  res.render('quizzes_new', templateVars);
});

// RENDER UPDATE QUIZ PAGE
router.get('/update/:quiz_id', (req, res) => {
  const userId = req.session.user_id;
  const userName = req.session.user_name;
  const quizId = req.params.quiz_id;

  quizzesQueries.getQuizzesQuestionsById(quizId)
    .then(response => {
      if (response[0].creator_id !== userId) {
        return res.render('errorHandle');
      }
      console.log(response);
      const templateVars = {
        response,
        userId,
        userName
      };
      res.render('quizzes_update', templateVars);
    });
});

// POST UPDATE QUIZ AND ALSO QUIZ QUESTIONS

router.post('/update/:quiz_id', (req, res) => {
  for (const key in req.body) {
    if (req.body[key] === '') {
      console.log('blank input detected');
      return res.render('errorHandle');
    }
  }

  let numOfQuestionsBefore = 0;
  const quizId = req.params.quiz_id;
  const userId = req.session.user_id;
  quizzesQueries.getQuizzesQuestionsById(quizId)
    .then((quizQuestions) => {
      numOfQuestionsBefore = quizQuestions[0].question_number;
      if (quizQuestions[0].creator_id !== userId) {
        console.log('not same creator');
        return res.render('errorHandle');
      }
    });


  const {title, description, isPublic, numOfQuestions} = req.body;
  const quiz = {title, description, isPublic, numOfQuestions, id: quizId};
  quizzesQueries.updateQuizByObj(quiz)
    .then((response) => {
      console.log(response);

      for (let i = 1; i <= numOfQuestionsBefore; i++) {

        const questionText = req.body[`question${i}`];
        const answerText = req.body[`answer${i}`];
        console.log(req.body);
        console.log(req.body[`question_id${i}`]);
        const questionId = Number(req.body[`question_id${i}`]);

        console.log('Start to print output of all questions input!!!!!', questionId, questionText, answerText);

        const question = { questionId, questionText, answerText };
        console.log(`Route side question! ${question.questionId}`);
        quizQuestionsQueries.updateQuesFromQuesObj(question)
          .then((response) => console.log('Update data to questions', response));

      }
      if (numOfQuestions > numOfQuestionsBefore) {

        for (let j = numOfQuestionsBefore + 1; j <= numOfQuestions; j++) {

          const questionText = req.body[`question${j}`];
          const answerText = req.body[`answer${j}`];

          console.log('Start to print output of all questions input!!!!!', quizId, questionText, answerText);

          const question = { quizId, questionText, answerText };

          quizQuestionsQueries.createQuesFromQuesObj(question)
            .then((question) => console.log('Insert data to questions', question));

        }

      }

      res.redirect('/');
    });
});





// RENDER INDIVIDUAL QUIZ PAGE
router.get('/:quiz_id', (req, res) => {
  const quizId = req.params.quiz_id;
  quizzesQueries.getQuizzesQuestionsById(quizId)
    .then((questions) => {
      const userName = req.session.user_name;
      const userId = req.session.user_id;
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
  const userId = req.session.user_id;
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





module.exports = router;
