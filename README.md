# PROJETO INTEGRADOR III: DESENVOLVIMENTO DE SISTEMA ORIENTADO A DISPOSITIVOS MÓVEIS E BASEADO NA WEB

## Grupo 31:

- Eduardo Cesar Silva de Avila
- Felipe Dantas do Nascimento 
- Itamar de Jesus Borges Rocha
- Pedro Athayde Alves
- Pedro Spigariol Colbert
- Sônia Gomes Caldas
- Victor de Paula Freitas Simões

## Pré-requisitos:

- Node.js
- MySQL
- Git

## Quickstart:

1. Clonar o repositório: `git clone https://github.com/DadoDuuh/PI-Senac.git`
2. Instalar as dependências no back end: `cd api` > `npm i`
3. Instalar as dependências no front end: `cd site` > `npm i`
4. Configurar o BD: `cd database/scripts` > `mysql -u root -p saude_mental < schema.sql`
5. Iniciar o servidor backend: `cd api/src` > `npm run dev`
6. Iniciar o servidor frontend: `cd site`> `npm start`
7. Acessar: http://localhost:3000

## Nota Destaque:
-Rotas:
 //<Route path="/" />
 //<Route path="/login/usuario" />
 //<Route path="/cadastro" />
 //<Route path="/paginaUsuario" />
 //<Route path="/Agendamentos" />
 (Certificar-se de que tais string sejam colocadas na URL da página)

- O projeto, em sua fase inicial, contempla as funcionalidades de visualização da página inicial (home), login e cadastro, todas integradas à API e com comunicação direta com o banco de dados. As seções de visualização dos psicólogos disponíveis e dos agendamentos realizados, nessa PI, estão mockadas — ou seja, os dados são fixos no código —, mas já representam de forma fiel o fluxo funcional proposto para essas etapas.
