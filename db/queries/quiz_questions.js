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
    .then(() => console.log('create question run'))
    .catch(err => console.error(err.message));
};





module.exports = { createQuesFromQuesObj };
