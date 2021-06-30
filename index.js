const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const paste = require('./controller/paste');
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use('/', paste);