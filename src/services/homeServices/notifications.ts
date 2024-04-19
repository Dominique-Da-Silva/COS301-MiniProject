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
      (payload) => {
        // Emit an event with the payload when a change event is received
        notificationEmitter.emit('new-notification', payload.new);
      }
    )
    .subscribe();
};

export { followNotification, notificationEmitter };
