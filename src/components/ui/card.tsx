import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("glass-panel rounded-lg", className)}>{children}</div>;
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border-soft bg-white shadow-sm shadow-blue-900/5 dark:bg-white/5",
        className,
      )}
    >
      {children}
    </div>
  );
}
