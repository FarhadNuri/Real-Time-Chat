import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


import authRoutes from './src/routes/auth.route.js';
import { connectDB } from './src/lib/connection.lib.js';
import messageRoutes from './src/routes/message.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use("/api/message",messageRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});