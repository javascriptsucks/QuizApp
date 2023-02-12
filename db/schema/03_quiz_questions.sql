-- Drop and recreate quiz_questions table (Example)

DROP TABLE IF EXISTS quiz_questions CASCADE;
CREATE TABLE quiz_questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  answer_text TEXT NOT NULL

);
