const db = require('../connection');

const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes;')
    .then(data => {
      return data.rows;
    });
};

const getQuizzesQuestionsById = (id) => {
  const queryTemplate = `
    SELECT question_text as question, answer_text as answer
    FROM quiz_questions
    JOIN quizzes
    ON quizzes.id = quiz_questions.quiz_id
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
