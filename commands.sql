
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    createdat TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedat TIMESTAMP WITH TIME ZONE NOT NULL
);

INSERT INTO blogs (author, url, title, likes)
VALUES
('Dr. Philiph', 'https://example.com/blog1', 'Learning Full Stack Development', 5),
('Dr. Philiph', 'https://example.com/blog2', 'Understanding PostgreSQL', 3);

SELECT * FROM blogs;
