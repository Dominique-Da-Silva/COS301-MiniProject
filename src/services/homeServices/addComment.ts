import { supabase } from "@config/supabase";
import { addTweet } from "./addTweets";
import { CreateCommentNotification } from "./notifications";

const addComment= async (userId:number,tweetId:number,content:string)=>{
try {
    const { data:comment, error } = await supabase
    .from('Comments')
    .insert([
    { User_Id: userId, Tweet_Id: tweetId, Content:content },
    ])
    .select()
    if(error) throw error;

    CreateCommentNotification(tweetId,userId);

    const tweetData={
        User_Id:userId,
        Content:content,
        Img_Url:null,
    }
    const success = addTweet(tweetData);
    if(success !== error)
    return comment;

    else {
        throw success
    }

} catch (error) {
    console.log('Error adding comment: '+error);
    throw error;
}
   
}
export{addComment};