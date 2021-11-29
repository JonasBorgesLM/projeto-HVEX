const mysql = require("mysql");
const express = require("express");

function execSQLQuery(sqlQry, res) {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "login",
  });

  connection.query(sqlQry, function (error, results, fields) {
    if (error) res.json(error);
    else res.json(results);
    connection.end();
  });
}

// listar usuarios
function listarUsuarios(req, res) {
  execSQLQuery("SELECT * FROM users;", res);
}

// listar usuario
function listarUsuario(req, res) {
  const email = req.body.Email;
  const password = req.body.Password;

  execSQLQuery(
    `SELECT * FROM users WHERE Email='${email}'  AND Password='${password}'`,
    res
  );
}

// listar usuario por email
function listarUsuarioEmail(req, res) {
  const email = req.body.Email;

  execSQLQuery(`SELECT * FROM users WHERE Email='${email}'`, res);
}

// cadastrar usuario
function cadastrarUsuario(req, res) {
  const email = req.body.Email;
  const password = req.body.Password;

  execSQLQuery(
    `INSERT INTO users(Email, Password) VALUES('${email}','${password}')`,
    res
  );
}

// atualizar usuario
function atualizarUsuario(req, res) {
  const email = req.body.Email;
  const password = req.body.Password;

  execSQLQuery(
    `UPDATE users SET Password='${password}' WHERE Email='${email}'`,
    res
  );
}

// remover usuario passando id
function removerUsuario(req, res) {
  execSQLQuery(
    "DELETE FROM users WHERE ID=" + parseInt(req.params.id),
    res
  );
}

module.exports = {
  removerUsuario,
  atualizarUsuario,
  listarUsuarioEmail,
  cadastrarUsuario,
  listarUsuarios,
  listarUsuario,
};
