export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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
      replys: {
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
      sponsorShip: {
        Row: {
          createdAt: string
          donationType: string
          recipientId: string
          sponsorId: string
          sponsorShipId: string
        }
        Insert: {
          createdAt?: string
          donationType: string
          recipientId?: string
          sponsorId?: string
          sponsorShipId?: string
        }
        Update: {
          createdAt?: string
          donationType?: string
          recipientId?: string
          sponsorId?: string
          sponsorShipId?: string
        }
        Relationships: []
      }          authorId: string;
          content: string;
          createdAt: string;
          donationType: string;
          maxRecruits: number;
          recruitId: string;
          region: string;
          sponsorType: string;
          status: string;
          title: string;
        };
        Insert: {
          authorId?: string;
          content: string;
          createdAt?: string;
          donationType: string;
          maxRecruits: number;
          recruitId?: string;
          region: string;
          sponsorType: string;
          status: string;
          title: string;
        };
        Update: {
          authorId?: string;
          content?: string;
          createdAt?: string;
          donationType?: string;
          maxRecruits?: number;
          recruitId?: string;
          region?: string;
          sponsorType?: string;
          status?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recruits_authorId_fkey";
            columns: ["authorId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      sponTeams: {
        Row: {
          createdAt: string;
          donateDateCycle: string | null;
          donationType: string;
          teamId: string;
          teamName: string;
        };
        Insert: {
          createdAt?: string;
          donateDateCycle?: string | null;
          donationType: string;
          teamId?: string;
          teamName: string;
        };
        Update: {
          createdAt?: string;
          donateDateCycle?: string | null;
          donationType?: string;
          teamId?: string;
          teamName?: string;
        };
        Relationships: [];
      };
      userProfiles: {
        Row: {
          bgImageUrl: string | null;
          createdAt: string;
          introduce: string;
          nickname: string;
          profileImageUrl: string | null;
          role: string;
          teamId: string;
          userId: string;
        };
        Insert: {
          bgImageUrl?: string | null;
          createdAt?: string;
          introduce?: string;
          nickname: string;
          profileImageUrl?: string | null;
          role: string;
          teamId?: string;
          userId?: string;
        };
        Update: {
          bgImageUrl?: string | null;
          createdAt?: string;
          introduce?: string;
          nickname?: string;
          profileImageUrl?: string | null;
          role?: string;
          teamId?: string;
          userId?: string;
        };
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
      volunteerWorks: {
        Row: {
          createdAt: string
          recruitId: string
          volunteerId: string
          workId: number
        }
        Insert: {
          createdAt?: string
          recruitId?: string
          volunteerId?: string
          workId?: number
        }
        Update: {
          createdAt?: string
          recruitId?: string
          volunteerId?: string
          workId?: number
        }
        Relationships: [
          {
            foreignKeyName: "volunteerWorks_recruitId_fkey"
            columns: ["recruitId"]
            isOneToOne: false
            referencedRelation: "recruits"
            referencedColumns: ["recruitId"]
          },
          {
            foreignKeyName: "volunteerWorks_volunteerId_fkey"
            columns: ["volunteerId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
            foreignKeyName: "userProfiles_teamId_fkey";
            columns: ["teamId"];
            isOneToOne: false;
            referencedRelation: "sponTeams";
            referencedColumns: ["teamId"];
          },
          {
            foreignKeyName: "userProfiles_userId_fkey";
            columns: ["userId"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      volunteerWorks: {
        Row: {
          createdAt: string;
          recruitId: string;
          volunteerId: string;
          workId: number;
        };
        Insert: {
          createdAt?: string;
          recruitId?: string;
          volunteerId?: string;
          workId?: number;
        };
        Update: {
          createdAt?: string;
          recruitId?: string;
          volunteerId?: string;
          workId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "volunteerWorks_recruitId_fkey";
            columns: ["recruitId"];
            isOneToOne: false;
            referencedRelation: "recruits";
            referencedColumns: ["recruitId"];
          },
          {
            foreignKeyName: "volunteerWorks_volunteerId_fkey";
            columns: ["volunteerId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
