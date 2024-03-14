import { Separator } from "@/components/ui/separator";
import { LoginButton } from "../LoginButton";
import { LogoutButton } from "../LogoutButton";
import { NavBar } from "../NavBar";

type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

interface AuthNavBarProps {
  logo?: string;
  items: NavItem[];
  session: any;
}

export default function AuthNavBar({ logo, items, session }: AuthNavBarProps) {
  return (
    <header className="bg-white sticky top-0 mx-8 z-40">
      <div className="flex h-20 items-center justify-between py-6">
        <NavBar logo={logo} items={items} />
        {session?.user ? <LogoutButton /> : <LoginButton />}
      </div>
      <Separator />
    </header>
  );
}
