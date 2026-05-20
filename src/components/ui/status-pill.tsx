import { cn } from "@/lib/utils";

export function StatusPill({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const normalized = status.toLowerCase();
  const positive = ["active", "paid", "delivered", "resolved", "won", "ready"];
  const warning = [
    "pending",
    "partial",
    "follow-up",
    "packed",
    "backorder",
    "scheduled",
  ];
  const danger = ["critical", "cancelled", "lost", "exception", "at-risk"];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold capitalize ring-1",
        positive.includes(normalized) && "bg-emerald-50 text-emerald-700 ring-emerald-200",
        warning.includes(normalized) && "bg-amber-50 text-amber-700 ring-amber-200",
        danger.includes(normalized) && "bg-red-50 text-red-700 ring-red-200",
        !positive.includes(normalized) &&
          !warning.includes(normalized) &&
          !danger.includes(normalized) &&
          "bg-blue-50 text-blue-700 ring-blue-200",
        className,
      )}
    >
      {status.replaceAll("-", " ")}
    </span>
  );
}
