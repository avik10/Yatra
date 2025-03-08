const dotenv = require('dotenv')
dotenv.config()
const connectToDb = require('./DB/DB.js');
const express = require('express')
const UserRouter = require('./routes/user.routes.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const CaptainRouter = require('./routes/captain.routes.js');
const Mapsrouter = require('./routes/maps.routes.js');
const Riderouter = require('./routes/ride.routes.js');

const app = express()       // express setup
connectToDb();              // Db connected
app.use(cors())
app.use(express.json())       // set express routers as JSON type data shold accept and retun as JSON format
app.use(express.urlencoded({ extended: true }))  // set express routers as urlencoded type data shold accept and retun as JSON format
app.use(cookieParser())

// // Dynamic routes to controller
app.use('/users', UserRouter)
app.use('/captain', CaptainRouter)
app.use('/maps', Mapsrouter)
app.use('/rides', Riderouter)

app.get('/', async (req, res) => {
    try {
        res.send('Hello World')
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
})


module.exports = app