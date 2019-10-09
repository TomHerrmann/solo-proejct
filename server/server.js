const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use('/public', express.static('public'));

app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));

app.get('/search', (req, res) => {});

app.listen(3000, () => console.log('Listneing on 3000!'));
