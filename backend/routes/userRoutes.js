import express from "express"
import { login, logoutUser, registUser, verifyUser } from "../controllers/userController.js"


const userRouter = express.Router()


userRouter.post('/register-user', registUser)
userRouter.get('/verify-user', verifyUser)
userRouter.post('/login-user', login)
userRouter.post('/logout-user', logoutUser);



export default userRouter
