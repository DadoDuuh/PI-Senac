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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
  status ENUM('pendente', 'confirmado', 'reagendado', 'cancelado') DEFAULT 'pendente',
  link_atendimento VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
  FOREIGN KEY (psicologo_id) REFERENCES psicologos(id) ON DELETE CASCADE
);

CREATE TABLE anotacoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  paciente_id INT NOT NULL,
  psicologo_id INT NOT NULL,
  consulta_id INT NOT NULL,
  descricao VARCHAR(1000),
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
  FOREIGN KEY (psicologo_id) REFERENCES psicologos(id) ON DELETE CASCADE,
  FOREIGN KEY (consulta_id) REFERENCES agendamentos(id) ON DELETE CASCADE
);

CREATE TABLE chat(
id	 INT PRIMARY KEY AUTO_INCREMENT,
paciente_id 	 INT,
psicologo_id INT,

FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
FOREIGN KEY (psicologo_id) REFERENCES psicologos(id)
ON DELETE CASCADE
);

CREATE TABLE mensagem(
id 	INT PRIMARY KEY AUTO_INCREMENT,
sender ENUM('paciente', 'psicologo')	NOT NULL,
chat_id			INT,
mensagem		VARCHAR(200),

FOREIGN KEY (chat_id) REFERENCES chat (id)
);

-- DADOS MOCKADOS PARA TESTES

-- Inserir usuários para os psicólogos (senha: "senha123")
INSERT INTO usuarios (email, senha, tipo) VALUES
    ('ana.silva@psicoacolher.com', '$2b$10$zgHdDRYpxOwjC8KxIW.M6eU.1xahreuClDk8E9hW0uCa3nwxfd9SS', 'psicologo'),
    ('carlos.mendes@psicoacolher.com', '$2b$10$zgHdDRYpxOwjC8KxIW.M6eU.1xahreuClDk8E9hW0uCa3nwxfd9SS', 'psicologo'),
    ('mariana.oliveira@psicoacolher.com', '$2b$10$zgHdDRYpxOwjC8KxIW.M6eU.1xahreuClDk8E9hW0uCa3nwxfd9SS', 'psicologo'),
    ('rafael.costa@psicoacolher.com', '$2b$10$zgHdDRYpxOwjC8KxIW.M6eU.1xahreuClDk8E9hW0uCa3nwxfd9SS', 'psicologo');

-- Inserir psicólogos
INSERT INTO psicologos (usuario_id, nome, crp, especialidade, disponivel) VALUES
    (1, 'Dra. Ana Silva', 'CRP-06/123456', 'Ansiedade e Depressão', TRUE),
    (2, 'Dr. Carlos Mendes', 'CRP-06/234567', 'TCC', TRUE),
    (3, 'Dra. Mariana Oliveira', 'CRP-06/345678', 'Infantil', TRUE),
    (4, 'Dr. Rafael Costa', 'CRP-06/456789', 'Casais e Família', TRUE);

-- Inserir usuários para os pacientes (senha: "senha123")
INSERT INTO usuarios (email, senha, tipo) VALUES
    ('fulano.silva@email.com', '$2b$10$zgHdDRYpxOwjC8KxIW.M6eU.1xahreuClDk8E9hW0uCa3nwxfd9SS', 'paciente'),
    ('sicrano.beltrano@email.com', '$2b$10$zgHdDRYpxOwjC8KxIW.M6eU.1xahreuClDk8E9hW0uCa3nwxfd9SS', 'paciente'),
    ('maria.souza@email.com', '$2b$10$zgHdDRYpxOwjC8KxIW.M6eU.1xahreuClDk8E9hW0uCa3nwxfd9SS', 'paciente'),
    ('joao.ferreira@email.com', '$2b$10$zgHdDRYpxOwjC8KxIW.M6eU.1xahreuClDk8E9hW0uCa3nwxfd9SS', 'paciente');

-- Inserir pacientes
INSERT INTO pacientes (usuario_id, nome, cpf, telefone) VALUES
    (5, 'Fulano da Silva', '11111111111', '11911111111'),
    (6, 'Sicrano Beltrano', '22222222222', '11922222222'),
    (7, 'Maria Souza', '33333333333', '11933333333'),
    (8, 'João Ferreira', '44444444444', '11944444444');

-- Agendamentos do Fulano da Silva (paciente_id = 1)
INSERT INTO agendamentos (paciente_id, psicologo_id, data_hora, status, link_atendimento) VALUES
    (1, 1, '2025-12-15 14:00:00', 'pendente', NULL); -- Dra. Ana Silva - aguardando confirmação

-- Agendamentos do Sicrano Beltrano (paciente_id = 2)
INSERT INTO agendamentos (paciente_id, psicologo_id, data_hora, status, link_atendimento) VALUES
    (2, 2, '2025-12-16 15:00:00', 'pendente', NULL); -- Dr. Carlos Mendes - aguardando confirmação

-- Agendamentos da Maria Souza (paciente_id = 3)
INSERT INTO agendamentos (paciente_id, psicologo_id, data_hora, status, link_atendimento) VALUES
    (3, 3, '2023-03-28 10:00:00', 'confirmado', 'https://meet.google.com/abc-defg-hij'); -- Dra. Mariana - finalizada

-- Agendamentos do João Ferreira (paciente_id = 4)
INSERT INTO agendamentos (paciente_id, psicologo_id, data_hora, status, link_atendimento) VALUES
    (4, 4, '2023-03-10 09:00:00', 'confirmado', NULL); -- Dr. Rafael - finalizada (presencial)
