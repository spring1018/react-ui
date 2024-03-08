"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface CustomSelectProps {
	options: {
		value: string;
		label: string;
	}[];
	initialValue?: string;
	onChange?: (value: string) => void;
}

export function CustomSelect(props: CustomSelectProps) {
	const { options, initialValue, onChange } = props;
	const [selectedValue, setSelectedValue] = useState<string | undefined>(
		initialValue,
	);

	const handleSelectChange = (value: string) => {
		setSelectedValue(value);
		if (onChange) {
			onChange(value);
		}
	};

	return (
		<Select defaultValue={selectedValue}>
			<SelectTrigger className="border-0 w-[180px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem
						key={option.value}
						value={option.value}
						onSelect={() => handleSelectChange(option.value)}
					>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
