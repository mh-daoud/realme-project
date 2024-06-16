import { IncomingMessage, ServerResponse } from "http";

export enum RouteEndpoint {
    MediaList = '/media/list',
    MediaAdd = '/media/add',
    MediaDelete = '/media/delete',
    MediaUpdate = '/media/update',
    Home = '/'
}



export interface RouteHandler {
    handleRoute: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void
}