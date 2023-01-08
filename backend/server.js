require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
//express app
const app = express()

//middleware
app.use(express.json()) //it will get the body (POST req.body)
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

//routes

app.use('/api/workouts',workoutRoutes)
// app.get('/', (req, res) => {
//     res.json({mssg: 'Welcome to the app'})
// })
//DB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) =>{
        console.log(error)
    })
    