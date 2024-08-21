import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  logoIcon?: React.ReactNode;
  logoText?: string;
  items: NavItem[];
  session: any;
}

export default function AuthNavBar({
  bgColor = "bg-white",
  logoText,
  logoIcon,
  items,
  session,
}: AuthNavBarProps) {
  return (
    <header className={cn(bgColor, "sticky top-0 px-6 z-40")}>
      <div className="flex h-16 items-center justify-between py-6">
        <NavBar logoIcon={logoIcon} logoText={logoText} items={items} />
        <div className="flex items-center gap-4 ">
          <TooltipProvider delayDuration={10}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-sm">
                  <p>{session?.user.name}</p>
                  <p>{session?.user.role}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  <div>閲覧可能な部署</div>
                  {session?.user.departments.map((department) => (
                    <div key={department.id}>{department.name}</div>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {session?.user ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
      <Separator />
    </header>
  );
}
