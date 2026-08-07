/*
  Generert fra Supabase-prosjektet zxehvkfamzlqdnwdkqhw.

  Regenerer etter hver skjemaendring. Uten disse typene er hver .from("events")
  av typen any, og strict-oppsettet gir null verdi der det trengs mest.
*/
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      app_settings: {
        Row: { id: number; team_size: number; updated_at: string };
        Insert: { id?: number; team_size?: number; updated_at?: string };
        Update: { id?: number; team_size?: number; updated_at?: string };
        Relationships: [];
      };
      event_internal: {
        Row: {
          client: string | null;
          contact: string | null;
          event_id: string;
          notes: string | null;
        };
        Insert: {
          client?: string | null;
          contact?: string | null;
          event_id: string;
          notes?: string | null;
        };
        Update: {
          client?: string | null;
          contact?: string | null;
          event_id?: string;
          notes?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "event_internal_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: true;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
        ];
      };
      event_photographers: {
        Row: { event_id: string; photographer_id: string; role: string | null };
        Insert: { event_id: string; photographer_id: string; role?: string | null };
        Update: { event_id?: string; photographer_id?: string; role?: string | null };
        Relationships: [
          {
            foreignKeyName: "event_photographers_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_photographers_photographer_id_fkey";
            columns: ["photographer_id"];
            isOneToOne: false;
            referencedRelation: "photographers";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          created_at: string;
          created_by: string | null;
          ends_on: string;
          id: string;
          is_published: boolean;
          kind: string;
          location_en: string | null;
          location_no: string;
          starts_on: string;
          status: string;
          title_en: string;
          title_no: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          ends_on: string;
          id?: string;
          is_published?: boolean;
          kind?: string;
          location_en?: string | null;
          location_no: string;
          starts_on: string;
          status?: string;
          title_en: string;
          title_no: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          ends_on?: string;
          id?: string;
          is_published?: boolean;
          kind?: string;
          location_en?: string | null;
          location_no?: string;
          starts_on?: string;
          status?: string;
          title_en?: string;
          title_no?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      photographers: {
        Row: {
          counts_toward_capacity: boolean;
          created_at: string;
          display_name: string;
          id: string;
          initials: string;
          is_active: boolean;
          role_en: string | null;
          role_no: string | null;
          sort_order: number;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          counts_toward_capacity?: boolean;
          created_at?: string;
          display_name: string;
          id?: string;
          initials: string;
          is_active?: boolean;
          role_en?: string | null;
          role_no?: string | null;
          sort_order?: number;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          counts_toward_capacity?: boolean;
          created_at?: string;
          display_name?: string;
          id?: string;
          initials?: string;
          is_active?: boolean;
          role_en?: string | null;
          role_no?: string | null;
          sort_order?: number;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          full_name: string | null;
          id: string;
          role: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          full_name?: string | null;
          id: string;
          role?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
          role?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      agenda_public: {
        Args: { p_from?: string; p_limit?: number };
        Returns: {
          assigned: Json;
          ends_on: string;
          free_by_day: Json;
          free_min: number;
          id: string;
          location_en: string;
          location_no: string;
          starts_on: string;
          team_size: number;
          title_en: string;
          title_no: string;
        }[];
      };
      is_admin: { Args: never; Returns: boolean };
      next_free_days: {
        Args: { p_days?: number; p_from?: string };
        Returns: { day: string; free: number }[];
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

type DefaultSchema = Database["public"];

export type Tables<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Row"];
export type TablesInsert<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Update"];
export type Fn<T extends keyof DefaultSchema["Functions"]> =
  DefaultSchema["Functions"][T]["Returns"];
