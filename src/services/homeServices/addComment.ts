import { supabase } from "@config/supabase";

const addComment= async (User_Id:number,Tweet_Id:number,Content:string)=>{
try {
    const { data:comment, error } = await supabase
    .from('Comments')
    .insert([
    { User_Id: User_Id, Tweet_Id: Tweet_Id, Content:Content },
    ])
    .select()
    if(error) throw error;

    return comment;
} catch (error) {
    console.log('Error adding comment: '+error);
    throw error;
}
   
}
export{addComment};