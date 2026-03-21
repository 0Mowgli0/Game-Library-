

CREATE TABLE `Users` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Posts` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  userId INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_posts_user
    FOREIGN KEY (userId) REFERENCES `Users`(id)
    ON DELETE SET NULL
);

CREATE TABLE `Tags` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Comments` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  postId INT,
  userId INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_comments_post
    FOREIGN KEY (postId) REFERENCES `Posts`(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_comments_user
    FOREIGN KEY (userId) REFERENCES `Users`(id)
    ON DELETE SET NULL
);

CREATE TABLE `PostTags` (
  postId INT,
  tagId INT,
  PRIMARY KEY (postId, tagId),
  CONSTRAINT fk_posttags_post
    FOREIGN KEY (postId) REFERENCES `Posts`(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_posttags_tag
    FOREIGN KEY (tagId) REFERENCES `Tags`(id)
    ON DELETE CASCADE
);

CREATE TABLE `Games` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  platform VARCHAR(255) NOT NULL,
  genre VARCHAR(255),
  status VARCHAR(255),
  releaseYear INT,
  image TEXT,
  description TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `Users` (username, email)
VALUES
('alex', 'alex@mail.com'),
('sara', 'sara@mail.com');

INSERT INTO `Posts` (title, content, userId)
VALUES
('Mina favoritspel', 'Jag gillar RPG och indie-spel mest.', 1),
('Vad spelar ni nu?', 'Jag spelar just nu Elden Ring.', 2);

INSERT INTO `Tags` (name)
VALUES
('RPG'),
('Action'),
('Indie');

INSERT INTO `Comments` (content, postId, userId)
VALUES
('Samma här!', 1, 2),
('Elden Ring är grymt!', 2, 1);

INSERT INTO `PostTags` (postId, tagId)
VALUES
(1, 1),
(1, 3),
(2, 2);

INSERT INTO `Games` (title, platform, genre, status, releaseYear, image, description)
VALUES
('The Witcher 3', 'PC', 'RPG', 'Completed', 2015, 'https://placehold.co/600x400?text=Witcher+3', 'Open world RPG adventure'),
('Hades', 'Switch', 'Roguelike', 'Playing', 2020, 'https://placehold.co/600x400?text=Hades', 'Fast-paced dungeon crawler'),
('Elden Ring', 'PS5', 'Action RPG', 'Wishlist', 2022, 'https://placehold.co/600x400?text=Elden+Ring', 'Fantasy action RPG');