import mongoose from 'mongoose';
import { boolean } from 'zod';


const messageSchema = new mongoose.Schema({


    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        requried:true,
    },
    reciverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        requried:true,
    },

  
    text:String,
    timestamp:{
        type:Date,
        default: Date.now,
    },


})



const Message =   mongoose.models.Message || mongoose.model('Message',messageSchema);


export default Message;

