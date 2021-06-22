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
    if (author.length != 0 && description.length != 0) {
        try {
        const paste = await pool.query("INSERT INTO pastes VALUES $1, $2" [author, description]);
        res.json(paste);
        } catch (error) {
        console.log(error.message);
        }
        console.log(author + '\'s paste was introduced in the database');
        //res.redirect('http://localhost:3000/pastesList');
    } else {
        res.render('formError');
    } 
});

//get all pastes
router.get('/pastesList', async function(req, res) {
    var authors = [];
    var descriptions = [];
    try {
        const pasteList = await pool.query("SELECT * FROM pastes");
        res.json(pasteList);
    } catch (error) {
        console.log(error.message);
    }
    //res.render('pastesList', { authors: authors, descriptions: descriptions});
});

//get 1 paste
router.get('/pastes/:id', async function(req, res) {
    var id = req.params.id;
    try {
        const pasteList = await pool.query("SELECT * FROM pastes WHERE pasteId = $1", [id]);
        res.json(pasteList);
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