import { supabase } from "@config/supabase";
import { addTweet } from "./addTweets";
const addComment= async (User_Id:number,Tweet_Id:number,Content:string)=>{
try {
    const { data:comment, error } = await supabase
    .from('Comments')
    .insert([
    { User_Id: User_Id, Tweet_Id: Tweet_Id, Content:Content },
    ])
    .select()
    if(error) throw error;

    const tweetData={
        User_Id:User_Id,
        Content:Content,
        Img_Url:null,
    }
    const success = addTweet(tweetData);
    if(success != error)
    return comment;

    else {throw success};

} catch (error) {
    console.log('Error adding comment: '+error);
    throw error;
}
   
}
export{addComment};