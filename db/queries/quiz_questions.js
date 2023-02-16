const db = require('../connection');


const createQuesFromQuesObj = function(question) {
  const queryTemplate = `
    INSERT INTO quiz_questions (quiz_id, question_text, answer_text)
    VALUES
    ($1, $2, $3)
    RETURNING *
  ;
  `;

  const { quizId, questionText, answerText } = question;

  const sqlParams = [quizId, questionText, answerText];

  return db.query(queryTemplate, sqlParams)
    .then((res) => res.rows[0])
    .catch(err => console.error(err.message));
};

const updateQuesFromQuesObj = function(question) {
  const queryTemplate = `
    UPDATE quiz_questions
    SET question_text = $1,
    answer_text = $2
    WHERE id = $3
    RETURNING *
  ;
  `;
  const { questionText, answerText, questionId } = question;

  const sqlParams = [questionText, answerText, questionId];
  return db.query(queryTemplate, sqlParams)
    .then((res) => res.rows[0])
    .catch(err => console.error(err.message));
};




module.exports = { createQuesFromQuesObj, updateQuesFromQuesObj};
