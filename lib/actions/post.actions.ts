"use server"

import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { fetchUser } from "./user.actions";

interface Params{
    text: string,
    author:string,

    venue:string,

    timeStart:string,
    timeEnd:String,
    isOccupied:Boolean,
    occupiedBy:string,
    path: string,
}

export async function createPost({

    text,author,venue,timeStart,timeEnd,isOccupied,path,occupiedBy

}:Params){

    try{
        connectToDB();

        const createdPost = await Post.create({
            text,author,venue,timeStart,timeEnd,isOccupied,occupiedBy
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
    catch(err:any){

        throw new Error(`Error Fetching the post : ${err.message}`)
    }
}

    export async function updateOccupationById(id:string,isOccupied:boolean,occupiedBy?:string){
    try{connectToDB();


    // const user =  await fetchUser(occupiedBy);


    const userId = occupiedBy ? occupiedBy : null; 
  await  Post.updateOne(
        {_id:id},
        {$set:{isOccupied,occupiedBy:userId}}
    );
    
            
    console.log('post updated successfully' +isOccupied + " " + userId);
    }
    catch(err:any){
        console.log(`Cant update the post:  ${err}` );
    }

    }



