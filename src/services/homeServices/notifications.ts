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
      { event: 'INSERT', schema: 'public', table: 'Followers', filter: `Following_Id=eq.${User_Id}` },
      async (payload) => {
        // Emit an event with the payload when a change event is received
        console.log(payload);
        //add it to notification table here
        try{
             const { data:username,error } = await supabase
            .from('User')
            .select("Username")
            .eq('User_Id', payload.new.Followed_Id)
            if (error) throw error;

            const Content = `${username}. followed you`;

            const {data:notif} = await supabase
            .from("Notification")
            .insert([{Notif_Id:4,User_Id:User_Id,Type_Id:4,Content:Content}])
            .select();

            console.log(notif);

            if(error) throw error;
        }catch(error)
        {
            console.log(error);
        }
        notificationEmitter.emit('new-notification', payload.new);
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