const db = require('../connection');


const createQusFromQusObj = function(question) {
  const creatTemplate = `
    INSERT INTO quiz_questions (quiz_id, question_text, answer_text)
    VALUES
    ($1, $2, $3)
    RETURNING *
  ;
  `;

  const {quizId, questionText, answerText} = question;

  const sqlParams = [quizId, questionText, answerText];

  return db.query(creatTemplate, sqlParams)
    .then(() => console.log('create question query run'))
    .catch(err => console.error(err.message));
};





module.exports = {createQusFromQusObj};
