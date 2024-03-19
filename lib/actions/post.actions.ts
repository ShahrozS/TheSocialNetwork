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

export async function fetchPosts(pageNumber = 1,pageSize = 20) {
    

   
        connectToDB();

        //calculating the posts to skip for finding the page we  are on

        const skipAmount  = (pageNumber -1)*pageSize;


        const postsQuery = Post.find({}).sort({createdAt:'desc'}).skip(skipAmount).limit(pageSize).populate({path:'author',model:User});
   
        const totalPostsCount = await Post.countDocuments({});
   
        const posts =  await postsQuery.exec();
   
        const isNext = totalPostsCount > skipAmount + posts.length; 
   
        return {posts,isNext};
   
 
}



export async function fetchPostById(id : string){
    connectToDB();

    try{


        const post = await Post.findById(id)
        .populate({
            path:'author',
            model :User,
            select: "_id id name image"
        }).exec();

        return post;
    
    }
    catch(err){

        throw new Error('Error Fetching the post : ${error.message}')
    }
}