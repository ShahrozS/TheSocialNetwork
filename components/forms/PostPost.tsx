"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'

import * as z from "zod";
import { Textarea } from "../ui/textarea";
import {usePathname,useRouter} from 'next/navigation';
import { PostValidation } from '@/lib/validations/post';
// import { updateUser } from "@/lib/actions/user.actions";

import { Input } from "@/components/ui/input"
import { createPost } from "@/lib/actions/post.actions";


  
interface Props {
    userId: string;
  }
  
  function PostPost({ userId }: Props) {
 
    const router = useRouter();
    const pathname = usePathname();

const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
       post:'',
       venue:'',
       timeStart:'',
       timeEnd:'',
       accountId:userId,

        },
});

//    text,author,venue,timeStart,timeEnd,path

const onSubmit = async(values:z.infer<typeof PostValidation>) =>{
console.log("sajodpdasads");
console.log(values.timeStart + " - " + values.timeEnd);

console.log(values.timeStart + " - " + values.timeEnd);
    await createPost(
 {   text: values.post,
    author:userId,
    venue:values.venue,
    timeStart:values.timeStart,
    timeEnd:values.timeEnd,
    path:pathname}
);

router.push("/");
}
return (

    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
   
    <FormField
        control={form.control}
        name="post"
        render={({ field }) => (
          <FormItem className="mt-10 flex  flex-col w-full gap-3">
            <FormLabel className="text-base-semibold text-light-2">
          Activity
            </FormLabel>
            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
              <Textarea 
              placeholder="Describe your activity. e.g ( Wanna play chess. )"
              rows={2}
              className="account-form_input no focus"
              
              {...field} />
            </FormControl>
            <FormMessage/>

          </FormItem>

          
        )}
      />

<FormField
        control={form.control}
        name="venue"
        render={({ field }) => (
            <FormItem className="flex  flex-col w-full gap-3">
            <FormLabel className="text-base-semibold text-light-2">
          Venue
            </FormLabel>
            <FormControl className="text-light-1">
              <Input 
              placeholder="Select a venue e.g.( Multipurpose, Library )"
              className="account-form_input no focus"
              type="text"
              {...field} />
            </FormControl>
           <FormMessage/>
          </FormItem>
        )}
      />

      {/* section for time. */}
    <div className="time flex flex-row">
      <FormField
        control={form.control}
        name="timeStart"
        render={({ field }) => (
            <FormItem className="flex  flex-col  w-32 gap-3">
            <FormLabel className="text-base-semibold text-light-2">
          Start Time
            </FormLabel>
            <FormControl className="">
              <Input 
              placeholder="Select a venue e.g.( Multipurpose, Library )"
              className="account-form_input no focus"
              type="time"
              {...field} />
            </FormControl>
           <FormMessage/>
          </FormItem>
        )}
      />


<FormField
        control={form.control}
        name="timeEnd"
        render={({ field }) => (
            <FormItem className="flex flex-col w-32 ml-5 gap-3">
            <FormLabel className="text-base-semibold text-light-2">
          End Time
            </FormLabel>
            <FormControl className="">
              <Input 
              placeholder="Select a venue e.g.( Multipurpose, Library )"
              className="account-form_input no focus"
              type="time"
              {...field} />
            </FormControl>
           <FormMessage/>
          </FormItem>
        )}
      />
      </div>
<Button type="submit" className="bg-primary-500">Post Activity</Button>


    </form>
    </Form>
    
)

}


export default PostPost;