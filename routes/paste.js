const express = require('express');
const router = express.Router();
const pool = require("../database");


//"create paste" home page
router.get('/', function(req, res) {
    res.render('createPaste');
});
  
//posts the paste
router.post('/create', async function(req, res) {
    var author = req.body.author;
    var description = req.body.description;
    try {
        if (author.length != 0 && description.length != 0) {
            const paste = await pool.query("INSERT INTO pastes (author, description) VALUES ($1, $2) RETURNING *", [author, description]);
            console.log(author + '\'s paste was introduced in the database');
            res.redirect('http://localhost:3000/pastesList');
        } else {
            res.render('formError', {location: ''});
        }
    } catch (error) {
        console.log(error.message);
    }
});

//gets list of all pastes
router.get('/pastesList', async function(req, res) {
    var authors = [];
    var descriptions = [];
    var ids = [];
    try {
        pool.query("SELECT pasteId AS id, author AS name, description AS content FROM pastes", (err, pastes) => {
            for(var j = 0; j < pastes.rows.length; j++) {
                ids.push(pastes.rows[j].id);
                authors.push(pastes.rows[j].name);
                descriptions.push(pastes.rows[j].content);
            }
            res.render('pastesList', {ids: ids, authors: authors, descriptions: descriptions});
        });
    } catch (error) {
        console.log(error.message);
    }
});

//displays a given paste 
router.get('/pastes/:id', async function(req, res) {
    var id = req.params.id;
    try {
        pool.query('SELECT author AS name, description AS content FROM pastes WHERE pasteId = $1', [id], (error, paste) => {
            if (error) {
              throw error
            }
            res.render('editPaste', {id: id, author: paste.rows[0].name, description: paste.rows[0].content});
        });
    } catch (error) {
        console.log(error.message);
    }
});

//edits paste's content
router.post('/edit/:id', async function(req, res) {
    var id = req.params.id;
    var author = req.body.author;
    var description = req.body.description;
    try {
        if (author.length != 0 && description.length != 0) {
            const paste = await pool.query("UPDATE pastes SET author = $1, description = $2 WHERE pasteId = $3", [author, description, id]);
            res.redirect('http://localhost:3000/pastesList');
        } else {
            res.render('formError', {location: '/pastes/' + id});
        }
    } catch (error) {
        console.log(error.message);
    }
});

//deletes selected paste
router.post('/delete/:id', async function(req, res) {
    var id = req.params.id;
    try {
        const paste = await pool.query( "DELETE FROM pastes WHERE pasteId = $1", [id]);
        console.log("Paste ID: " + id + " was deleted")
        res.redirect('http://localhost:3000/pastesList');
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;