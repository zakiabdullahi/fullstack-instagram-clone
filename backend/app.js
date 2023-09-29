import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())



connectDB();

app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)


const PORT = 8000



app.listen(PORT, () => console.log(`server  listening on port ${PORT}`))





