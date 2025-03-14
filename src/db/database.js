const {sequelize, Sequelize} = require("sequelize")

class Database{
    constructor() {
        this.init()
    }
    init() {
        this.db = new Sequelize({
            database: "db_stock",
            username: "dev",
            password: "Dev.1234",
            host: "localhost",
            port: 3306,
            dialect: "mysql"

        })
    }
}
module.exports = new Database()