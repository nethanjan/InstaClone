const Sequelize = require("sequelize");

const dbConfig = require("../config/db.config.js");
const db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	port: dbConfig.port,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
