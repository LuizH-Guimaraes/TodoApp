const cors = require('cors')
const {json} = require('body-parser')
const routes = require('../api')
const config = require('../config')

module.exports = (app) => {
    app.use(cors())
    app.use(json())
    app.use(config.api.prefix, routes())
}
