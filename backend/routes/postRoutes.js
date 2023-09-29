import express from "express"
import { authenticate, isOwner } from "../middlewares/authenticate.js"
import { LikePost, commentOnPost, createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/postController.js"
import upload from "../middlewares/multer.js"


const postRouter = express.Router()


postRouter.post('/create-post', authenticate, upload.single('image'), createPost)
postRouter.put('/update-post/:id', authenticate, isOwner, upload.single('image'), updatePost)
postRouter.get('/get-posts', getAllPosts)
postRouter.get('/get-post/:id', authenticate, getPostById);
postRouter.post('/like-post/:id', authenticate, LikePost)
postRouter.post('/comment-post/:id', authenticate, commentOnPost)
postRouter.delete('/delete-post/:id', authenticate, deletePost)




export default postRouter
