import { supabase } from '@config/supabase';
import { Notifications } from '@pages/index';

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
                Type_Id: 1,
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
              Type_Id: 4, // Assuming Type_Id 4 represents a like notification
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

const CreateRetweetNotification = async (Tweet_Id:number,User_Id: number) => {

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

    const Content = `${username[0].Username} has retweeted your tweet`;

    const { data: notifs,error} = await supabase
      .from("Notification")
      .insert([{
        User_Id: tweet[0].User_Id,
        Type_Id: 5, // Assuming Type_Id 1 represents a retweet notification
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

export { CreateRetweetNotification };

const CreateTweetNotification = async (Tweet_Id:number) => {

  try {
    //get owner of the tweet
    const { data: tweet, error: tweetError } = await supabase
      .from('Tweets')
      .select('User_Id')
      .eq('Tweet_Id', Tweet_Id);

    if (tweetError) throw tweetError;

    const Content = `you made a new tweet`;

    const { data: notifs,error} = await supabase
      .from("Notification")
      .insert([{
        User_Id: tweet[0].User_Id,
        Type_Id: 2, // Assuming Type_Id 2 represents a new post notification
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

export { CreateTweetNotification };

const CreateCommentNotification = async (Tweet_Id:number,User_Id: number) => {

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

    const Content = `${username[0].Username} has commented on your tweet`;

    const { data: notifs,error} = await supabase
      .from("Notification")
      .insert([{
        User_Id: tweet[0].User_Id,
        Type_Id: 3, // Assuming Type_Id 3 represents a comment notification
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

export { CreateCommentNotification };
interface Notification {
  User_Id: number;
  Type_Id: number;
  Content: string;
  Read: boolean;
}
const updateNotifications = async (notifications: Notification[]) => {
  try {
    const updatedNotifications:Notification[] = [];

    // Update each notification in the array
    for (const notification of notifications) {
      const { data:notif, error } = await supabase
        .from('Notification')
        .update({ Read: true })
        .eq('User_Id', notification.User_Id)
        .eq('Type_Id', notification.Type_Id)
        .eq('Content', notification.Content)
        .single();

      if (error) {
        console.error(error);
        continue; // Continue to the next notification if there's an error
      }

      updatedNotifications.push(notif); // Push the updated notification to the array
    }

    return updatedNotifications;
  } catch (error) {
    console.error(error);
    //throw error; // Return null or handle the error as needed
  }
};

export { updateNotifications };
