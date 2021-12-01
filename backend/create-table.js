const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "login",
});

// Cria a tabela Users
function createTable(conn) {
  const sql =
    "CREATE TABLE IF NOT EXISTS users (\n" +
    "ID int NOT NULL AUTO_INCREMENT,\n" +
    "Email varchar(50) NOT NULL,\n" +
    "Password varchar(30) NOT NULL,\n" +
    "PRIMARY KEY (ID)\n" +
    ");";

  conn.query(sql, function (error, results, fields) {
    if (error) return console.log(error);

    console.log("criou a tabela!");
  });
}

// Adiciona novos usuarios
function addRows(conn) {
  const sql = "INSERT INTO users(Email, Password) VALUES ?";
  const values = [
    ["Antonio@email.com", "12345678901"],
    ["Paulo@email.com", "09876543210"],
    ["Ricardo@email.com", "12312312399"],
  ];
  conn.query(sql, [values], function (error, results, fields) {
    if (error) return console.log(error);
    console.log("adicionou registros!");
    conn.end();
  });
}

connection.connect(function (err) {
  if (err) return console.log(err);
  console.log("conectou!");
  createTable(connection);
  addRows(connection);
});
