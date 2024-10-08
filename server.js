if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//Requires:
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//Routers:
const indexRouter = require('./routes/index')

//Config App:
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.set('view options', { layout: false });
app.use(expressLayouts)
app.use(express.static('public'))

//Database:
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("DataBase Connected!!!"))


//Routers Config:
app.use('/', indexRouter)

//Hosting:
app.listen(process.env.PORT || 3000)