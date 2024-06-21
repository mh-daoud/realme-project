import express from 'express'
require('express-async-errors');
import notFoundMiddleware from '@common/middlewares/notFoundMiddleware'
import errorHandlerMiddleware from '@common/middlewares/errorHandlerMiddleware'
import dotenv from 'dotenv'
import { connectToDb } from '@common/db';
import {authenticationMiddleware} from '@common/middlewares/authenticationMiddleware'
import mediaRouter from 'src/routes/mediaRoute'

dotenv.config()
const port =  process.env?.PORT ?  parseInt(process.env?.PORT) : 3000;
const connectionString = process.env.MONGODB_CONNECTION_STRING ?? ''

const app = express()

app.use(express.json({limit: '200mb'}))

app.use('/api/media/v1/', authenticationMiddleware, mediaRouter)
app.get('/', (req, res) => res.end('media is working fine!'))
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = () => {
    connectToDb(connectionString).then(() => {
        app.listen(port, () => {
            console.log(` media server running at ${port} http://localhost:${port}/`);
        });
    })
    .catch((error) => console.log("ERROR failed to connect to db with error ", error))
}

start()



