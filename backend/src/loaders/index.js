const expressLoader = require('./express')
const dbLoader = require('./db')

module.exports = (app) => {
    expressLoader(app)
    dbLoader()
}