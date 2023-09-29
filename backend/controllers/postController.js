import cloudinary from "../config/cloudinary.js";
import Comment from "../models/Comment.js";
import Like from "../models/Like.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {


    try {


        let result;


        if (req.file) {

            const encodedImage = `data:image/jpg;base64,${req.file.buffer.toString('base64')}`



            result = await cloudinary.uploader.upload(encodedImage, {
                resource_type: "image",
                transformation: [
                    {
                        width: 500,
                        height: 500,
                        crop: "limit"
                    }
                ],
                encoding: "base64",
                folder: "posts"
            })
        }


        const post = new Post({
            content: req.body.content,
            image: result?.url || null,
            author: req.user._id

        })

        await post.save()

        return res.status(201).send(post)


    } catch (err) {

        console.log("[CREATE_POST]", err)
    }
}
export const updatePost = async (req, res) => {


    try {

        let updatedFields = {
            content: req.body.content
        }


        let result;
        const isExists = await Post.findById(req.params.id);

        if (!isExists) return res.status(400).send("post not found");


        if (req.file) {

            const encodedImage = `data:image/jpg;base64,${req.file.buffer.toString('base64')}`



            result = await cloudinary.uploader.upload(encodedImage, {
                resource_type: "image",
                transformation: [
                    {
                        width: 500,
                        height: 500,
                        crop: "limit"
                    }
                ],
                encoding: "base64",
                folder: "posts"
            })

            updatedFields.image = result.url
        }


        const post = await Post.findByIdAndUpdate(req.params.id, updatedFields, { new: true })




        return res.status(201).send(post)


    } catch (err) {

        console.log("[CREATE_POST]", err)
    }
}

export const getAllPosts = async (req, res) => {


    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 5;

    try {

        const posts = await Post.find().populate({
            path: "likes",
            model: "Like",
            populate: {
                path: "user",
                model: "User",
                select: "username"
            }
        }).populate({
            path: "author",
            model: "User",
            select: "username email"
        }).populate({

            path: "comments",
            model: "Comment",
            select: "content",
            populate: {
                path: "user",
                model: "User",
                select: "username"


            }




        })
            .sort({ createdAt: -1 })
            .skip(skip).limit(DEFAULT_LIMIT);




        return res.status(200).send(posts)

    } catch (err) {
        console.log("[GET_ALL_POSTS]", err)
        res.status(500).send(err.message)
    }
}
export const getPostById = async (req, res) => {


    try {

        const { id } = req.params

        const post = await Post.findOne({ _id: id })

        if (!post) {
            return res.status(400).send("post not found")
        }


        return res.status(200).send(post)

    } catch (err) {
        console.log("[GET_ALL_POSTS]", err)
        res.status(500).send(err.message)
    }
}

export const LikePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)

        console.log(post)
        if (!post) {
            return res.status(400).send("Post not found")
        }


        const existingLike = await Like.findOne({ post: post._id, user: req.user._id })


        if (existingLike) {

            await Like.findByIdAndRemove(existingLike._id)

            await post.likes.pull(existingLike._id)


            await post.save();

            return res.status(200).send("post unlike successfully")

        }



        const like = new Like({

            post: post._id,
            user: req.user._id

        })

        await like.save()


        post.likes.push(like._id)

        await post.save();

        return res.status(201).send("post liked successfully")



    } catch (err) {
        console.log("[Like_POST]", err)
        res.status(500).send(err.message)

    }
}

export const commentOnPost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(400).send("Post not found")
        }



        const comment = new Comment({
            content: req.body.content,
            // author: req.body.author,
            user: req.user._id,
            post: post._id
        })

        await comment.save()


        post.comments.push(comment._id)

        await post.save()



        return res.status(200).send("comment created")


    } catch (err) {
        console.log("[COMMENT_POST]", err)
        res.status(500).send(err.message)

    }
}

export const deletePost = async (req, res) => {


    try {

        const post = await Post.findByIdAndDelete(req.params.id)

        if (!post) {
            return res.status(400).send("Post not found")
        }


        return res.status(200).send("Post deleted successfully")


    } catch (err) {
        console.log("[DELETE_POST]", err)
        res.status(500).send(err.message)

    }

}