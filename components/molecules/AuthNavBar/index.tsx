import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LoginButton } from "../LoginButton";
import { LogoutButton } from "../LogoutButton";
import { NavBar } from "../NavBar";

type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

interface AuthNavBarProps {
  bgColor?: string;
  logo?: string;
  items: NavItem[];
  session: any;
}

export default function AuthNavBar({
  bgColor = "bg-white",
  logo,
  items,
  session,
}: AuthNavBarProps) {
  return (
    <header className={cn(bgColor, "sticky top-0 px-6 z-40")}>
      <div className="flex h-16 items-center justify-between py-6">
        <NavBar logo={logo} items={items} />
        {session?.user ? <LogoutButton /> : <LoginButton />}
      </div>
      <Separator />
    </header>
  );
}
