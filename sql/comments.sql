DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    image_id INTEGER NOT NULL,
    comment VARCHAR (1000) NOT NULL,
    username VARCHAR (250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
