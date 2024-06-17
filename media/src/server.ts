import {createServer} from 'http'; 
import { router } from './route';
import dbClient from './dbClient'
// import express from 'express'

// const app2 = express()

// app2.listen()


const hostname = process.env?.HOSTNAME ?? "0.0.0.0";
const port =  process.env?.PORT ?  parseInt(process.env?.PORT) : 3000;
const server = createServer((req, res) => {
  router.handleRoute(req,res)
});

const app = () => {
  const connectionString = process.env.MONGODB_CONNECTION_STRING ?? ''
  dbClient.connectToDB(connectionString,(error) => {
    if(error){
      console.log({message: 'unable to connect to db', error})
      return
    } 
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
}




app()

