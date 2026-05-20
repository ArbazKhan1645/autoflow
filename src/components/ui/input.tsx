import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-950 shadow-sm outline-none ring-1 ring-slate-200/80 transition placeholder:font-medium placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-950 dark:text-white dark:ring-white/10 dark:placeholder:text-slate-400 dark:focus:ring-blue-500/25",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-slate-950 shadow-sm outline-none ring-1 ring-slate-200/80 transition focus:border-primary focus:ring-4 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-950 dark:text-white dark:ring-white/10 dark:focus:ring-blue-500/25",
        className,
      )}
      {...props}
    />
  );
}

export function SearchInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("relative block", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input className="pl-9" type="search" {...props} />
    </label>
  );
}
