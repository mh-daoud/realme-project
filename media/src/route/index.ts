import { IncomingMessage, ServerResponse } from "http";
import { RouteEndpoint, RouteHandler } from "./types";
import {router as MediaListRouter} from './list'
import {router as HomeRouter} from './home'
import {router as MediaAddRouter} from './add'

export const router: RouteHandler = {
    handleRoute: (req: IncomingMessage,res: ServerResponse<IncomingMessage>) => {
        const {url} = req
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        switch(url) {
            case RouteEndpoint.MediaList:
                MediaListRouter.handleRoute(req,res)
                break;
            case RouteEndpoint.MediaAdd:
                MediaAddRouter.handleRoute(req,res)
                break;
            case RouteEndpoint.Home:
                HomeRouter.handleRoute(req,res)
            break
            default:
                res.statusCode = 401
                res.end(JSON.stringify({error:'Unknown route', message:`route with url ${url} is unhandled`}))
        }
    }
}