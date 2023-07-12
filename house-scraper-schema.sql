DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS types CASCADE;
CREATE TABLE types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount INTEGER

);


CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type_id INTEGER REFERENCES types ON DELETE CASCADE,
  color VARCHAR(255),
  website VARCHAR(255),
  link VARCHAR(255),
  image_url VARCHAR(255),
  date_added DATE,
  price DECIMAL(10,2),
  is_sold BOOLEAN DEFAULT false

);

-- INSERT INTO items (name, type_id, color, website, link, date_added, is_sold) VALUES
--   ('Item 1', 1, 'Red', 'Example.com', 'https://example.com/item1', '2023-07-08', false),
--   ('Item 2', 2, 'Blue', 'AnotherSite.com', 'https://anothersite.com/item2', '2023-07-09', true),
--   ('Item 3', 3, 'Green', 'ThirdSite.com', 'https://thirdsite.com/item3', '2023-07-10', false);

-- SELECT items.name AS item_name, types.name AS type_name, items.color
-- FROM items
-- JOIN types ON items.type_id = types.id;