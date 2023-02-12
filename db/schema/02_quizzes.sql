-- Drop and recreate quizzes table (Example)

DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  num_of_questions INTEGER NOT NULL DEFAULT 10
);
