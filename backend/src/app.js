const express = require('express')
const loaders = require('./loaders')
const config = require('./config')

const startServer = port => {
    const app = express()

    loaders(app)

    app.listen(port, ()=> {
        console.log(`Node listening on port ${port}`)
    }).on('error', err => {
        console.log(err)
        process.exit(1)
    })
}

startServer(config.port || 8000)