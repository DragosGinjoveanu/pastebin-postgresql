const pool = require("./database");

function createPaste(author, description) {
    const paste = pool.query("INSERT INTO pastes (author, description) VALUES ($1, $2) RETURNING *", [author, description]);
    console.log(author + '\'s paste was introduced in the database');
}

async function pastesList() {
    var authors = [];
    var descriptions = [];
    var ids = [];
    try {
        const result = await pool.query("SELECT pasteId AS id, author AS name, description AS content FROM pastes", (err, pastes) => {
            for (var j = 0; j < pastes.rows.length; j++) {
                ids.push(pastes.rows[j].id);
                authors.push(pastes.rows[j].name);
                descriptions.push(pastes.rows[j].content);
            }
            var result = {
                authors,
                descriptions,
                ids
            };
            console.log(result);
            return result;
        });
      } catch (err) {
        return console.log(err.message);
      }
}

function selectPaste(id) {
    pool.query('SELECT author AS name, description AS content FROM pastes WHERE pasteId = $1', [id], (error, paste) => {
        if (error) {
          throw error
        }
        var paste = {
            id: id,
            author: paste.rows[0].name,
            description: paste.rows[0].content
        }
        console.log(paste);
    });
}

function editPaste(author, description, id) {
    const paste = pool.query("UPDATE pastes SET author = $1, description = $2 WHERE pasteId = $3", [author, description, id]);
}

function deletePaste(id) {
    const paste = pool.query( "DELETE FROM pastes WHERE pasteId = $1", [id]);
    console.log("Paste ID: " + id + " was deleted");
}

module.exports = {createPaste, pastesList, selectPaste, editPaste, deletePaste}; 