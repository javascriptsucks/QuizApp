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
    })
    .catch(err => console.error(err.message));

};


// GET ALL QUIZ QUESTIONS BY QUIZ_ID + NAME OF CREATOR
const getQuizzesQuestionsById = (id) => {
  const queryTemplate = `
    SELECT question_text as question, answer_text as answer, quizzes.title as title, users.name as creator, quizzes.id as quiz_id, quiz_questions.id as question_id
    FROM quiz_questions
    JOIN quizzes ON quizzes.id = quiz_questions.quiz_id
    JOIN users ON creator_id = users.id
    WHERE quizzes.id = $1
  ;
  `;
  const sqlParams = [id];

  return db.query(queryTemplate, sqlParams)
    .then((res) => {
      return res.rows;
    })
    .catch(err => console.error(err.message));

};

// Insert new quiz into quizzes database
// Default number of questions as 10, and is_public as true FOR NOW.
const createNewQuizzes = (quiz) => {
  const creatTemplate = `
    INSERT INTO quizzes (creator_id, title, description, is_public, num_of_questions)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *
  ;
  `;

  const {userId, title, description, isPublic, numOfQuestions} = quiz;

  const sqlParams = [userId, title, description, isPublic, numOfQuestions];

  return db.query(creatTemplate, sqlParams)
    .then((res) => {
      return res.rows[0];
    })
    .catch(err => console.error(err.message));
};



module.exports = { getQuizzes, getQuizzesQuestionsById, createNewQuizzes};
