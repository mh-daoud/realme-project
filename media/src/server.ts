import express from 'express'
require('express-async-errors');
import notFoundMiddleware from '@common/middlewares/notFoundMiddleware'
import errorHandlerMiddleware from '@common/middlewares/errorHandlerMiddleware'

const port =  process.env?.PORT ?  parseInt(process.env?.PORT) : 3000;

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.end('media is working fine!'))


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const connectionString = process.env.MONGODB_CONNECTION_STRING ?? ''

app.listen(port, () => {
    console.log(` media server running at ${port}`);
});


