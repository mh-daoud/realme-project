import { RouteEndpoint, RouteHandler } from "../types";

export const router: RouteHandler = {
    handleRoute(req, res) {
        res.setHeader("Content-Type", "text/html");
        const response = `<!DocType html>
        <html>
        <head>
            <title>Realme services | First Demo</title>
        </head>
        <body>
        <h1>Welcome to realme demo</h1>
        <p>List of services</p>
        <ul>
         ${Object.values(RouteEndpoint).map((endpoint) => `<li><a href='${endpoint}'>${endpoint}</a></li>`).join('')}
        </ul>
        </body>
        </html>`
        res.end(response)
    },
}