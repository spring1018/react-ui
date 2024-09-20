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
	textColor?: string;
	logoIcon?: React.ReactNode;
	logoText?: string;
	logoLink?: string;
	items: NavItem[];
	session: any;
}

export default function AuthNavBar({
	bgColor = "bg-white",
	textColor = "text-black",
	logoText,
	logoIcon,
	logoLink = "/",
	items,
	session,
}: AuthNavBarProps) {
	return (
		<header className={cn(bgColor, "sticky top-0 z-40")}>
			<div className="flex h-16 items-center justify-between p-6">
				<NavBar
					textColor={textColor}
					logoIcon={logoIcon}
					logoText={logoText}
					logoLink={logoLink}
					items={items}
				/>
				<div className="flex items-center gap-4 ">
					<TooltipProvider delayDuration={10}>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className={cn(textColor)}>
									<p className="text-sm">{session?.user.name}</p>
									<p className="text-xs">{session?.user.role}</p>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<div>
									<div>閲覧可能な部署</div>
									{session?.user.departments.map((department) => (
										<div key={department.value}>{department.label}</div>
									))}
								</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					{session?.user ? (
						<LogoutButton variant={"secondary"} />
					) : (
						<LoginButton variant={"secondary"} />
					)}
				</div>
			</div>
			<Separator />
		</header>
	);
}
