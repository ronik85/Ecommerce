import express from 'express'
import { connectDB } from './utils/features.js'
import { errorMiddleware } from './middlewares/error.js'
import NodeCache from 'node-cache'

// importing routes
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import orderRouter from './routes/orders.routes.js'
import { config } from 'dotenv'
import morgan from 'morgan'

config({
    path: "./.env"
})
const PORT = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI || ''
connectDB(mongo_uri)

export const myCache = new NodeCache()

const app = express()
app.use(express.json())
app.use(morgan('dev'))

// using routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/order", orderRouter)


app.use('/uploads', express.static('uploads'));
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})