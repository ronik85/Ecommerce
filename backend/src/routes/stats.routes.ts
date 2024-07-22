import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { getbarCharts, getDashboardStats, getLineCharts, getPieChart } from '../controllers/stats.controller.js';

const app = express.Router();

app.get('/stats', adminOnly, getDashboardStats)
app.get('/pie', adminOnly, getPieChart)
app.get('/bar', adminOnly, getbarCharts)
app.get('/line', adminOnly, getLineCharts)

export default app;
