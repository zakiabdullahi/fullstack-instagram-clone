import mongoose from "mongoose";
import validator from "validator";


const { Schema } = mongoose

const postSchema = new Schema({

    content: {
        type: String,
        require: true,
        // validate: [value => value.length < 10, 'content should be atleast 10']

    },

    image: {
        type: String,
        default: null
    },
    author: {
        type: Schema.Types.ObjectId,
        rel: "User",
        required: true
    },

    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Like"
        }

    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

},
    {
        timestamps: true,
    }
)

const Post = mongoose.model("Post", postSchema)

export default Post;