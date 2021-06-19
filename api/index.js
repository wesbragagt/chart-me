import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

//Set up default mongoose connection 'mongodb://username:password@host:port/database'
const mongoDB = process.env.DB_ADDRESS || 'mongodb://db:27017/test';
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

app.get('/health', (req,res)=>{
    res.send({health: 'ok'})
})

app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})