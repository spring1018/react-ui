import { LoginButton } from "../LoginButton";
import { LogoutButton } from "../LogoutButton";
import { NavBar } from "../NavBar";

type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

interface AuthNavBarProps {
  items: NavItem[];
  session: any;
}

export default function AuthNavBar({ items, session }: AuthNavBarProps) {
  return (
    <header className="container z-40">
      <div className="flex h-20 items-center justify-between py-6">
        <NavBar items={items} />
        {session?.user ? <LogoutButton /> : <LoginButton />}
      </div>
    </header>
  );
}
