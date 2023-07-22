import dotenv from "dotenv"
import {Sequelize, DataTypes} from "sequelize"
import applyExtraSetup from "./extra_setup";
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect:"postgres",
        port: process.env.DB_PORT,
        logging:false,
    }
)

const db = {};
db.DataTypes = DataTypes;
db.sequelize = sequelize;

applyExtraSetup(db);
export default db;