export type UserRole = "owner" | "admin" | "sales" | "inventory" | "support";

export interface AppUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "inventory" | "order" | "crm" | "ai" | "system";
  severity: "info" | "success" | "warning" | "danger";
  read: boolean;
  createdAt: string;
}
