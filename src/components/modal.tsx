// components/Modal.tsx
"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	className?: string;
}

export default function Modal({
	open,
	onClose,
	title,
	children,
	className,
}: ModalProps) {
	useEffect(() => {
		if (open) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "auto";

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleEsc);
		return () => {
			window.removeEventListener("keydown", handleEsc);
			document.body.style.overflow = "auto";
		};
	}, [open, onClose]);

	if (!open) return null;

	return createPortal(
		<div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div
				className={cn(
					"bg-white rounded-3xl p-6 w-full max-w-md shadow-xl relative",
					className
				)}
				onClick={(e) => e.stopPropagation()} // prevent closing on inner click
			>
				{/* Header */}
				{title && (
					<div className="mb-4 flex justify-between items-center">
						<h2 className="text-lg font-semibold">{title}</h2>
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700"
						>
							✕
						</button>
					</div>
				)}

				{/* Content */}
				<div>{children}</div>
			</div>

			{/* Click outside to close */}
			<div className="absolute inset-0 z-[-1]" onClick={onClose}></div>
		</div>,
		document.body
	);
}
