//WARNING: THIS FILE IS NOT MEANT TO BE EDITED MANUALLY.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Comments: {
        Row: {
          Comment_Id: number
          Content: string
          Created_at: string
          Tweet_Id: number
          User_Id: number
        }
        Insert: {
          Comment_Id?: number
          Content: string
          Created_at?: string
          Tweet_Id: number
          User_Id: number
        }
        Update: {
          Comment_Id?: number
          Content?: string
          Created_at?: string
          Tweet_Id?: number
          User_Id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_Comments_Tweet_Id_fkey"
            columns: ["Tweet_Id"]
            isOneToOne: false
            referencedRelation: "Tweets"
            referencedColumns: ["Tweet_Id"]
          },
          {
            foreignKeyName: "public_Comments_User_Id_fkey"
            columns: ["User_Id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["User_Id"]
          }
        ]
      }
      Followers: {
        Row: {
          Followed_Id: number | null
          Following_Id: number | null
          id: number
        }
        Insert: {
          Followed_Id?: number | null
          Following_Id?: number | null
          id?: number
        }
        Update: {
          Followed_Id?: number | null
          Following_Id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_Followers_Followed_Id_fkey"
            columns: ["Followed_Id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["User_Id"]
          },
          {
            foreignKeyName: "public_Followers_Following_Id_fkey"
            columns: ["Following_Id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["User_Id"]
          }
        ]
      }
      Likes: {
        Row: {
          Like_Id: number
          Tweet_Id: number
          User_Id: number
        }
        Insert: {
          Like_Id?: number
          Tweet_Id: number
          User_Id: number
        }
        Update: {
          Like_Id?: number
          Tweet_Id?: number
          User_Id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_Likes_Tweet_Id_fkey"
            columns: ["Tweet_Id"]
            isOneToOne: false
            referencedRelation: "Tweets"
            referencedColumns: ["Tweet_Id"]
          },
          {
            foreignKeyName: "public_Likes_User_Id_fkey"
            columns: ["User_Id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["User_Id"]
          }
        ]
      }
      Notification_Types: {
        Row: {
          Type_Id: number
          Type_Name: string
        }
        Insert: {
          Type_Id?: number
          Type_Name: string
        }
        Update: {
          Type_Id?: number
          Type_Name?: string
        }
        Relationships: []
      }
      Notifications: {
        Row: {
          Content: string | null
          Created_at: string
          Notif_Id: number
          Read: boolean | null
          Type_Id: number
          User_Id: number
        }
        Insert: {
          Content?: string | null
          Created_at?: string
          Notif_Id?: number
          Read?: boolean | null
          Type_Id: number
          User_Id: number
        }
        Update: {
          Content?: string | null
          Created_at?: string
          Notif_Id?: number
          Read?: boolean | null
          Type_Id?: number
          User_Id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_Notifications_Notif_Id_fkey"
            columns: ["Notif_Id"]
            isOneToOne: true
            referencedRelation: "User"
            referencedColumns: ["User_Id"]
          },
          {
            foreignKeyName: "public_Notifications_Type_Id_fkey"
            columns: ["Type_Id"]
            isOneToOne: false
            referencedRelation: "Notification_Types"
            referencedColumns: ["Type_Id"]
          }
        ]
      }
      Profile: {
        Row: {
          Bio: string | null
          Img_Url: string | null
          Profile_Id: number
          Profile_Type: string | null
          Theme: boolean | null
          User_Id: number
        }
        Insert: {
          Bio?: string | null
          Img_Url?: string | null
          Profile_Id?: number
          Profile_Type?: string | null
          Theme?: boolean | null
          User_Id: number
        }
        Update: {
          Bio?: string | null
          Img_Url?: string | null
          Profile_Id?: number
          Profile_Type?: string | null
          Theme?: boolean | null
          User_Id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_Profile_User_Id_fkey"
            columns: ["User_Id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["User_Id"]
          }
        ]
      }
      Retweets: {
        Row: {
          Created_at: string
          Retweet_Id: number
          Tweet_Id: number
          Tweeter_Id: number
        }
        Insert: {
          Created_at?: string
          Retweet_Id?: number
          Tweet_Id: number
          Tweeter_Id: number
        }
        Update: {
          Created_at?: string
          Retweet_Id?: number
          Tweet_Id?: number
          Tweeter_Id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_Retweets_Tweet_Id_fkey"
            columns: ["Tweet_Id"]
            isOneToOne: false
            referencedRelation: "Tweets"
            referencedColumns: ["Tweet_Id"]
          },
          {
            foreignKeyName: "public_Retweets_Tweeter_Id_fkey"
            columns: ["Tweeter_Id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["User_Id"]
          }
        ]
      }
      Saves: {
        Row: {
          Save_Id: number
          Tweet_Id: number
          User_Id: number
        }
        Insert: {
          Save_Id?: number
          Tweet_Id: number
          User_Id: number
        }
        Update: {
          Save_Id?: number
          Tweet_Id?: number
          User_Id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_Saves_Tweet_Id_fkey"
            columns: ["Tweet_Id"]
            isOneToOne: false
            referencedRelation: "Tweets"
            referencedColumns: ["Tweet_Id"]
          },
          {
            foreignKeyName: "public_Saves_User_Id_fkey"
            columns: ["User_Id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["User_Id"]
          }
        ]
      }
      Tweets: {
        Row: {
          Content: string | null
          Created_at: string
          Img_Url: string | null
          Like_Count: number | null
          Retweet_Count: number | null
          Tags: string | null
          Tweet_Id: number
          User_Id: number
        }
        Insert: {
          Content?: string | null
          Created_at?: string
          Img_Url?: string | null
          Like_Count?: number | null
          Retweet_Count?: number | null
          Tags?: string | null
          Tweet_Id?: number
          User_Id: number
        }
        Update: {
          Content?: string | null
          Created_at?: string
          Img_Url?: string | null
          Like_Count?: number | null
          Retweet_Count?: number | null
          Tags?: string | null
          Tweet_Id?: number
          User_Id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_Tweets_User_Id_fkey"
            columns: ["User_Id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["User_Id"]
          }
        ]
      }
      User: {
        Row: {
          Created_at: string
          Email: string
          Name: string
          Surname: string
          User_Id: number
          Username: string
        }
        Insert: {
          Created_at?: string
          Email: string
          Name: string
          Surname: string
          User_Id?: number
          Username: string
        }
        Update: {
          Created_at?: string
          Email?: string
          Name?: string
          Surname?: string
          User_Id?: number
          Username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
