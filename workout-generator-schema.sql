CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_coach BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE session (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25),
  date_completed TIMESTAMP
);

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    reps INTEGER,
    total_sets INTEGER,
    total_weight FLOAT 
);

CREATE TABLE session_exercises (
   session_id INTEGER
    REFERENCES "session" ON DELETE CASCADE,
  exercises_id INTEGER
    REFERENCES exercises ON DELETE CASCADE,  

  PRIMARY KEY (session_id, exercises_id)
);

