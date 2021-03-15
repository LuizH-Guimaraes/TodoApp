const {Router} =  require('express')
const statusRoute = require('./routes/status')

module.exports = () => {
    const app = Router()
    statusRoute(app)
    return app
}