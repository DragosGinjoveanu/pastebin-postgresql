const express = require('express');
const router = express.Router();
const pool = require("../database");
const queries = require("../queries");

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
            queries.createPaste(author, description);
            res.redirect('http://localhost:3000/pastesList');
        } else {
            res.render('formError', {location: ''});
        }
    } catch (error) {
        console.log(error.message);
    }
});

//need to solve the "undefined pastes" bug
router.get('/pastesList', async function(req, res) {
    var authors = [];
    var descriptions = [];
    var ids = [];
    try {
        pool.query("SELECT pasteId AS id, author AS name, description AS content FROM pastes", (err, pastes) => {
            for (var j = 0; j < pastes.rows.length; j++) {
                ids.push(pastes.rows[j].id);
                authors.push(pastes.rows[j].name);
                descriptions.push(pastes.rows[j].content);
            }
            var pastes = {ids, authors, descriptions};
            res.render('pastesList', {pastes: pastes});
        });
    } catch (error) {
        console.log(error.message);
    }
});

//displays a given paste 
router.get('/pastes/:id', async function(req, res) {
    var id = req.params.id;
    var paste = await queries.selectPaste(id);
    res.render('editPaste', {paste: paste, id: id});
});

//edits paste's content
router.post('/edit/:id', async function(req, res) {
    var id = req.params.id;
    var author = req.body.author;
    var description = req.body.description;
    try {
        if (author.length != 0 && description.length != 0) {
            queries.editPaste(author, description, id);
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
        queries.deletePaste(id);
        res.redirect('http://localhost:3000/pastesList');
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;