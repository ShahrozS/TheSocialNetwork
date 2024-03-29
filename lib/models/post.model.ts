import mongoose from 'mongoose';
import { boolean } from 'zod';


const postSchema = new mongoose.Schema({

    text: {type:String, required:true},
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        requried:true,
    },
    venue:{type:String,requried:true},
    timeStart:{type:String,required:true},
    timeEnd:{type:String,required:true},

    createdAt:{
        type:Date,
        default: Date.now,
    },
    isOccupied:{
        type:Boolean,
        required:true,
    },
    occupiedBy:{
        type: String,
    },

    expireAt:{
        type:Date,
        index: { expires: 0 }
    }


}, { autoIndex: true });

postSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });


const Post = mongoose.models.Post || mongoose.model('Post',postSchema);


export default Post;

