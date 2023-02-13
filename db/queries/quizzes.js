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

// Insert new quiz into quizzes database
// Default number of questions as 10, and is_public as true FOR NOW.
const createNewQuizzes = (quiz) => {
  const creatTemplate = `
    INSERT INTO quizzes (creator_id, title, description, is_public, num_of_questions)
    VALUES
    ($1, $2, $3, $4, 10)
    RETURNING *
  ;
  `;

  const {userId, title, description, isPublic, numOfQuestions} = quiz;

  const sqlParams = [userId, title, description, isPublic, numOfQuestions];

  return db.query(creatTemplate, sqlParams)
    .then((res) => console.log(res.rows))
    .catch(err => console.error(err.message));
};


module.exports = { getQuizzes, getQuizzesQuestionsById, createNewQuizzes};
