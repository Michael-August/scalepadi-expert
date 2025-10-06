"use client";

import { useState, KeyboardEvent } from "react";
import { useController } from "react-hook-form";
import { X } from "lucide-react";

interface TagsInputFieldProps {
	name: string;
	label: string;
	placeholder?: string;
	rules?: any;
}

const TagsInputField = ({
	name,
	label,
	placeholder,
	rules,
}: TagsInputFieldProps) => {
	const { field, fieldState } = useController({ name, rules });
	const [inputValue, setInputValue] = useState("");

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			if (
				inputValue.trim() &&
				!field.value?.includes(inputValue.trim())
			) {
				field.onChange([...(field.value || []), inputValue.trim()]);
				setInputValue("");
			}
		}
	};

	const removeTag = (tag: string) => {
		field.onChange(field.value.filter((t: string) => t !== tag));
	};

	return (
		<div className="flex flex-col gap-1">
			<label className="block text-sm">{label}</label>
			<div className="flex flex-wrap gap-2 rounded-[14px] py-2 px-3 border border-[#D1DAEC]">
				{field.value?.map((tag: string, idx: number) => (
					<div
						key={idx}
						className="flex items-center gap-1 bg-primary text-white rounded-lg px-2 py-1 text-sm"
					>
						{tag}
						<X
							size={14}
							className="cursor-pointer"
							onClick={() => removeTag(tag)}
						/>
					</div>
				))}
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder || "Type and press Enter..."}
					className="flex-1 min-w-[150px] outline-none border-none text-sm"
				/>
			</div>
			<span className="text-xs text-gray-500">
				Type a {label} and hit enter key to add more, multiple {label}{" "}
				can be entered
			</span>
			{fieldState.error && (
				<p className="text-red-500 text-sm">
					{fieldState.error.message}
				</p>
			)}
		</div>
	);
};

export default TagsInputField;
