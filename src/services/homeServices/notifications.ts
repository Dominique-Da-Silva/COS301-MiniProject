import { supabase } from '@config/supabase';
import EventEmitter from 'events';

// Create an instance of EventEmitter
const notificationEmitter = new EventEmitter();

// Function to subscribe to follow notifications
const followNotification = (User_Id:number|null) => {
  // Subscribe to the Supabase channel for real-time updates
  supabase
    .channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'Followers', filter: `Followed_Id=eq.${User_Id}` },
      async (payload) => {
        // Emit an event with the payload when a change event is received
        //console.log(payload);
        //add it to notification table here
        let notif = null;
        try{
             const { data:username,error } = await supabase
            .from('User')
            .select("Username")
            .eq('User_Id', payload.new.Following_Id)
            if (error) throw error;

            //console.log(username);
            const Content = `${username[0].Username} followed you`;

            const {data:notifs} = await supabase
            .from("Notification")
            .insert([{
                User_Id:User_Id,
                Type_Id: 4,
                Content:Content,
                Read:false,
                Created_at:payload.commit_timestamp}])
            .select();

            //console.log(notif);
            notif = notifs;
            if(error) throw error;
        }catch(error)
        {
            console.log(error);
        }
        notificationEmitter.emit('new-notification', notif);
      }
    )
    .subscribe();
};

export { followNotification, notificationEmitter };
/**{
    "Followed_Id": 43,
    "Following_Id": 13,
    "id": 12
} */