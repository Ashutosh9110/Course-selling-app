const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD
const MONGO_URL = process.env.MONGO_URL
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
    JWT_ADMIN_PASSWORD,
    JWT_USER_PASSWORD,
    MONGO_URL,
    JWT_SECRET
}