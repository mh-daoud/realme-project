export const configUtil = {
    getJwtSecret: () => process.env.JWT_SECRET ?? "super_secret"
}


export default configUtil