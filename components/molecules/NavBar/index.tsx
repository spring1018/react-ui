"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";

// import { MobileNav } from "@/components/mobile-nav";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

interface NavBarProps {
  logoIcon?: React.ReactNode;
  logoText?: string;
  items?: NavItem[];
  children?: React.ReactNode;
}

export function NavBar({ logoIcon, logoText, items, children }: NavBarProps) {
  const segment = useSelectedLayoutSegment(); // ERROR: storybook でエラーが発生する
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        {logoIcon || null}
        <span className="hidden font-bold sm:inline-block">
          {logoText || "Logo"}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      {/* <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )} */}
    </div>
  );
}
