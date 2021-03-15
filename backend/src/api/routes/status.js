const {Router} = require('express')
const {Container} = require('typedi')

module.exports = (app) => {
    const route = Router()
    app.use('/status', route)
    route.get('/', (req, res) => {
        res.json().status(200)
    })
}