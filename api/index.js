const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

dotenv.config()

//Set up default mongoose connection 'mongodb://username:password@host:port/database'
const mongoDB = process.env.MONGO_URL || 'mongodb://db:27017/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', ()=>{
    console.log('Connected to database instance')
})

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())

app.get('/health', (req,res)=>{
    res.send({health: 'ok'})
})

const SectionSchema = new mongoose.Schema({
    value: String,
    label: String,
    id: String
})

const ChartSchema = new mongoose.Schema({
    userId: String,
    title: String,
    key: String,
    bpm: Number,
    sections: [SectionSchema]
})

const Chart = mongoose.model('Chart',ChartSchema)
app.get('/charts', async (req,res)=>{
  try {
    const data = await Chart.find().exec()
    res.send(data)
  } catch (error) {
    console.error(error)
    res.statusMessage = error.message
    res.status(400)
  }
})

app.get('/charts/:userId', async (req,res) => {
    if(!req.params.userId){
        res.status(401)
    }
    const {userId} = req.params
    try {
    const charts = await Chart.find().where('userId').equals(userId).exec()
    res.send(charts)
    } catch (error) {
        console.error(error)
        res.statusMessage = error.message
        res.status(400)
    }
})
app.put('/chart', async (req,res) => {
    if(!req.body){
        res.statusMessage = 'Update body not provided.'
        res.sendStatus(400)
    }
    const {data} = req.body
    try {
       await Chart.findByIdAndUpdate(data._id, data)
       res.sendStatus(204)
    } catch (error) {
        console.error(error)
        res.statusMessage = error.message
        res.status(400) 
    }
})
app.post('/chart', async (req,res)=>{
    const {data} = req.body
    try {
        await Chart.create(data)
        res.send(data)
    } catch (error) {
        console.error(error)
        res.statusMessage = error.message
        res.status(400)
    }
})

app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})