"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContactNavLinkProps = {
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "style">;

/** Placeholder — opens contact anchor until Samrāya contact modal is wired. */
export function ContactNavLink({
  className,
  children,
  style,
  onNavigate,
}: ContactNavLinkProps) {
  return (
    <Link
      href="/#contact"
      onClick={() => onNavigate?.()}
      className={cn(className)}
      style={style}
    >
      {children}
    </Link>
  );
}
