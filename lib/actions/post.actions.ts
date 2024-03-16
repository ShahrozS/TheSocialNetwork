"use server"

import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params{
    text: string,
    author:string,

    venue:string,

    timeStart:string,
    timeEnd:String,
    path: string,
}

export async function createPost({

    text,author,venue,timeStart,timeEnd,path

}:Params){

    try{
        connectToDB();

        const createdPost = await Post.create({
            text,author,venue,timeStart,timeEnd,
        });
        
        
        //update user
        
        await User.findByIdAndUpdate(author,{
            $push:{posts:createdPost._id}
        });
        
        revalidatePath(path);
    }
    catch(error:any){
        throw new Error('error creating post: ',error)
    }

}