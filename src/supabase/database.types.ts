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
      chats: {
        Row: {
          chatId: string
          content: string
          createdAt: string
          from: string
          roomId: string
          to: string
        }
        Insert: {
          chatId?: string
          content: string
          createdAt?: string
          from: string
          roomId?: string
          to: string
        }
        Update: {
          chatId?: string
          content?: string
          createdAt?: string
          from?: string
          roomId?: string
          to?: string
        }
        Relationships: [
          {
            foreignKeyName: "chats_from_fkey"
            columns: ["from"]
            isOneToOne: false
            referencedRelation: "userProfiles"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "chats_roomId_fkey"
            columns: ["roomId"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["roomId"]
          },
          {
            foreignKeyName: "chats_to_fkey"
            columns: ["to"]
            isOneToOne: false
            referencedRelation: "userProfiles"
            referencedColumns: ["userId"]
          },
        ]
      }
      freeMeals: {
        Row: {
          createdAt: string
          freeMealDate: string
          maxServingCount: number
          mealId: string
          sponsorId: string
          storeId: string
        }
        Insert: {
          createdAt?: string
          freeMealDate: string
          maxServingCount: number
          mealId?: string
          sponsorId?: string
          storeId?: string
        }
        Update: {
          createdAt?: string
          freeMealDate?: string
          maxServingCount?: number
          mealId?: string
          sponsorId?: string
          storeId?: string
        }
        Relationships: [
          {
            foreignKeyName: "freeMeals_sponsorId_fkey"
            columns: ["sponsorId"]
            isOneToOne: false
            referencedRelation: "userProfiles"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "freeMeals_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: false
            referencedRelation: "storeDatas"
            referencedColumns: ["storeId"]
          },
        ]
      }
      recruits: {
        Row: {
          authorId: string
          content: string
          createdAt: string
          deadLineDate: string
          isEnd: boolean
          maxRecipientRecruits: number
          maxSponsorRecruits: number
          recruitId: string
          region: string
          title: string
          volunteeringDate: string
        }
        Insert: {
          authorId?: string
          content: string
          createdAt?: string
          deadLineDate: string
          isEnd: boolean
          maxRecipientRecruits: number
          maxSponsorRecruits: number
          recruitId?: string
          region: string
          title: string
          volunteeringDate: string
        }
        Update: {
          authorId?: string
          content?: string
          createdAt?: string
          deadLineDate?: string
          isEnd?: boolean
          maxRecipientRecruits?: number
          maxSponsorRecruits?: number
          recruitId?: string
          region?: string
          title?: string
          volunteeringDate?: string
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
      replies: {
        Row: {
          content: string
          createdAt: string
          recipientId: string
          recruitId: string
          replyId: string
        }
        Insert: {
          content: string
          createdAt?: string
          recipientId?: string
          recruitId?: string
          replyId?: string
        }
        Update: {
          content?: string
          createdAt?: string
          recipientId?: string
          recruitId?: string
          replyId?: string
        }
        Relationships: [
          {
            foreignKeyName: "replys_recipientId_fkey"
            columns: ["recipientId"]
            isOneToOne: false
            referencedRelation: "userProfiles"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "replys_recruitId_fkey"
            columns: ["recruitId"]
            isOneToOne: false
            referencedRelation: "recruits"
            referencedColumns: ["recruitId"]
          },
        ]
      }
      rooms: {
        Row: {
          createdAt: string
          roomId: string
          userAId: string
          userBId: string
        }
        Insert: {
          createdAt?: string
          roomId?: string
          userAId?: string
          userBId?: string
        }
        Update: {
          createdAt?: string
          roomId?: string
          userAId?: string
          userBId?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_userAId_fkey2"
            columns: ["userAId"]
            isOneToOne: false
            referencedRelation: "userProfiles"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "rooms_userBId_fkey2"
            columns: ["userBId"]
            isOneToOne: false
            referencedRelation: "userProfiles"
            referencedColumns: ["userId"]
          },
        ]
      }
      sponsorMeets: {
        Row: {
          createdAt: string
          isApproved: boolean
          isSponsor: boolean
          meetId: string
          recruitId: string
          userId: string
        }
        Insert: {
          createdAt?: string
          isApproved?: boolean
          isSponsor?: boolean
          meetId?: string
          recruitId?: string
          userId?: string
        }
        Update: {
          createdAt?: string
          isApproved?: boolean
          isSponsor?: boolean
          meetId?: string
          recruitId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "sponsorMeets_recruitId_fkey"
            columns: ["recruitId"]
            isOneToOne: false
            referencedRelation: "recruits"
            referencedColumns: ["recruitId"]
          },
          {
            foreignKeyName: "sponsorMeets_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "userProfiles"
            referencedColumns: ["userId"]
          },
        ]
      }
      sponsorShip: {
        Row: {
          billingKey: string
          createdAt: string
          isTermination: boolean
          price: number
          recipientId: string
          sponsorId: string
          sponsorShipId: string
        }
        Insert: {
          billingKey: string
          createdAt?: string
          isTermination?: boolean
          price?: number
          recipientId?: string
          sponsorId?: string
          sponsorShipId?: string
        }
        Update: {
          billingKey?: string
          createdAt?: string
          isTermination?: boolean
          price?: number
          recipientId?: string
          sponsorId?: string
          sponsorShipId?: string
        }
        Relationships: [
          {
            foreignKeyName: "sponsorShip_recipientId_fkey"
            columns: ["recipientId"]
            isOneToOne: false
            referencedRelation: "userProfiles"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "sponsorShip_sponsorId_fkey"
            columns: ["sponsorId"]
            isOneToOne: false
            referencedRelation: "userProfiles"
            referencedColumns: ["userId"]
          },
        ]
      }
      sponsorShipOrder: {
        Row: {
          amount: number
          createdAt: string
          logId: string
          orderName: string
          sponsorShipId: string
        }
        Insert: {
          amount: number
          createdAt?: string
          logId?: string
          orderName: string
          sponsorShipId?: string
        }
        Update: {
          amount?: number
          createdAt?: string
          logId?: string
          orderName?: string
          sponsorShipId?: string
        }
        Relationships: [
          {
            foreignKeyName: "sponsorShipOrder_sponsorShipId_fkey"
            columns: ["sponsorShipId"]
            isOneToOne: false
            referencedRelation: "sponsorShip"
            referencedColumns: ["sponsorShipId"]
          },
        ]
      }
      storeDatas: {
        Row: {
          address: string
          brandName: string
          createdAt: string
          lat: number
          lng: number
          phoneNumber: string
          storeId: string
          storeType: string
        }
        Insert: {
          address: string
          brandName: string
          createdAt?: string
          lat: number
          lng: number
          phoneNumber: string
          storeId?: string
          storeType: string
        }
        Update: {
          address?: string
          brandName?: string
          createdAt?: string
          lat?: number
          lng?: number
          phoneNumber?: string
          storeId?: string
          storeType?: string
        }
        Relationships: []
      }
      storeOwners: {
        Row: {
          createdAt: string
          sponsorId: string
          storeId: string
        }
        Insert: {
          createdAt?: string
          sponsorId?: string
          storeId?: string
        }
        Update: {
          createdAt?: string
          sponsorId?: string
          storeId?: string
        }
        Relationships: [
          {
            foreignKeyName: "storeOwners_sponsorId_fkey"
            columns: ["sponsorId"]
            isOneToOne: false
            referencedRelation: "userProfiles"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "storeOwners_storeId_fkey"
            columns: ["storeId"]
            isOneToOne: true
            referencedRelation: "storeDatas"
            referencedColumns: ["storeId"]
          },
        ]
      }
      userProfiles: {
        Row: {
          bgImageUrl: string | null
          createdAt: string
          email: string
          nickname: string
          profileImageUrl: string | null
          role: string
          userId: string
        }
        Insert: {
          bgImageUrl?: string | null
          createdAt?: string
          email: string
          nickname: string
          profileImageUrl?: string | null
          role: string
          userId?: string
        }
        Update: {
          bgImageUrl?: string | null
          createdAt?: string
          email?: string
          nickname?: string
          profileImageUrl?: string | null
          role?: string
          userId?: string
        }
        Relationships: [
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
