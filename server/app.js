const express = require('express')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const logger = require('morgan')

const app = express()


// Set up the user authentication and routing
const User = require('./models/user')
// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// use sessions
app.use(session({
    secret: "these are not the droids you're looking for",
}))

// Initialize Passport and connect it into the Express pipeline
app.use(passport.initialize())
// Connect Passport to the session
app.use(passport.session())

// Use express-acl
// const acl = require('express-acl')
// acl.config({
//     filename: 'acl.yml',
//     defaultRole: 'guest',
//     denyCallback: (res) => {
//         return res.status(403).json({
//             status: 'Access Denied',
//             success: false,
//             message: 'You are not authorized to access this resource'
//         })
//     }
// })
// app.use(acl.authorize)

// Connect to mongodb
mongoose.connect('mongodb://localhost/music-library', {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log('Error connecting to database', err)
    } else {
        console.log('Connected to database!')
    }
})

// Parse application/json
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())

// Use CORS to allow the client to be at a different origin to the server
// Without this, the browser would block requests.
app.use('/api/', cors())

// Log routing requests
app.use(logger('dev'))
// Use the userRouter for user routes
let userRouter = require('./routes/userRoutes')
app.use('/users', userRouter)

// End user authentication/authorization and routing setup



// Bring in the artist model
let Artist = require('./models/artistModel')
// Use the artistRouter for artist routes
let artistRouter = require('./routes/artistRoutes')(Artist)
app.use('/api/artists', artistRouter)



// Send basic welcome message for root route
app.get('/', function (req, res) {
    res.send('Welcome to the music library API')
})
// Start the app on the configured port (or default port)
const port = process.env.PORT || 3001
app.listen(port, function () {
    console.log(`App is running on port ${port}`)
})

module.exports = app