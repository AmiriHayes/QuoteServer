const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  origin: { type: String, required: true },
  date: { type: String, required: true },
  color: { type: String, required: true }
}, { timestamps: true })

const Quote = mongoose.model('Quote', quoteSchema)
module.exports = Quote