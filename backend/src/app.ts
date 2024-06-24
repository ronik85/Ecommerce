import express from 'express'
import userRouter from './routes/user.routes.js'
import { connectDB } from './utils/features.js'
import { errorMiddleware } from './middlewares/error.js'

const PORT = 3000
connectDB()

const app = express()
app.use(express.json())
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});

// using routes
app.use("/api/v1/user", userRouter)


app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})