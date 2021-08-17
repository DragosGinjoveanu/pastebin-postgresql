const express = require('express');
const router = express.Router();
const queries = require('../model/queries');
const { body, validationResult } = require('express-validator');

//"create paste" home page
router.get('/', function(req, res) {
    res.render('createPaste');
});

//posts the paste
router.post('/create', body('author').isLength({ min: 1 }), body('description').isLength({ min: 1 }), async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('formError', {location: ''});
    } else {
        try {
            const author = req.body.author;
            const description = req.body.description;
            queries.createPaste(author, description);
            res.redirect('http://localhost:3000/pastesList');
        } catch (error) {
            console.log(error.message);
        }
    }
});

//displays all the pastes
router.get('/pastesList', async function(req, res) {
    const pastes = await queries.pastesList();
    res.render('pastesList', {pastes: pastes});
});

//displays a given paste 
router.get('/pastes/:id', async function(req, res) {
    const id = req.params.id;
    const paste = await queries.selectPaste(id);
    res.render('editPaste', {paste: paste, id: id});
});

//edits paste's content
router.post('/edit/:id', body('author').isLength({ min: 1 }), body('description').isLength({ min: 1 }), async function(req, res) {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('formError', {location: '/pastes/' + id});
    } else {
        try {
            const author = req.body.author;
            const description = req.body.description;
            queries.editPaste(author, description, id);
            res.redirect('http://localhost:3000/pastesList');
        } catch (error) {
            console.log(error.message);
        }
    }
});

//deletes selected paste
router.post('/delete/:id', async function(req, res) {
    const id = req.params.id;
    try {
        queries.deletePaste(id);
        res.redirect('http://localhost:3000/pastesList');
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;