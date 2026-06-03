import { AdminAuthGuard } from "@/components/auth/admin-auth-guard";
import { AppShell } from "@/components/layout/app-shell";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <AppShell>{children}</AppShell>
    </AdminAuthGuard>
  );
}
