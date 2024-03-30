"use server"

import { promises } from "dns";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Post from "../models/post.model";



interface Params{
    userId: string;
    username:string;
    name:string;
    bio:string;
    image:string;
    path:string;
}
export async function updateUser({
    userId,
    bio,
    name,
    path,
    username,
    image,
  }: Params): Promise<void> {
    try {
      connectToDB();
  
      await User.findOneAndUpdate(
        { id: userId },
        {
          username: username.toLowerCase(),
          name,
          bio,
          image,
          onboarded: true,
        },
        { upsert: true }
      );
  
      if (path === "/dashboard/profile/edit") {
        revalidatePath(path);
      }
    } catch (error: any) {
      throw new Error(`Failed to create/update user: ${error.message}`);
    }
  }


  export async function fetchUser(userId:string){

    try{
        connectToDB();
        
        return await User.findOne({id:userId})
    } catch (error:any){
        console.log(error);
    }
  }


  export async function fetchUserPosts(userId:string){

    try{

      connectToDB();

      const posts = await User.findOne({id:userId})
      .populate({
        path:'posts',
        model: Post,
      });

      
return posts;
    }
    catch(err :any){

      throw new Error('Fialed to load posts : ' + err);
    }
  }