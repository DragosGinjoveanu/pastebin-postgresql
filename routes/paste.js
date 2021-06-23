const express = require('express');
const router = express.Router();
const pool = require("../database");


//"create paste" page form
router.get('/', function(req, res) {
    res.render('createPaste');
});
  
//post paste
router.post('/create', async function(req, res) {
    var author = req.body.author;
    var description = req.body.description;
    try {
        const paste = await pool.query("INSERT INTO pastes (author, description) VALUES ($1, $2) RETURNING *", [author, description]);
        console.log(author + '\'s paste was introduced in the database');
    } catch (error) {
        console.log(error.message);
    }
    res.redirect('http://localhost:3000/pastesList');
});

//get all pastes
router.get('/pastesList', async function(req, res) {
    var authors = [];
    var descriptions = [];
    try {
        pool.query("SELECT (author, description) FROM pastes", (err, response) => {
            var pastes = response;
            console.log(pastes.rows)
            //res.render('pastesList', {pastes: {pastes}});
            pool.end();
        });
    } catch (error) {
        console.log(error.message);
    }
});

//get 1 paste
router.get('/pastes/:id', async function(req, res) {
    var id = req.params.id;
    try {
        pool.query('SELECT * FROM pastes WHERE pasteId = $1', [id], (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).json(results.rows);
        });
    } catch (error) {
        console.log(error.message);
    }
});

//edit paste
router.put('/pastes/:id', async function(req, res) {
    var id = req.params.id;
    var author = req.body.author;
    var description = req.body.description;
    try {
        const paste = await pool.query("UPDATE author, description SET $1, $2 FROM pastes WHERE pasteId = $3", [author, description, id]);
        res.json(paste);
        //res.redirect('http://localhost:3000/pastesList');
    } catch (error) {
        console.log(error.message);
    }
});

//delete paste
router.delete('/pastes/:id', async function(req, res) {
    var id = req.params.id;
    try {
        const paste = await pool.query( "DELETE FROM pastes WHERE pasteId = $1", [id]);
        res.json(paste);
        //res.redirect('http://localhost:3000/pastesList');
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;