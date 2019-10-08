const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));

app.use(express.static('public'));

app.listen(3000, () => console.log('Listneing on 3000!'));
