async function connect() {
  //confirma se está conectado com a variavel global
  if (global.connection && global.connection.state != "disconnected") {
    return global.connection;
  }
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "789888999",
    database: "agendamentos",
  });
  console.log("conectou no MySQL");
  global.connection = connection;
  return connection;
}
module.exports = { connect };
