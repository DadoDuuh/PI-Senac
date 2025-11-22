DROP DATABASE IF EXISTS saude_mental;
CREATE DATABASE IF NOT EXISTS saude_mental;
USE saude_mental;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email varchar(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('paciente', 'psicologo') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pacientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT UNIQUE NOT NULL,
  nome VARCHAR(100) NOT NULL,
  cpf CHAR(11) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE psicologos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT UNIQUE NOT NULL,
  nome VARCHAR(100) NOT NULL,
  crp VARCHAR(20) UNIQUE NOT NULL,
  especialidade VARCHAR(50),
  disponivel BOOLEAN DEFAULT true,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE agendamentos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  paciente_id INT NOT NULL,
  psicologo_id INT NOT NULL,
  data_hora DATETIME NOT NULL,
  status ENUM('confirmado', 'reagendado', 'cancelado') DEFAULT 'confirmado',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
  FOREIGN KEY (psicologo_id) REFERENCES psicologos(id) ON DELETE CASCADE
);