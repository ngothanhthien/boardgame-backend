const config = {
  dev: process.env.MONGODB_URI_DEV,
  production: process.env.MONGODB_URI_PROD
}

const env = process.env.NODE_ENV || 'dev'

export default config[env]