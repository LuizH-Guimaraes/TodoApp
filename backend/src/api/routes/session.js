const {Router} = require('express')
const {Container} = require('typedi')

module.exports = (app) => {
    const route = Router()
    app.use('/session', route)
    route.get('/', (req, res) => {
        res.json().status(200)
    })
}