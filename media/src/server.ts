import {createServer} from 'http'; 
import { mockMedias } from './mockData/media';
import { router } from './route';

const hostname = process.env?.HOSTNAME ?? "0.0.0.0";
const port =  process.env?.PORT ?  parseInt(process.env?.PORT) : 3000;
const server = createServer((req, res) => {
  router.handleRoute(req,res)
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
