CREATE DATABASE IF NOT EXISTS saude_mental;
USE saude_mental;

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  cpf CHAR(11) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE psicologos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  crp VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  especialidade VARCHAR(50),
  disponivel BOOLEAN DEFAULT true
);

CREATE TABLE agendamentos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT,
  psicologo_id INT,
  paciente_id INT,
  data_hora DATETIME NOT NULL,
  status ENUM('confirmado', 'reagendado', 'cancelado') DEFAULT 'confirmado',
  FOREIGN KEY (paciente_id) REFERENCES usuarios(id),
  FOREIGN KEY (psicologo_id) REFERENCES psicologos(id)
);