import { RouteHandler } from "../types";

export const router : RouteHandler = {
    handleRoute(req, res) {
            
        res.end(JSON.stringify({success:1, id: Math.floor(Math.random() * 10000)}))
    },
}