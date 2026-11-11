
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES
('Dr. Philiph', 'https://example.com/blog1', 'Learning Full Stack Development', 5),
('Dr. Philiph', 'https://example.com/blog2', 'Understanding PostgreSQL', 3);

SELECT * FROM blogs;
