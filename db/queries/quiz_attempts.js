const db = require('../connection');



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


const createAttempt = function(attempt) {
  const newAttemptTemplate = `
    INSERT INTO quiz_attempts (quiz_id, user_id, score)
    VALUES
    ($1, $2, $3)
    RETURNING *
  `;

  const {quizId, userId, score} = attempt;

  const sqlParams = [quizId, userId, score];

  return db.query(newAttemptTemplate, sqlParams)
    .then((res) => {
      console.log('creat question query run', res.rows[0]);
      return res.rows[0];
    })
    .catch(err => console.error(err.message));
};

module.exports = {createAttempt, getQuizAttemptById};
