const express = require('express');

const server = express();
server.use(express.json());

const projects = [];

// Rota para listar todos os projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
});

// Rota para adicionar um projeto
server.post('/projects', (req, res) => {
  const { id , title } = req.body;

  const project = {
    id,
    title,
    tasks:[]
  };
  
  projects.push(project);
  
  return res.json(projects);

});

// Rota para alterar o titulo de uma tarefa
server.post('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id == id);

  project.title = title;

  return res.json(project);

});

server.listen(3030);