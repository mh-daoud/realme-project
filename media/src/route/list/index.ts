import { mockMedias } from "../../mockData/media";
import { RouteHandler } from "../types";

export const router : RouteHandler = {
    handleRoute(req, res) {
        res.end(JSON.stringify({media:mockMedias}));
    },
}
