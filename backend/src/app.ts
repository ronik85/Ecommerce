import express from 'express'
import { connectDB } from './utils/features.js'
import { errorMiddleware } from './middlewares/error.js'
import NodeCache from 'node-cache'

// importing routes
import userRoute from './routes/user.routes.js'
import productRoute from './routes/product.routes.js'
import orderRoute from './routes/orders.routes.js'
import paymentRoute from './routes/payment.routes.js'
import dashboardRoute from './routes/stats.routes.js'
import { config } from 'dotenv'
import morgan from 'morgan'
import Stripe from 'stripe'
import cors from 'cors'

config({
    path: "./.env"
})
const PORT = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI || ''
const stripeKey = process.env.STRIPE_KEY || ''
connectDB(mongo_uri)

export const myCache = new NodeCache();
export const stripe = new Stripe(stripeKey)

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// using routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/order", orderRoute)
app.use("/api/v1/payment", paymentRoute)
app.use("/api/v1/dashboard", dashboardRoute)


app.use('/uploads', express.static('uploads'));
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})