const Schema  = require('mongoose').Schema
const mongoose = require('mongoose')

const recordSchema = new Schema({
  album: String,
  image: String,
  artist: String,
  price: Number
})

module.exports = mongoose.model('Records', recordSchema)
