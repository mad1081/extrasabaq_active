export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          username: string
          age: number | null
          city: string | null
          school: string | null
          grade: number | null
          interests: string[] | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          username: string
          age?: number | null
          city?: string | null
          school?: string | null
          grade?: number | null
          interests?: string[] | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          username?: string
          age?: number | null
          city?: string | null
          school?: string | null
          grade?: number | null
          interests?: string[] | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      competitions: {
        Row: {
          id: string
          title: string
          description: string
          full_description: string | null
          image_url: string | null
          deadline: string
          event_date: string | null
          level: "international" | "national" | "regional" | "local"
          subject: string
          category: string
          age_limit: string | null
          team_size: string
          location: string | null
          format: "online" | "offline" | "hybrid"
          is_free: boolean
          language: string | null
          website_url: string | null
          organizer: string | null
          prizes: string[] | null
          requirements: string[] | null
          schedule: any[] | null
          status: "active" | "past" | "draft"
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          full_description?: string | null
          image_url?: string | null
          deadline: string
          event_date?: string | null
          level: "international" | "national" | "regional" | "local"
          subject: string
          category: string
          age_limit?: string | null
          team_size: string
          location?: string | null
          format: "online" | "offline" | "hybrid"
          is_free: boolean
          language?: string | null
          website_url?: string | null
          organizer?: string | null
          prizes?: string[] | null
          requirements?: string[] | null
          schedule?: any[] | null
          status?: "active" | "past" | "draft"
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          full_description?: string | null
          image_url?: string | null
          deadline?: string
          event_date?: string | null
          level?: "international" | "national" | "regional" | "local"
          subject?: string
          category?: string
          age_limit?: string | null
          team_size?: string
          location?: string | null
          format?: "online" | "offline" | "hybrid"
          is_free?: boolean
          language?: string | null
          website_url?: string | null
          organizer?: string | null
          prizes?: string[] | null
          requirements?: string[] | null
          schedule?: any[] | null
          status?: "active" | "past" | "draft"
          featured?: boolean
          updated_at?: string
        }
      }
      user_favorites: {
        Row: {
          id: string
          user_id: string
          competition_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          competition_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          competition_id?: string
        }
      }
      user_calendar: {
        Row: {
          id: string
          user_id: string
          competition_id: string
          reminder_date: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          competition_id: string
          reminder_date?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          competition_id?: string
          reminder_date?: string | null
          notes?: string | null
        }
      }
      team_posts: {
        Row: {
          id: string
          title: string
          description: string
          competition_id: string | null
          event_name: string
          category: string
          subject: string
          needed_members: number
          age_limit: string | null
          author_id: string
          status: "active" | "closed" | "draft"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          competition_id?: string | null
          event_name: string
          category: string
          subject: string
          needed_members: number
          age_limit?: string | null
          author_id: string
          status?: "active" | "closed" | "draft"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          competition_id?: string | null
          event_name?: string
          category?: string
          subject?: string
          needed_members?: number
          age_limit?: string | null
          author_id?: string
          status?: "active" | "closed" | "draft"
          updated_at?: string
        }
      }
    }
  }
}
