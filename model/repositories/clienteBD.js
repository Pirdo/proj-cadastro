const clienteBD = require("./db.js");


async function selectCliente() {
  const conn = await clienteBD.connect();
  const [rows] = await conn.query("SELECT * FROM cliente;");
  return rows;
}

async function getClienteId(id) {
  const conn = await clienteBD.connect();
  const sql = "SELECT * FROM cliente WHERE id =?";
  const values = [id];
  const [rows] = await conn.query(sql, values);
  if (rows.length > 0) return rows[0];
  else return null;
}

async function insertCliente(nome, sobrenome) {
  const conn = await clienteBD.connect();
  const sql = "INSERT INTO cliente(nome, sobrenome) VALUES (?,?);";
  const values = [nome, sobrenome];
  return await conn.query(sql, values);
}

async function deleteCliente(id) {
  const conn = await clienteBD.connect();
  const sql = "DELETE FROM cliente where id=?;";
  return await conn.query(sql, [id]);
}

async function updateCliente(cliente) {
  const conn = await clienteBD.connect();
  const sql = "UPDATE cliente SET nome=?, sobrenome=? WHERE id=?";
  const values = [cliente.nome, cliente.sobrenome, cliente.id];
  return await conn.query(sql, values);
}

module.exports = {
  selectCliente,
  insertCliente,
  deleteCliente,
  updateCliente,
  getClienteId
};