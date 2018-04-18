const Schema  = require('mongoose').Schema
const mongoose = require('mongoose')

const userSchema = Schema({
  username: {
    type:String,
    unique: true,
    max: 40,
    validate:{
      validator:(username) => {
        return username.length <= 40
      },
      msg: 'username larger then 12 characters'
    },
    required: true
  }, 
  password:{
    type: String,
    min: 6,
    max: 12,
    validate: {
      validator:(password) => {
        return 6 <= password.length && password.length <= 12 
      },
      msg: 'password should me more then 5 characters and less then 13'
    },
    required: true
  },
  bag: Array
})

module.exports = mongoose.model('Users', userSchema)
