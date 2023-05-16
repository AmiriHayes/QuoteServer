const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const serverless = require('serverless-http')
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors());

// spin up server if connected to database
require('dotenv').config();
port = process.env.PORT || 10000;
mongoose.connect('mongodb+srv://amiri:hb3jHGFPgv989y7h00L@quotes.4xp4tuh.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(port, () => console.log(`DB connected, server listening: port ${port}`)))
  .catch((err) => console.log(err))

// API routes:
app.set('json spaces', 2)
const Quote = require('./models/quote')
const Counter = require('./models/increment')

// get all quotes
router.get('', (req, res) => {
  Quote.find().sort({"id": -1})
    .then((result) => res.json({"quoteList": result}))
    .catch((err) => console.log(err))
});

// post new quote
router.post('/', (req, res) => {
  Counter.findOneAndUpdate(
    {id: "autoval"},
    {"$inc": {"seq": 1}},
    {new: true})
      .then((cd) => {
        let seqId = 1

        if (cd === null) {
          const newval = new Counter({id: "autoval", seq: 1})
          newval.save()
        } else { seqId = cd.seq }
        
        const newQuote = new Quote({...req.body, id: seqId})
        newQuote.save()
          .then((result) => res.send(result))
          .catch((err) => console.log(err))
      })
})

app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app)