import mongoose from "mongoose";
import validator from "validator";


const { Schema } = mongoose


const commentSchema = new Schema({


    content: {
        type: String,
        require: true,
        // validate: [value => value.length < 10, 'content should be atleast 10']
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        require: true

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true

    }



},
    {
        timestamps: true,
    }
)

const Comment = mongoose.model("Comment", commentSchema)

export default Comment;