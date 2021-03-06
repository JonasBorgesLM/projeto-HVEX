const express = require("express");

const cors = require("cors");

const {
  removerUsuario,
  atualizarUsuario,
  listarUsuarioID,
  cadastrarUsuario,
  listarUsuarios,
  listarUsuario,
} = require("./controllers/gerenciador-tarefas");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// listar todos usuarios
app.get("/login-users", listarUsuarios);

// listar usuario por email e senha
app.post("/login-user", listarUsuario);

// listar usuario por id
app.post("/login-user-id/:id", listarUsuarioID);

// cadastrar usuario
app.post("/register-user", cadastrarUsuario);

// atualizar usuario
app.put("/update-user", atualizarUsuario);

// remover usuario
app.delete("/remove-user/:id", removerUsuario);

app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));
