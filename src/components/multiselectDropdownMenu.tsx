"use client";

import { useState } from "react";
import { useController } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandInput,
	CommandEmpty,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MultiSelectDropdownFieldProps {
	name: string;
	label: string;
	options: string[];
	rules?: any;
}

const MultiSelectDropdownField = ({
	name,
	label,
	options,
	rules,
}: MultiSelectDropdownFieldProps) => {
	const { field, fieldState } = useController({ name, rules });
	const [open, setOpen] = useState(false);

	const toggleValue = (value: string) => {
		const current = field.value || [];
		if (current.includes(value)) {
			field.onChange(current.filter((v: string) => v !== value));
		} else {
			field.onChange([...current, value]);
		}
	};

	return (
		<div className="flex flex-col gap-1">
			<label className="block text-sm">{label}</label>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						className="w-full justify-between rounded-[14px]"
					>
						{field.value?.length
							? `${field.value.length} selected`
							: `Select ${label}...`}
						<ChevronsUpDown size={16} />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-0 max-h-80 overflow-hidden w-[var(--radix-popover-trigger-width)]">
					<Command>
						{/* SEARCH INPUT */}
						<CommandInput placeholder={`Search ${label}...`} />

						<CommandEmpty>No match found.</CommandEmpty>

						<CommandGroup className="max-h-64 overflow-auto">
							{options.map((option, idx) => {
								const selected = field.value?.includes(option);

								return (
									<CommandItem
										key={idx}
										onSelect={() => toggleValue(option)}
										className="flex items-center gap-2 cursor-pointer"
									>
										<div
											className={cn(
												"h-4 w-4 rounded border flex items-center justify-center",
												selected
													? "bg-primary border-primary"
													: "border-gray-300"
											)}
										>
											{selected && (
												<Check
													size={12}
													className="text-white"
												/>
											)}
										</div>

										<span className="text-sm">
											{option}
										</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>

			<span className="text-xs text-gray-500">
				Search and select multiple {label}.
			</span>

			{fieldState.error && (
				<p className="text-red-500 text-sm">
					{fieldState.error.message}
				</p>
			)}
		</div>
	);
};

export default MultiSelectDropdownField;
