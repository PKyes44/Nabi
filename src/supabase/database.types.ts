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
      recruits: {
        Row: {
          authorId: string
          content: string
          createdAt: string
          donationType: string
          maxRecruits: number
          recruitId: string
          region: string
          sponserType: string
          status: string
          title: string
        }
        Insert: {
          authorId?: string
          content: string
          createdAt?: string
          donationType: string
          maxRecruits: number
          recruitId?: string
          region: string
          sponserType: string
          status: string
          title: string
        }
        Update: {
          authorId?: string
          content?: string
          createdAt?: string
          donationType?: string
          maxRecruits?: number
          recruitId?: string
          region?: string
          sponserType?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "recruits_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sponTeams: {
        Row: {
          createdAt: string
          donateDateCycle: string
          donationType: string
          teamId: string
          teamName: string
        }
        Insert: {
          createdAt?: string
          donateDateCycle: string
          donationType: string
          teamId?: string
          teamName: string
        }
        Update: {
          createdAt?: string
          donateDateCycle?: string
          donationType?: string
          teamId?: string
          teamName?: string
        }
        Relationships: []
      }
      userProfiles: {
        Row: {
          createdAt: string
          introduce: string
          nickname: string
          profileImageUrl: string | null
          role: string
          teamId: string | null
          userId: string
        }
        Insert: {
          createdAt?: string
          introduce?: string
          nickname: string
          profileImageUrl?: string | null
          role: string
          teamId?: string | null
          userId?: string
        }
        Update: {
          createdAt?: string
          introduce?: string
          nickname?: string
          profileImageUrl?: string | null
          role?: string
          teamId?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "userProfiles_teamId_fkey"
            columns: ["teamId"]
            isOneToOne: false
            referencedRelation: "sponTeams"
            referencedColumns: ["teamId"]
          },
          {
            foreignKeyName: "userProfiles_userId_fkey"
            columns: ["userId"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
