export const configUtil = {
    getJwtSecret: () => process.env.JWT_SECRET ?? "super_secret",
    getAuthHostname: () => process.env.AUTH_ENDPOINT ?? 'http://localhost:3000/',
    getRoot: () => process.cwd()
}


export default configUtil