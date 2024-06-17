import dbClient from "../../dbClient";
import { RouteHandler } from "../types";

export const router : RouteHandler = {
    handleRoute: async (req, res) => {
        const db = dbClient.getDb()
        const books = await db.collection('books')
        .find()
        .sort({author: 1})
        .toArray()
        res.end(JSON.stringify({media:books}));
    },
}
