const db = require('../connection');


// GET ALL QUIZZES + NAME OF CREATOR
const getQuizzes = () => {

  const queryTemplate = `
    SELECT quizzes.*, users.name as creator
    FROM quizzes
    JOIN users ON creator_id = users.id;
  `;
  return db.query(queryTemplate)
    .then(data => {
      return data.rows;
    });
};


// GET ALL QUIZ QUESTIONS BY QUIZ_ID + NAME OF CREATOR
const getQuizzesQuestionsById = (id) => {
  const queryTemplate = `
    SELECT question_text as question, answer_text as answer, quizzes.title as title, users.name as creator
    FROM quiz_questions
    JOIN quizzes ON quizzes.id = quiz_questions.quiz_id
    JOIN users ON creator_id = users.id
    WHERE quizzes.id = $1
  ;
  `;
  const sqlParams = [id];

  return db.query(queryTemplate, sqlParams)
    .then((res) => {
      // console.log(res.rows);
      return res.rows;
    });
};


const getQuizAttemptById = (quizAttemptId) => {
  const queryTemplate = `
    SELECT quiz_attempts.*, users.name as name, quizzes.title as quiz_title
    FROM quiz_attempts
    JOIN users ON user_id = users.id
    JOIN quizzes ON quiz_id = quizzes.id
    WHERE quiz_attempts.id = $1
  ;
  `;
  const sqlParams = [quizAttemptId];

  return db.query(queryTemplate, sqlParams)
    .then((data) => {
      return data.rows[0];
    });

};


module.exports = { getQuizzes, getQuizzesQuestionsById, getQuizAttemptById };
