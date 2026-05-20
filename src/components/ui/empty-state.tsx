import type { LucideIcon } from "lucide-react";
import { PackageSearch } from "lucide-react";
import { Panel } from "./card";

export function EmptyState({
  title,
  description,
  icon: Icon = PackageSearch,
  action,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}) {
  return (
    <Panel className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-lg font-bold text-slate-950 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </Panel>
  );
}
