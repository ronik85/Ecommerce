import express from 'express';
import { createUser, getAllUser, getUser } from '../controllers/user.controller.js';

const app = express.Router();
app.post('/create', createUser)
app.get('/all', getAllUser)
app.get('/:id', getUser)
export default app;
