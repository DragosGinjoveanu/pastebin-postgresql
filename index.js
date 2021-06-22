const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const paste = require('./routes/paste');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use('/', paste);