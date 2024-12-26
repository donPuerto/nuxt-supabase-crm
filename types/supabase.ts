export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  avatar_url?: string;
  bio?: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  preferred_language: string;
  timezone: string;
  notification_preferences: {
    email: boolean;
    sms: boolean;
  };
  is_active: boolean;
  created_at: string;
  created_by?: string;
  updated_at: string;
  updated_by?: string;
  deleted_at?: string;
  deleted_by?: string;
  version: number;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  type: string; // role_type enum
  is_system_role: boolean;
  is_active: boolean;
  created_at: string;
  created_by?: string;
  updated_at: string;
  updated_by?: string;
  deleted_at?: string;
  deleted_by?: string;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  is_system_permission: boolean;
  is_active: boolean;
  created_at: string;
  created_by?: string;
  updated_at: string;
  updated_by?: string;
  deleted_at?: string;
  deleted_by?: string;
  version: number;
}

export interface UserRole {
  id: string;
  user_id: string;
  role_id: string;
  assigned_by?: string;
  assigned_at: string;
  is_active: boolean;
  created_at: string;
  created_by?: string;
  updated_at: string;
  updated_by?: string;
  deleted_at?: string;
  deleted_by?: string;
}

export interface RolePermission {
  id: string;
  role_id: string;
  permission_id: string;
  granted_at: string;
  granted_by?: string;
  is_active: boolean;
  created_at: string;
  created_by?: string;
  updated_at: string;
  updated_by?: string;
  deleted_at?: string;
  deleted_by?: string;
}

export interface UserPhoneNumber {
  id: string;
  user_id: string;
  phone_number: string;
  type: 'mobile' | 'home' | 'work' | 'other';
  is_primary: boolean;
  is_verified: boolean;
  verified_at?: string;
  created_at: string;
  created_by?: string;
  updated_at: string;
  updated_by?: string;
  deleted_at?: string;
  deleted_by?: string;
}

export interface UserAddress {
  id: string;
  user_id: string;
  type: 'home' | 'work' | 'billing' | 'shipping' | 'other';
  is_primary: boolean;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
  created_at: string;
  created_by?: string;
  updated_at: string;
  updated_by?: string;
  deleted_at?: string;
  deleted_by?: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'created_at' | 'updated_at' | 'version'>;
        Update: Partial<Omit<User, 'created_at' | 'updated_at' | 'version'>>;
      };
      roles: {
        Row: Role;
        Insert: Omit<Role, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Role, 'created_at' | 'updated_at'>>;
      };
      permissions: {
        Row: Permission;
        Insert: Omit<Permission, 'created_at' | 'updated_at' | 'version'>;
        Update: Partial<Omit<Permission, 'created_at' | 'updated_at' | 'version'>>;
      };
      user_roles: {
        Row: UserRole;
        Insert: Omit<UserRole, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserRole, 'created_at' | 'updated_at'>>;
      };
      role_permissions: {
        Row: RolePermission;
        Insert: Omit<RolePermission, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<RolePermission, 'created_at' | 'updated_at'>>;
      };
      user_phone_numbers: {
        Row: UserPhoneNumber;
        Insert: Omit<UserPhoneNumber, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserPhoneNumber, 'created_at' | 'updated_at'>>;
      };
      user_addresses: {
        Row: UserAddress;
        Insert: Omit<UserAddress, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserAddress, 'created_at' | 'updated_at'>>;
      };
    };
  };
}
