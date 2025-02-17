import dotenv from 'dotenv'
dotenv.config()

import connectToDb from './DB/DB.js';
import express from 'express'
// import UserRouter from './routes/user.js'
import cors from 'cors'

const app = express()       // express setup
connectToDb();              // Db connected
app.use(cors())
app.use(express.json())       // set express routers as JSON type data shold accept and retun as JSON format
app.use(express.urlencoded({ extended: true }))  // set express routers as urlencoded type data shold accept and retun as JSON format


// // Dynamic routes to controller
// app.use('/user', UserRouter)

app.get('/', async (req, res) => {
    try {
        res.send('Hello World')
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
})


export default app