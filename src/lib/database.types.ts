export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          phone: string | null
          full_name: string | null
          birth_date: string | null
          gender: string | null
          bio: string | null
          occupation: string | null
          education: string | null
          location_lat: number | null
          location_lng: number | null
          interested_in: string[] | null
          age_range_min: number | null
          age_range_max: number | null
          distance_range: number | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          phone?: string | null
          full_name?: string | null
          birth_date?: string | null
          gender?: string | null
          bio?: string | null
          occupation?: string | null
          education?: string | null
          location_lat?: number | null
          location_lng?: number | null
          interested_in?: string[] | null
          age_range_min?: number | null
          age_range_max?: number | null
          distance_range?: number | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          full_name?: string | null
          birth_date?: string | null
          gender?: string | null
          bio?: string | null
          occupation?: string | null
          education?: string | null
          location_lat?: number | null
          location_lng?: number | null
          interested_in?: string[] | null
          age_range_min?: number | null
          age_range_max?: number | null
          distance_range?: number | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      photos: {
        Row: {
          id: string
          user_id: string
          url: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          url: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          url?: string
          is_primary?: boolean
          created_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          from_user_id: string
          to_user_id: string
          is_super_like: boolean
          created_at: string
        }
        Insert: {
          id?: string
          from_user_id: string
          to_user_id: string
          is_super_like?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          from_user_id?: string
          to_user_id?: string
          is_super_like?: boolean
          created_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          user1_id: string
          user2_id: string
          created_at: string
          expires_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          user1_id: string
          user2_id: string
          created_at?: string
          expires_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          user1_id?: string
          user2_id?: string
          created_at?: string
          expires_at?: string
          is_active?: boolean
        }
      }
      messages: {
        Row: {
          id: string
          match_id: string
          sender_id: string
          content: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          match_id: string
          sender_id: string
          content: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          match_id?: string
          sender_id?: string
          content?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}