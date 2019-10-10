const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mediaController = require('./controllers/mediaController');

app.use('/public', express.static('public'));

app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));

app.post('/postmedia*', mediaController.postMedia, (req, res) => {
  console.log('Media added to database');
});

app.get('/getmedia*', mediaController.getMedia, (req, res) => {
  res.send(res.locals.feedData)
})

// app.all('/clearfeed', mediaController.clearFeed, (req, res) => {
//   res.redirect('/');
// })

app.post('/setaswatched', mediaController.setAsWatched, (req, res) => {
  console.log('working')
})

app.all('*', (req, res) => {
  res.status(404).send('ERROR Hi')
})

app.use((err, req, res, next) => {
  if (err) console.log(err, 'ERROR')
  console.log('Express Error Handler Caught Unkown Error Middleware')
})

app.listen(3000, () => console.log('Listneing on 3000!'));
