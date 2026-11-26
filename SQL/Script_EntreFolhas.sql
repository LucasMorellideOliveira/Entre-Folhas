CREATE DATABASE entre_folhas;
USE entre_folhas;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
senha VARCHAR(200) NOT NULL,
data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(45) NOT NULL,
descricao VARCHAR(500) NOT NULL,
local_registro VARCHAR(45) NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
clima VARCHAR(45) NOT NULL CONSTRAINT chkClima CHECK (clima IN ('Ensolarado', 'Nublado', 'Chuvoso')),
humor_antes TINYINT NOT NULL CONSTRAINT chkHumorAntes CHECK (humor_antes BETWEEN 1 AND 5),
humor_depois TINYINT NOT NULL CONSTRAINT chkHumorDepois CHECK (humor_depois BETWEEN 1 AND 5),
foto VARCHAR(255),
fkUsuario INT NOT NULL,
CONSTRAINT fkUsuario FOREIGN KEY (fkUsuario)
REFERENCES usuario(idUsuario)
);

CREATE TABLE categoria (
idCategoria INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL UNIQUE
);

INSERT INTO categoria (nome) VALUES
('Fauna'), ('Flora'), ('Paisagem'), ('Clima'), ('Água');

CREATE TABLE registro_categoria (
fkRegistro INT,
fkCategoria INT,
CONSTRAINT pkRegistroCategoria PRIMARY KEY (fkRegistro, fkCategoria),
CONSTRAINT fkRegistro FOREIGN KEY (fkRegistro)
REFERENCES registro(idRegistro),
CONSTRAINT fkCategoria FOREIGN KEY (fkCategoria)
REFERENCES categoria(idCategoria)
);