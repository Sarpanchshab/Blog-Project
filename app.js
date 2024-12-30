const express = require('express')
const app = express()
const port = 8000
const web = require('./routes/web')
const connectdb = require('./db/connectdb')

//token get for middleware
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash')
//message
app.use(session({
    secret:'secret',
    cookie:{ maxAge: 60000},
    resave: false,
    saveUninitialized: false,
}));
//Flash message
app.use(flash());

//cloudinary
const cloudinary = require('cloudinary')

//file upload
const fileUpload = require('express-fileupload')
//for file upload
app.use(fileUpload({useTempFiles: true}))

// Exclude favicon.ico requests
app.get('/favicon.ico', (req, res) => res.status(204).end());


//database connection
connectdb()

//simple data aayega convert krega json ke format me
//jab interaction hoga tab
app.use(express.urlencoded({extended:false}))

//ejs setup
app.set('view engine','ejs')

//public folder link setup
app.use(express.static('public'))

//router load
app.use('/',web)
  




app.listen(port, () => {
    console.log(`Server Start Localhost: ${port}`)
  })