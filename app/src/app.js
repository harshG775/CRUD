import express from "express";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import userRoutes from './routes/usersRoutes.js';

app.use('/api/v1', userRoutes);


export default app