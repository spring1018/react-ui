import { Button } from "@/components/ui/button";
import {
	Sheet as ShadcnSheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

type FormSheetProps = {
	text: string;
	children: React.ReactNode;
};

export function Sheet(props: FormSheetProps) {
	const { text, children } = props;
	return (
		<ShadcnSheet>
			<SheetTrigger asChild>
				<Button variant="default" className="h-8">
					{text}
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{text}</SheetTitle>
				</SheetHeader>
				{children}
				<SheetFooter>
					<SheetClose asChild></SheetClose>
				</SheetFooter>
			</SheetContent>
		</ShadcnSheet>
	);
}
