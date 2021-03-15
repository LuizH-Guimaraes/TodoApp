const knex = require('knex')
const config = require('../config')
const {Container} = require('typedi')
const dbConfig = require('../config/db.js')

module.exports = () => {
    console.log('Conectando ao banco de dados')
    const dbInstance = knex(dbConfig)
    Container.set('knex', dbInstance)
}
