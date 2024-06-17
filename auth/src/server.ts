import express from 'express'
import userRoute from './routes/userRoute'
import notFoundMiddleware from '@common/middlewares/notFoundMiddleware'
import errorHandlerMiddleware from '@common/middlewares/errorHandlerMiddleware'
require('express-async-errors');

// const cors = require('cors');
// const xss = require('xss-clean');
// const rateLimiter = require('express-rate-limit');

const port = process.env.PORT ?? 3000

const app = express()

app.use(express.json())

app.use('/api/auth/v1/', userRoute)
app.get('/', (req,res) => res.end('auth is working fine!'))


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


app.listen(port, () => {
    console.log(`auth service listening on port ${port}`)
})