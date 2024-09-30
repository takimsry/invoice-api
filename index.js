import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/apiRoutes.js';
import { sequelize } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log(process.env.POSTGRES_URI);

app.use(express.json());

app.use("/api", apiRoutes);

const startServer = async () => {
  await connectDB();
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

startServer();