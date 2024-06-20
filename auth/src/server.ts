import express from 'express'
import 'express-async-errors';
import userRoute from 'src/routes/userRoute'
import notFoundMiddleware from '@common/middlewares/notFoundMiddleware'
import errorHandlerMiddleware from '@common/middlewares/errorHandlerMiddleware'
import { connectToDb } from '@common/db';
import dotenv from 'dotenv'

// const cors = require('cors');
// const xss = require('xss-clean');
// const rateLimiter = require('express-rate-limit');

dotenv.config()
const port = process.env.PORT ?? 3000
const connectionString = process.env.MONGODB_CONNECTION_STRING ?? ''

const app = express()

app.use(express.json())

app.use('/api/auth/v1/', userRoute)
app.get('/', (req,res) => res.end('auth is working fine!'))


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start =  async () => {
    connectToDb(connectionString).then(() => {
        app.listen(port, () => {
            console.log(`auth service listening on port ${port} http://localhost:${port}/`)
        })
        
    }).catch((error) => console.log("ERROR failed to connect to db with error ", error))
}


start()