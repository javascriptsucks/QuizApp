const db = require('../connection');

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


module.exports = { getQuizzes, getQuizzesQuestionsById };
