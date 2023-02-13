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



module.exports = { getUsers, getUserByEmail, getUserByID };
