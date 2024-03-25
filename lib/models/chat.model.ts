import mongoose from 'mongoose';
import { boolean } from 'zod';


const chatSchema = new mongoose.Schema({

    id:{type:String,required:true,unique:true},

    messages: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : 'Message'
        }
    ],

})



const Chat = mongoose.models.Chat || mongoose.model('Chat',chatSchema);


export default Chat;

