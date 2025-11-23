# PROJETO INTEGRADOR III: DESENVOLVIMENTO DE SISTEMA ORIENTADO A DISPOSITIVOS MÓVEIS E BASEADO NA WEB

## Grupo 31:

- Eduardo Cesar S.
- Pedro Athayde A.
- Pedro Spigariol C.
- Sônia C.
- Victor de Paula S.

## Pré-requisitos:

- Node.js
- MySQL
- Git

## Quickstart:

1. Clonar o repositório: `git clone https://github.com/DadoDuuh/PI-Senac.git`
2. Instalar as dependências no back end: `cd api` > `npm i`
3. Instalar as dependências no front end: `cd site` > `npm i`
4. Configurar o BD: `cd db` > `mysql -u root -p saude_mental < ddl.sql`
5. Iniciar o servidor backend: `cd api` > `npm run dev`
6. Iniciar o servidor frontend: `cd site`> `npm start`
7. Acessar: http://localhost:3000

## Nota Destaque:
-Rotas: </br>
 path="/" /> </br>
 path="/login" /> </br>
 path="/cadastro" /> </br>
 path="/busca" /> </br>
 path="/conta/paciente" /> </br>
path="/conta/paciente" /> </br>

 (Certificar-se de que tais string sejam colocadas na URL da página)

- O projeto, em sua fase inicial, contempla as funcionalidades de visualização da página inicial (home), login e cadastro, todas integradas à API e com comunicação direta com o banco de dados. As seções de visualização dos psicólogos disponíveis e dos agendamentos realizados apresentam dados mockados do schema (fixos no código), mas as funcionalidades de agendamento, em conexão com o banco, já estão disponíveis (fluxo funcional).
