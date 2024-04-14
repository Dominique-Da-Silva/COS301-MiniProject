import {supabase} from '@config/supabase';
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'

const getTrendingTopics = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('getTrendingTopics', {
        body: {},
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (error) {
        throw error;
      }
      return data;
  
    } catch (error) {
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json()
        console.log('Function returned an error', errorMessage)
      } else if (error instanceof FunctionsRelayError) {
        console.log('Relay error:', error.message)
      } else if (error instanceof FunctionsFetchError) {
        console.log('Fetch error:', error.message)
      }
      throw error; // Re-throw the error to handle it in the calling code if needed
    }
  };
  
   export {getTrendingTopics};