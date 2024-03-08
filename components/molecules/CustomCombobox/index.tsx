import { Combobox, ComboboxProps } from "@/components/ui/combobox";

export const CustomCombobox = (props: ComboboxProps) => {
	const { options, initialValue } = props;

	return (
		<Combobox
			options={options}
			initialValue={initialValue}
			onChange={(option: any) => {
				console.log(option);
			}}
		/>
	);
};
