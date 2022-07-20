//IMPORTS
require('dotenv').config()
const express = require('express')
const session = require('express-session')


const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

//APP INSTANCE CREATED
const app = express()


//TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

app.use(express.static(__dirname + '/../build'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '.../build/index.html'))
})



//DATABASE CONNECTION
// massive({
//     connectionString: CONNECTION_STRING,
//     ssl: {rejectUnauthorized: false}
// })
// .then(db => {
//     app.set('db', db)
//     console.log('Database Connected')
// })
// .catch((err) => {console.log(err)}) 

app.listen(SERVER_PORT, () => {console.log(`Server connected on port ${SERVER_PORT}.`)})