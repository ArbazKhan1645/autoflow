import type { UserRole } from "@/models";

export interface NavigationItem {
  label: string;
  href: string;
  icon: string;
  roles: UserRole[];
  badge?: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/crm/dashboard",
    icon: "LayoutDashboard",
    roles: ["owner", "admin", "sales", "inventory", "support"],
  },
  {
    label: "Products",
    href: "/crm/products",
    icon: "PackageSearch",
    roles: ["owner", "admin", "sales", "inventory", "support"],
  },
  {
    label: "Categories",
    href: "/crm/categories",
    icon: "Layers3",
    roles: ["owner", "admin", "inventory"],
  },
  {
    label: "Orders",
    href: "/crm/orders",
    icon: "ShoppingCart",
    roles: ["owner", "admin", "sales"],
  },
  {
    label: "Customers",
    href: "/crm/customers",
    icon: "Users",
    roles: ["owner", "admin", "sales", "support"],
  },
  {
    label: "Accounts",
    href: "/crm/accounts",
    icon: "UserCog",
    roles: ["owner", "admin"],
  },
  {
    label: "Inventory",
    href: "/crm/inventory",
    icon: "Warehouse",
    roles: ["owner", "admin", "inventory"],
    badge: "Live",
  },
  {
    label: "Content",
    href: "/crm/content",
    icon: "FilePenLine",
    roles: ["owner", "admin", "support"],
  },
  {
    label: "AI Console",
    href: "/crm/ai",
    icon: "Bot",
    roles: ["owner", "admin", "sales", "support"],
  },
  {
    label: "AI Calling",
    href: "/crm/ai/calling",
    icon: "PhoneCall",
    roles: ["owner", "admin", "support"],
  },
  {
    label: "Analytics",
    href: "/crm/analytics",
    icon: "ChartSpline",
    roles: ["owner", "admin", "sales", "inventory"],
  },
  {
    label: "Export",
    href: "/crm/exports",
    icon: "Globe2",
    roles: ["owner", "admin", "sales"],
  },
  {
    label: "Notifications",
    href: "/crm/notifications",
    icon: "Bell",
    roles: ["owner", "admin", "sales", "inventory", "support"],
  },
  {
    label: "Settings",
    href: "/crm/settings",
    icon: "Settings",
    roles: ["owner", "admin"],
  },
];
