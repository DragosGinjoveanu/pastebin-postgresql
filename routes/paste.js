const express = require('express');
const router = express.Router();
const pool = require("../database");
const queries = require("../queries");
//const { check, validationResult } = require('express-validator');

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

//displays all the pastes
router.get('/pastesList', async function(req, res) {
    var pastes = await queries.pastesList();
    res.render('pastesList', {pastes: pastes});
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