import express from 'express';
import { createUser, deleteUser, getAllUser, getUser } from '../controllers/user.controller.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();
app.post('/create', createUser)

app.get('/all', adminOnly, getAllUser)

// app.get('/:id', getUser)
// app.delete('/:id', deleteUser)
app.route('/:id').get(getUser).delete(adminOnly, deleteUser)

export default app;
