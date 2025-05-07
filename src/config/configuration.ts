export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
    name: process.env.POSTGRES_DB || 'nest_project',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'super_secret',
    ttl: process.env.JWT_TTL || '30000s',
  }
})
