"use client";

import Image from "next/image";
import { useClientConfig } from "@/components/providers/client-config-provider";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function LogoMark({
  className,
  imageClassName,
  priority = false,
}: LogoMarkProps) {
  const config = useClientConfig();

  return (
    <span
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-lg bg-white shadow-lg shadow-blue-500/20 ring-1 ring-blue-100",
        className,
      )}
    >
      <Image
        alt={`${config.storeName} logo mark`}
        className={cn("object-contain", imageClassName)}
        fill
        priority={priority}
        sizes="64px"
        src={config.logoMarkPath}
      />
    </span>
  );
}
