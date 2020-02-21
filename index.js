const express = require('express');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  return res.json({message : "Hello Word!"});
});

server.listen(3030);