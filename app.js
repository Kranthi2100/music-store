const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const bp = require('body-parser');
const cookieSession = require('cookie-session')

const privateRoute = require('./routes/private-routes');
const publicRoute = require('./routes/public-routes');
const apiRoute = require('./routes/api');

const app = express();

const mongoURL = 'mongodb://admin:musicguru@ds239439.mlab.com:39439/music_store';
mongoose.connect(mongoURL);


app.set('view engine', 'pug');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ["jsdhfkshddskdsf"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use('/auth', publicRoute);
app.use('/store', privateRoute);
app.use('/api', apiRoute);


app.listen(3001, () => {
  console.log('server is now running!');
})