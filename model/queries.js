const pool = require("./database");

async function createPaste(author, description) {
  await pool.query("INSERT INTO pastes (author, description) VALUES ($1, $2) RETURNING *", [author, description]);
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

async function editPaste(author, description, id) {
  await pool.query("UPDATE pastes SET author = $1, description = $2 WHERE pasteId = $3", [author, description, id]);
  console.log("Paste ID: " + id + " was edited");
}

async function deletePaste(id) {
  await pool.query( "DELETE FROM pastes WHERE pasteId = $1", [id]);
  console.log("Paste ID: " + id + " was deleted");
}

module.exports = {createPaste, pastesList, selectPaste, editPaste, deletePaste}; 