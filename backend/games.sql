USE game_library;

INSERT INTO Platforms (name, createdAt, updatedAt) VALUES
('PC', NOW(), NOW()),
('Xbox', NOW(), NOW()),
('PlayStation 5', NOW(), NOW()),
('PlayStation 4', NOW(), NOW()),
('Nintendo Switch', NOW(), NOW()),
('Mobile', NOW(), NOW());

INSERT INTO Genres (name, createdAt, updatedAt) VALUES
('Action', NOW(), NOW()),
('Sport', NOW(), NOW()),
('RPG', NOW(), NOW()),
('FPS', NOW(), NOW()),
('Adventure', NOW(), NOW()),
('Strategy', NOW(), NOW()),
('Horror', NOW(), NOW()),
('Simulation', NOW(), NOW());