DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      profile_img VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

  CREATE TABLE images(
      id SERIAL PRIMARY KEY,
      url VARCHAR(255),
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );



  CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- DROP TABLE IF EXISTS friendships CASCADE;

--    CREATE TABLE friendships(
--    id SERIAL PRIMARY KEY,
--    sender_id INT REFERENCES users(id) ON DELETE CASCADE,
--    recipient_id INT REFERENCES users(id) ON DELETE CASCADE,
--    accepted BOOLEAN DEFAULT false
--  );

  -- DROP TABLE IF EXISTS chat CASCADE;

  -- CREATE TABLE chat(
  --     id SERIAL PRIMARY KEY,
  --     message VARCHAR NOT NULL,
  --     sender_id INT REFERENCES users(id) ON DELETE CASCADE,
  --     timestamp TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'CET')
  -- );

INSERT INTO chat (message, sender_id) VALUES('hey long time no speak',1);
INSERT INTO chat (message, sender_id) VALUES('is it?',2);
INSERT INTO chat (message, sender_id) VALUES('well, its been 17 weeks',3);
INSERT INTO chat (message, sender_id) VALUES('lol get the hint bro',4);
INSERT INTO chat (message, sender_id) VALUES('ouch :(',5);

