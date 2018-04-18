const route = require('express').Router();
const { check, body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const User = require('../models/user');

const isAuthenticated = function (req, res, next) {
  if (req.session.user)
    res.redirect('/store/dashboard');
  else
    next()
}

//validation|sanitizer for signup
santizeSignup = [
  sanitizeBody('username').trim().escape(),
  sanitizeBody('password').trim().escape(),
  sanitizeBody('password2').trim().escape(),
  body('username', 'enter username between 5-40 characters').isLength({ min: 6, max: 40 }),
  body('password', 'enter password between 5-12 characters').isLength({ min: 6, max: 12 }),
  check('username').isEmail(),
  (req, res, next) => { // check if user already exists
    const errors = validationResult(req).formatWith((e) => e.msg).array(); // validation errors from express validators
    user = User.find({ username: req.body.username }).count().then(count => {
      if (count > 0) {
        errors.push("user already exists")
      }
      req.errors = errors;
      next()
    }).catch(err => {
      res.send("error")
    })
  },
  (req, res, next) => { // check if user passpord is same
    if (req.body.password !== req.body.password2)
      req.errors.push("password not same")
    next()
  }
]

//'/auth/' routes 
route.get('/login', isAuthenticated, (req, res) => {
  res.render('login');
})

route.post('/login', [
  sanitizeBody('username').trim().escape(),
  sanitizeBody('password').trim().escape()
], isAuthenticated, (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (req.body.password !== user.password) {
      res.render('login', {
        username: req.body.username, errors: [
          "password incorrect"
        ]
      });
    }
    else {
      req.session.user = user
      res.redirect('/store/dashboard')
    }
  }).catch(err => {
    console.log(err);
    res.render('login', {
      username: req.body.username, errors: [
        "username incorrect or does not exist"
      ]
    });
  })
})

route.get('/signup', isAuthenticated, (req, res) => {
  res.render('signup');
})

route.post('/signup', santizeSignup, isAuthenticated, (req, res) => {
  if (req.errors.length === 0) {
    new User({...req.body,bag:[]}).save().then((user, err) => {
      if (err === undefined) {
        req.session.user = user
        res.redirect('/store/dashboard');
      }
    }).catch(err => {
      res.send("error")
    })
  }
  else
    res.render('signup', { username: req.body.username, password: "", errors: req.errors });
})

route.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/auth/login');
})

module.exports = route;