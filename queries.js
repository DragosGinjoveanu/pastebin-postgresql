const pool = require("./database");

function createPaste(author, description) {
    const paste = pool.query("INSERT INTO pastes (author, description) VALUES ($1, $2) RETURNING *", [author, description]);
    console.log(author + '\'s paste was introduced in the database');
}

//need help
async function pastesList() {
    var authors = [];
    var descriptions = [];
    var ids = [];
    try {
        const result = await pool.query("SELECT pasteId AS id, author AS name, description AS content FROM pastes");
        return result.rows;
      } catch (err) {
        return console.log(err.message);
      }
}

async function selectPaste(id) {
    try {
        const res = await pool.query('SELECT author AS name, description AS content FROM pastes WHERE pasteId = $1', [id]);
        return res.rows[0];
      } catch (err){
        return err.stack;
      }
}

function editPaste(author, description, id) {
    const paste = pool.query("UPDATE pastes SET author = $1, description = $2 WHERE pasteId = $3", [author, description, id]);
    console.log("Paste ID: " + id + " was edited");
}

function deletePaste(id) {
    const paste = pool.query( "DELETE FROM pastes WHERE pasteId = $1", [id]);
    console.log("Paste ID: " + id + " was deleted");
}

module.exports = {createPaste, pastesList, selectPaste, editPaste, deletePaste}; 