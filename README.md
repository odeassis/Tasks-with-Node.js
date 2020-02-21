<h3 align="center">
  Desafio 1: Conceitos do NodeJS
</h3>

<p align="center">“Se você quiser fazer uma torta de maçã do nada, primeiro tem que inventar o universo”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-01?color=%2304D361">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/fdAssis/desafio-01/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/fdAssis/desafio-01?style=social">
  </a>
</p>

<p align="center">
  <a href="#pushpin-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :pushpin: Sobre o desafio

Crie uma aplicação para armazenar projetos e suas tarefas do zero utilizando [Express](https://expressjs.com/pt-br/).

### Rotas

- [x] `POST /projects`: A rota deve receber `id` e `title` dentro do corpo e cadastrar um novo projeto dentro de um array no seguinte formato: `{ id: "1", title: 'Novo projeto', tasks: [] }`; Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.

```js
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
```

- [x] `GET /projects`: Rota que lista todos projetos e suas tarefas;

```js
server.get('/projects', (req, res) => {
  return res.json(projects);
});
```

- [x] `PUT /projects/:id`: A rota deve alterar apenas o título do projeto com o `id` presente nos parâmetros da rota;

```js
server.put('/projects/:id', checkIdExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id == id);

  project.title = title;

  return res.json(project);
});
```

- [x] `DELETE /projects/:id`: A rota deve deletar o projeto com o `id` presente nos parâmetros da rota;

```js
server.delete('/projects/:id', checkIdExist, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(proj => proj.id == id);
  projects.slice(projectIndex , 1);

  return res.send( 'Projeto removido!');
});

```

- [x] `POST /projects/:id/tasks`: A rota deve receber um campo `title` e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do `id` presente nos parâmetros da rota;
```js
server.post('/projects/:id/tasks', checkIdExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id == id);
  project.tasks.push(title);

  return res.json(project);
});
```

### Exemplo

Se eu chamar a rota `POST /projects` repassando `{ id: 1, title: 'Novo projeto' }` e a rota `POST /projects/1/tasks` com `{ title: 'Nova tarefa' }`, meu array de projetos deve ficar assim:

```js
[
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];
```

### Middlewares

- [x] Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL que verifica se o projeto com aquele ID existe. Se não existir retorne um erro, caso contrário permita a requisição continuar normalmente;

```js
function checkIdExist(req, res, next) {

  if (!projects[projects.findIndex(proj => proj.id == req.params.id)])
    return res.status(400).json({error: "Projeto nao existe!"})
   
  return next();    
}
```

- [x] Crie um middleware global chamado em todas requisições que imprime (`console.log`) uma contagem de quantas requisições foram feitas na aplicação até então;

```js
function countReq(req, res, next){
  console.count('quantidade de requisicoes' );

  return next();
}

server.use(countReq);
```

## :memo: Licença

Esse projeto está sob a licença MIT.

---