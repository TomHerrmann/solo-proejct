const express = require('express');
let app = express();

app.get('/', (req, res) => res.send('THE BACKENED IS WORKING'));

app.use(express.static('public'));

app.listen(3000, () => console.log('Listneing on 3000!'));
