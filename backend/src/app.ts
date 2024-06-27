import express from 'express'
import { connectDB } from './utils/features.js'
import { errorMiddleware } from './middlewares/error.js'
import NodeCache from 'node-cache'

// importing routes
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'

const PORT = 3000
connectDB()
export const myCache = new NodeCache()

const app = express()
app.use(express.json())

// using routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRouter)


app.use('/uploads', express.static('uploads'));
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})