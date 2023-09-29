export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      gitusers: {
        Row: {
          fullname: string | null;
          id: string;
          task_json: Json | null;
        };
        Insert: {
          fullname?: string | null;
          id: string;
          task_json?: Json | null;
        };
        Update: {
          fullname?: string | null;
          id?: string;
          task_json?: Json | null;
        };
        Relationships: [];
      };
      taskList: {
        Row: {
          id: string;
          tasks: Json;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          tasks: Json;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          tasks?: Json;
          user_id?: string | null;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          contents: string | null;
          group_name: string | null;
          id: string;
          index: number | null;
          type: string | null;
          user_id: string | null;
        };
        Insert: {
          contents?: string | null;
          group_name?: string | null;
          id: string;
          index?: number | null;
          type?: string | null;
          user_id?: string | null;
        };
        Update: {
          contents?: string | null;
          group_name?: string | null;
          id?: string;
          index?: number | null;
          type?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "gitusers";
            referencedColumns: ["id"];
          }
        ];
      };
      user_task_mapping: {
        Row: {
          task_id: string | null;
          user_id: string;
        };
        Insert: {
          task_id?: string | null;
          user_id: string;
        };
        Update: {
          task_id?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          task_json: Json | null;
        };
        Insert: {
          id: string;
          task_json?: Json | null;
        };
        Update: {
          id?: string;
          task_json?: Json | null;
        };
        Relationships: [];
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
}
