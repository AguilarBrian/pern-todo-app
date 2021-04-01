CREATE DATABASE perntodo; --The database (db), our workspace, will be created

CREATE TABLE todo ( --I create a new Table that will contain some data on my db
    todo_id SERIAL PRIMARY KEY, --like an ID (always necessary), that will increase is value automatically (SERIAL data type)
    description VARCHAR(255) --or a Description (useful for a todo app), that will contain a string of 255 chars max (VARCHAR data type)
);

--VARCHAR stands for VARiable CHARacter (character data that is varying)