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

  DROP TABLE IF EXISTS lists CASCADE;

  CREATE TABLE lists(
      id SERIAL PRIMARY KEY,
      list_name VARCHAR(255) NOT NULL,
      description VARCHAR(255),
      complete BOOLEAN DEFAULT false,
      favourite BOOLEAN DEFAULT false,
      cover VARCHAR(255),
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );


DROP TABLE IF EXISTS list_items CASCADE;

CREATE TABLE list_items(
      id SERIAL PRIMARY KEY,
      list_id INT REFERENCES lists(id) ON DELETE CASCADE,
      item_order INT NOT NULL, 
      url VARCHAR(255),
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );


DROP TABLE IF EXISTS favourites CASCADE;

   CREATE TABLE favourites (
      id SERIAL PRIMARY KEY,
      list_id INT REFERENCES lists(id) ON DELETE CASCADE,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

DROP TABLE IF EXISTS reset_codes CASCADE;

  CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

