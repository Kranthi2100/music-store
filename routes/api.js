const route = require('express').Router();
const User = require('../models/user');
const Records = require('../models/music-records');

const checkAuth = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(400);
    res.send('error');
  }
}

route.get('/bag', checkAuth, (req, res) => {
  User.findById(req.session.user._id)
    .then(user => {
      res.status(200);
      res.send({ result: { bag: user.bag } });
    })
    .catch(err => {
      res.status(400);
      res.send('error');
    })
})

route.get('/records', checkAuth, (req, res) => {
  Records.find({})
    .then(records => {
      res.status(200);
      res.send({ result: { records: records } });
    }).catch(err => {
      res.status(400);
      res.send('error');
    })
})


route.get('/add_to_cart/:id', checkAuth, (req, res) => {
  Records.findById(req.params.id).then(record => {
    User.update(
      { _id: req.session.user._id },
      { $push: { bag: record } }
    ).then(user => {
      res.status(200);
      res.send('OK')
    })
  }).catch(err => {
    res.status(400);
    res.send('error');
  })
})

route.get('/delete/:id', checkAuth, (req, res) => {
  Records.findById(req.params.id).then(record => {
    User.update(
      { _id: req.session.user._id },
      { $pull: { bag: record } }
    ).then(user => {
      res.redirect('/store/bag')
    })
  }).catch(err => {
    res.status(400);
    res.send('error');
  })
})

route.get('/deliverItems', checkAuth, (req, res) => {
  Records.findById(req.params.id).then(record => {
    User.update(
      { _id: req.session.user._id },
      { $set: { bag: [] } }
    ).then(user => {
      res.redirect('/store/bag')
    })
  }).catch(err => {
    res.status(400);
    res.send('error');
  })
})

module.exports = route;