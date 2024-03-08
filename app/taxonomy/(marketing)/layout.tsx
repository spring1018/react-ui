import Link from "next/link";

import { NavBar } from "@/components/molecules/NavBar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const items = [
  { title: "Home", href: "/taxonomy" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <NavBar items={items} />
          <nav>
            <Link
              href="taxonomy/dashboard"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4",
              )}
            >
              SignIn
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  );
}
