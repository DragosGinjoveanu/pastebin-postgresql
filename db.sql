CREATE DATABASE pastes;

CREATE TABLE pastes(
    pasteId SERIAL PRIMARY KEY,
    author VARCHAR(225),
    description VARCHAR(255)
);