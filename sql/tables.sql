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


-- table shoudl allow for selecting urls which belong to the same list (list_name) for a specific user (user_id)
-- consider how to make list_name/user combo unique - cant do it in table as there will be multiple rows  
-- corresponds to list details popup (where user enters list name, desc and cover)
  DROP TABLE IF EXISTS lists CASCADE;

  CREATE TABLE lists(
      id SERIAL PRIMARY KEY,
      list_name VARCHAR(255) NOT NULL,
      description VARCHAR(255),
      cover VARCHAR(255),
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

-- each upladed item will be added as a row to list items (i.e. multiple rows will belong to same list by user)
-- items will be connected to a specific list by list_id (UNIQUE) (NOT SURE HOW TO PASS THIS DOWN) / use list_name if not possible to use list_id
-- corresponds to input fields for images (i.e. the squares)
CREATE TABLE list_items(
      id SERIAL PRIMARY KEY,
      list_id INT REFERENCES lists(id) ON DELETE CASCADE,
      description VARCHAR(255),
      -- list_name INT REFERENCES lists(list_name) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );







-- // IF ABOVE APPROACH DOES NOT WORK, SEPARATE OUT THE IMAGES FROM THE LISTS TABLE
    CREATE TABLE (
      id SERIAL PRIMARY KEY,
      list_id INT REFERENCES lists(id) ON DELETE CASCADE,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      url_1 VARCHAR(255),
      url_2 VARCHAR(255),
      url_3 VARCHAR(255),
      url_4 VARCHAR(255),
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

