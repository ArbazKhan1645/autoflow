import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "blue",
  className,
}: {
  children: React.ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "slate";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
        tone === "blue" && "bg-blue-50 text-blue-700 ring-blue-200",
        tone === "green" && "bg-emerald-50 text-emerald-700 ring-emerald-200",
        tone === "amber" && "bg-amber-50 text-amber-700 ring-amber-200",
        tone === "red" && "bg-red-50 text-red-700 ring-red-200",
        tone === "slate" && "bg-slate-100 text-slate-700 ring-slate-200",
        className,
      )}
    >
      {children}
    </span>
  );
}
