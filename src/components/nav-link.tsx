"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "transition-colors",
        active
          ? "font-semibold text-foreground"
          : "text-subtle hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
};
