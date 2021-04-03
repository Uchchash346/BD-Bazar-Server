const express = require('express')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port =  5000
app.use(bodyParser.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qg1a4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventCollection = client.db("foodbazar").collection("newfood");
  // root directory for server
  app.get('/', (req, res) => {
    res.send('Welcome from volunteer network server!')
  })
  //add product
  app.post('/addProduct', (req, res) => {
    const event = req.body;
    eventCollection.insertOne(event)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
  //new registration 
  app.post('/registeredProduct', (req, res) => {
    const volRegisterData = req.body;
    volRegisterCollection.insertOne(volRegisterData)
      .then(result => {
        res.send(result.insertedCount > 0);
      })
  })
  // event get
  app.get('/products', (req, res) => {
    eventCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  }) 
  // all registered product 
  app.get('/allRegProducts', (req, res) => {
    volRegisterCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })
  app.delete('/deleteRegisteredProduct/:id', (req, res) => {
    eventCollection.deleteOne({_id: ObjectId(req.params.id) })
    
      .then(result => {
        res.send(result.deletedCount > 0);
      })
  })
  
});
app.listen(process.env.PORT || port)
