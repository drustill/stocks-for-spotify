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
      bets: {
        Row: {
          amount: number | null
          artist_cat: number | null
          begin_value: number | null
          created_at: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          artist_cat?: number | null
          begin_value?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          artist_cat?: number | null
          begin_value?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bets_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          amt_in: number | null
          amt_out: number | null
          bets_placed: number | null
          created_at: string | null
          net_worth: number | null
          user_id: string
        }
        Insert: {
          amt_in?: number | null
          amt_out?: number | null
          bets_placed?: number | null
          created_at?: string | null
          net_worth?: number | null
          user_id: string
        }
        Update: {
          amt_in?: number | null
          amt_out?: number | null
          bets_placed?: number | null
          created_at?: string | null
          net_worth?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
