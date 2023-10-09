DROP DATABASE IF EXISTS attackflow;

CREATE DATABASE attackflow;

USE attackflow;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(30),
    lastname VARCHAR(30),
    username VARCHAR(60) UNIQUE NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(127),    
    is_admin BOOLEAN,
    PRIMARY KEY (id)
    
  );

CREATE TABLE documents (
    id INT NOT NULL AUTO_INCREMENT,
    document_name VARCHAR(256),
    version_number INT NOT NULL,
    content TEXT,
    uploader_id INT,
    is_accepted BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (uploader_id) REFERENCES users(id) ON DELETE CASCADE
  
  );
  

CREATE TABLE referenced_texts (
    id INT NOT NULL AUTO_INCREMENT,
    referenced_text TEXT,
    document INT,
    PRIMARY KEY (id),
    FOREIGN KEY (document) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE TABLE annotations(
    id INT NOT NULL AUTO_INCREMENT,
    annotation VARCHAR(100),
    user INT,
    document INT,
    referenced_text INT,
    date_created DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (document) REFERENCES documents(id) ON DELETE CASCADE,
    FOREIGN KEY (referenced_text) REFERENCES referenced_texts(id) ON DELETE CASCADE


);



