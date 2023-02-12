const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserById = (id = 1) => {
  const emailQuery = `
    SELECT *
    FROM users
    WHERE users.id = $1
  ;
  `;
  const sqlParams = [id];
  return db.query(emailQuery, sqlParams)
    .then((res) => {
      const user = res.rows[0];
      console.log(`From query Fnc ${user}`);
      return user;
    });
};

module.exports = { getUsers, getUserById };
