const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserByEmail = (email) => {
  const emailQuery = `
    SELECT *
    FROM users
    WHERE users.email = $1
  ;
  `;
  const sqlParams = [email];
  return db.query(emailQuery, sqlParams)
    .then((res) => {
      const user = res.rows[0];
      return user;
    });
};

const getUserByID = (id) => {
  const idQuery = `
    SELECT *
    FROM users
    WHERE users.id = $1
  ;
  `;
  const sqlParams = [id];
  return db.query(idQuery, sqlParams)
    .then((res) => {
      const user = res.rows[0];
      return user;
    });
};

// GET ALL QUIZZES CREATED BY A USER
const getQuizzesByCreator = (userId) => {

  const queryTemplate = `
    SELECT quizzes.*, users.name as creator
    FROM quizzes
    JOIN users ON creator_id = users.id
    WHERE creator_id = $1;
  `;
  const sqlParams = [userId];

  return db.query(queryTemplate, sqlParams)
    .then(data => {
      return data.rows;
    })
    .catch(err => console.error(err.message));
};



module.exports = { getUsers, getUserByEmail, getUserByID, getQuizzesByCreator };
