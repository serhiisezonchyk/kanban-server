import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';
import { fileURLToPath } from 'url';
import path, { resolve } from 'path';
import fileUpload from 'express-fileupload';
import router from './routes/index.js';
import cors from "cors"

dotenv.config();

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('Sync db');
  })
  .catch((e) => {
    console.log(e)
    console.log('Failed sync to db');
  });

app.use(
  express.static(
    resolve(path.dirname(fileURLToPath(import.meta.url)), 'static')
  )
);
app.use(cors());
app.use(express.json());

app.use(fileUpload({}));
app.use('/api', router);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
