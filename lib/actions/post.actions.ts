"use server"

import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { fetchUser } from "./user.actions";
import { pusherServer } from "../pusher";
import { Document } from "mongoose";
import { toPusherKey } from "../utils";

interface Params{
    text: string,
    author:string,

    venue:string,

    timeStart:string,
    timeEnd:string,
    isOccupied:Boolean,
    occupiedBy:string,
    path: string,
    expireAt:Date
}

export async function createPost({

    text,author,venue,timeStart,timeEnd,isOccupied,path,occupiedBy,expireAt

}:Params){

    try{
        connectToDB();

        const createdPost = await Post.create({
            text,author,venue,timeStart,timeEnd,isOccupied,occupiedBy,expireAt
        });
        
        
        //update user
        console.log("Post that was created:  " + createdPost )
        
        await User.findByIdAndUpdate(author,{
            $push:{posts:createdPost._id}
        });
        

// pusherServer.trigger(
//     toPusherKey(`post:${}`)
// )

        revalidatePath(path);
    }
    catch(error:any){
        console.log('error creating post: ',error)
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
 const post =  await  Post.findByIdAndUpdate(
        {_id:id},
        {$set:{isOccupied,occupiedBy:userId}},
        {new:true}
    );
    

    const newPost = await fetchPostById(post._id);
    
console.log("Updated post: " + newPost  );


            
    console.log('post updated successfully' +isOccupied + " " + userId);

    pusherServer.trigger(toPusherKey(`user:${newPost.author.id}:posts`), 'postOccupied', newPost);

}
    catch(err:any){
        
        console.log(`${occupiedBy}Cant update the post:  ${err}` );

    }

    }



