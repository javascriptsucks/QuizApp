const db = require('../connection');


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
    })
    .catch(err => console.error(err.message));
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
    })
    .catch(err => console.error(err.message));
};



// CREATE NEW USER BY REGISTER
const createNewUser = (user) => {
  const queryTemplate = `
    INSERT INTO users (name, email, password)
    VALUES
    ($1, $2, $3)
    RETURNING *
  ;
  `;

  const { name, email, password } = user;

  const sqlParams = [name, email, password];

  return db.query(queryTemplate, sqlParams)
    .then((res) => {
      return res.rows[0];
    })
    .catch(err => console.error(err.message));
};


// GET ALL QUIZZES CREATED BY A USER
const getQuizzesByCreator = (userId) => {

  const queryTemplate = `
    SELECT quizzes.*, users.name as creator
    FROM quizzes
    JOIN users ON creator_id = users.id
    WHERE creator_id = $1
    ORDER BY quizzes.id DESC;
  `;
  const sqlParams = [userId];

  return db.query(queryTemplate, sqlParams)
    .then(data => {
      return data.rows;
    })
    .catch(err => console.error(err.message));
};



module.exports = { getUserByEmail, getUserByID, getQuizzesByCreator, createNewUser };
