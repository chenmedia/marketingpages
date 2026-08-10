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
      enquiries: {
        Row: {
          consent_text: string | null;
          created_at: string;
          email: string;
          form_key: string;
          hubspot_error: string | null;
          hubspot_state: string;
          id: string;
          ip: string | null;
          landing_path: string | null;
          ip_hash: string | null;
          locale: string;
          marketing_consent: boolean;
          message: string;
          name: string;
          notified_at: string | null;
          org: string | null;
          referrer: string | null;
          source_path: string | null;
          status: string;
          utm_campaign: string | null;
          utm_medium: string | null;
          utm_source: string | null;
        };
        Insert: {
          consent_text?: string | null;
          created_at?: string;
          email: string;
          hubspot_error?: string | null;
          hubspot_state?: string;
          id?: string;
          ip?: string | null;
          ip_hash?: string | null;
          locale?: string;
          marketing_consent?: boolean;
          message: string;
          name: string;
          org?: string | null;
          referrer?: string | null;
          source_path?: string | null;
          status?: string;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Update: {
          consent_text?: string | null;
          created_at?: string;
          email?: string;
          form_key?: string;
          hubspot_error?: string | null;
          hubspot_state?: string;
          id?: string;
          ip?: string | null;
          landing_path?: string | null;
          ip_hash?: string | null;
          locale?: string;
          marketing_consent?: boolean;
          message?: string;
          name?: string;
          notified_at?: string | null;
          org?: string | null;
          referrer?: string | null;
          source_path?: string | null;
          status?: string;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
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
      site_stats: {
        Row: {
          id: number;
          value: string;
          caption_no: string;
          caption_en: string;
          sort_order: number;
          is_visible: boolean;
          updated_at: string;
        };
        Insert: {
          value: string;
          caption_no: string;
          caption_en: string;
          sort_order?: number;
          is_visible?: boolean;
          updated_at?: string;
        };
        Update: {
          value?: string;
          caption_no?: string;
          caption_en?: string;
          sort_order?: number;
          is_visible?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_images: {
        Row: {
          slot: string;
          path: string;
          alt_no: string;
          alt_en: string;
          caption: string | null;
          focal_x: number;
          focal_y: number;
          width: number;
          height: number;
          blur_data_url: string | null;
          updated_at: string;
        };
        Insert: {
          slot: string;
          path: string;
          alt_no: string;
          alt_en: string;
          caption?: string | null;
          focal_x?: number;
          focal_y?: number;
          width: number;
          height: number;
          blur_data_url?: string | null;
          updated_at?: string;
        };
        Update: {
          slot?: string;
          path?: string;
          alt_no?: string;
          alt_en?: string;
          caption?: string | null;
          focal_x?: number;
          focal_y?: number;
          width?: number;
          height?: number;
          blur_data_url?: string | null;
          updated_at?: string;
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
          status: string;
          title_en: string;
          title_no: string;
        }[];
      };
      /*
        is_admin() er flyttet til skjemaet private, som PostgREST ikke
        eksponerer. Den brukes kun av RLS-policyene og skal ikke kalles
        herfra, så den står ikke lenger i typene.
      */
      next_free_days: {
        Args: { p_days?: number; p_from?: string };
        Returns: { day: string; free: number }[];
      };
      /*
        Setter leveringsstatus rett etter en innsending. Egen funksjon fordi
        anon ikke har update på tabellen; se migrasjonen for skrankene.
      */
      mark_enquiry_delivery: {
        Args: {
          p_hubspot_error?: string;
          p_hubspot_state?: string;
          p_id: string;
          p_notified?: boolean;
        };
        Returns: undefined;
      };
      /*
        Eneste veien inn i enquiries for en besøkende. Anon har execute her og
        ingenting på selve tabellen.
      */
      submit_enquiry: {
        Args: {
          p_consent_text?: string;
          p_email: string;
          p_form_key?: string;
          p_ip?: string;
          p_ip_hash?: string;
          p_landing_path?: string;
          p_locale?: string;
          p_marketing_consent?: boolean;
          p_message: string;
          p_name: string;
          p_org?: string;
          p_referrer?: string;
          p_source_path?: string;
          p_utm_campaign?: string;
          p_utm_medium?: string;
          p_utm_source?: string;
        };
        Returns: string;
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
