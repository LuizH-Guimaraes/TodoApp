const dotenv = require('dotenv')
const config = require('./index.js')

module.exports = {
    client: 'pg',
    connection: config.db.url,
    migrations: {
        directory: '../db/migrations',
        tableName: 'tb_migrations'
    }
}