DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  category VARCHAR(255),
  thumbnail_url VARCHAR(255),
  preparation_time INTEGER,
  price INTEGER
);

