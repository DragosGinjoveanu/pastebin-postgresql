const pool = require("./database");

function createPaste(author, description) {
  pool.query("INSERT INTO pastes (author, description) VALUES ($1, $2) RETURNING *", [author, description]);
  console.log(author + '\'s paste was introduced in the database');
}

async function pastesList() {
  const result = await pool.query("SELECT pasteId AS id, author AS name, description AS content FROM pastes");
  return result.rows;
}

async function selectPaste(id) {
  const res = await pool.query('SELECT author AS name, description AS content FROM pastes WHERE pasteId = $1', [id]);
  return res.rows[0];
}

function editPaste(author, description, id) {
  pool.query("UPDATE pastes SET author = $1, description = $2 WHERE pasteId = $3", [author, description, id]);
  console.log("Paste ID: " + id + " was edited");
}

function deletePaste(id) {
  pool.query( "DELETE FROM pastes WHERE pasteId = $1", [id]);
  console.log("Paste ID: " + id + " was deleted");
}

module.exports = {createPaste, pastesList, selectPaste, editPaste, deletePaste}; 