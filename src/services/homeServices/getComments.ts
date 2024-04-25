import { supabase } from "@config/supabase";

const getComments = async (tweetId: number) => {
  try {
    const { data: Comments, error } = await supabase
      .from('Comments')
      .select("*")
      .eq('Tweet_Id', tweetId)

    if (error) throw error;
    return Comments;

  } catch (error) {
    console.log('Error fetching comments: ' + error);
    throw error;
  }
}

export { getComments };
