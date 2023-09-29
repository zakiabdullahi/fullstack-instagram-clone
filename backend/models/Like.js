import mongoose from "mongoose";
import validator from "validator";


const { Schema } = mongoose


const likeSchema = new Schema({


    post: {
        type: Schema.Types.ObjectId,

        ref: "Post",

        require: true,

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

const Like = mongoose.model("Like", likeSchema)

export default Like;