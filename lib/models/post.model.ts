import mongoose from 'mongoose';


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
    }


});


const Post = mongoose.models.Post || mongoose.model('Post',postSchema);


export default Post;

