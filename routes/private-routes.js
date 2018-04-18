const route = require('express').Router();
const Records = require('../models/music-records');
const User = require('../models/user');

const isNotAuthenticated = function (req, res, next) {
  if (!req.session.user)
    res.redirect('/auth/login');
  else
    next()
}

route.get('/dashboard', isNotAuthenticated, (req, res) => {
  User.findById(req.session.user._id).then(user => {
    Records.find({}, (err, records) => {
      // without JSON.stringify PUG raises parse error 
      res.render('dashboard', { records: records, bag: JSON.stringify(user.bag)});
    });
  })
})

route.get('/bag', isNotAuthenticated, (req, res) => {
  User.findById(req.session.user._id).then(user => {
    res.render('checkout', { bag: user.bag });
  }).catch(err => {
    res.send("error")
  })
})

module.exports = route;