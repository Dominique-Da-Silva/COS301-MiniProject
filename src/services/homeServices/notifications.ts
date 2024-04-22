import { supabase } from '@config/supabase';

// Function to subscribe to follow notifications
const CreateFollowNotification = async (Following_Id:number,Followed_Id:number) => {
        try{
             const { data:username,error } = await supabase
            .from('User')
            .select("Username")
            .eq('User_Id', Following_Id)
            if (error) throw error;

            //console.log(username);
            const Content = `${username[0].Username} followed you`;

            const {data:notifs} = await supabase
            .from("Notification")
            .insert([{
                User_Id:Followed_Id,
                Type_Id: 4,
                Content:Content,
                Read:false}])
            .select();

            if(error) throw error;
            return notifs;

} catch(error){ 
  console.log(error);
}
};

export { CreateFollowNotification};

const CreateLikeNotification = async (Tweet_Id:number,User_Id: number) => {

        try {
          //get owner of the tweet
          const { data: tweet, error: tweetError } = await supabase
            .from('Tweets')
            .select('User_Id')
            .eq('Tweet_Id', Tweet_Id);

          if (tweetError) throw tweetError;

          const { data: username, error: userError } = await supabase
            .from('User')
            .select('Username')
            .eq('User_Id', User_Id);

          if (userError) throw userError;

          const Content = `${username[0].Username} has liked your tweet`;

          const { data: notifs,error} = await supabase
            .from("Notification")
            .insert([{
              User_Id: tweet[0].User_Id,
              Type_Id: 1, // Assuming Type_Id 1 represents a like notification
              Content: Content,
              Read: false,
            }])
            .select();
            if(error) throw error;
            return notifs;

          ///notif = notifs;
        } catch (error) {
          console.error(error);
        }
};

export { CreateLikeNotification };

