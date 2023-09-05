import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
import applyExtraSetup from './extra_setup.js';
import User from './user.js';
import Group from './group.js';
import Category from './category.js';
import Task from './task.js';
import Note from './note.js'
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  }
);

const db = {};
db.DataTypes = DataTypes;
db.sequelize = sequelize;

db.user = User(sequelize, DataTypes);
db.group = Group(sequelize, DataTypes);
db.category = Category(sequelize, DataTypes);
db.task = Task(sequelize, DataTypes);
db.note = Note(sequelize,DataTypes);

applyExtraSetup(db);
export default db;
