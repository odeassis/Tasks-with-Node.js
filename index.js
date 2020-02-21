const express = require('express');

const server = express();
server.use(express.json());

const projects = [];

// Middlewares par verificar se o projeto existe
function checkIdExist(req, res, next) {

  if (!projects[projects.findIndex(proj => proj.id == req.params.id)])
    return res.status(400).json({error: "Projeto nao existe!"})
   
  return next();    
}

// Middlewares retornar quantidade de requisicoes feitas
function countReq(req, res, next){
  console.count('quantidade de requisicoes' );

  return next();
}

server.use(countReq);

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
server.put('/projects/:id', checkIdExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id == id);

  project.title = title;

  return res.json(project);

});

// Rota pra deletar projeto pelo id
server.delete('/projects/:id', checkIdExist, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(proj => proj.id == id);
  projects.slice(projectIndex , 1);

  return res.send( 'Projeto removido!');

});

// Rota pra adicionar uma tarefa
server.post('/projects/:id/tasks', checkIdExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id == id);
  project.tasks.push(title);

  return res.json(project);
});


server.listen(3030);