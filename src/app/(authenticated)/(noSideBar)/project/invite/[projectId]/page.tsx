"use client";

import { useAcceptDeclineMatch, useGetProject } from "@/hooks/useProject";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type FormValues = {
	price: number;
	dueDate: Date | null;
};

const ProjectInvitePage = () => {
	const [showDeclineModal, setShowDeclineModal] = useState(false);
	const [showAcceptModal, setShowAcceptModal] = useState(false);
	const { projectId } = useParams();
	const [open, setOpen] = useState(false);

	const methods = useForm<FormValues>({
		defaultValues: {
			price: 0,
			dueDate: null,
		},
	});

	const { handleSubmit, control, register, formState } = methods;

	const { project, isLoading } = useGetProject(projectId as string);

	const { acceptOrDecline, isPending } = useAcceptDeclineMatch();
	const router = useRouter();

	const handleAcceptDecline = (
		action: "accepted" | "declined",
		projectId: string,
		price?: number,
		dueDate?: Date | null
	) => {
		if (!projectId) {
			return;
		}
		const payload: any = {
			response: action,
			projectId,
		};
		// if (action === "accepted") {
		// 	payload.cost = price;
		// 	payload.dueDate = dueDate
		// 		? new Date(dueDate).toISOString()
		// 		: undefined;
		// }
		acceptOrDecline(payload, {
			onSuccess: () => {
				toast.success(`Project ${action} successfully`);
				if (action === "declined") {
					handleConfirmDecline();
					router.push("/opportunities");
					return;
				}
				setShowAcceptModal(false);
				router.push(`/projects/${projectId}`);
			},
			onError: () => {
				toast.error(
					`Error ${
						action === "accepted" ? "accepting" : "declining"
					} project`
				);
			},
		});
	};

	const handleConfirm = (
		action: "accepted" | "declined",
		projectId: string
	) =>
		handleSubmit((data) => {
			// now you have form data + other arguments
			handleAcceptDecline(action, projectId, data.price, data.dueDate);
		});

	const handleDeclineClick = (projectId: string) => {
		setShowDeclineModal(true);
	};

	const handleConfirmDecline = () => {
		setShowDeclineModal(false);
	};

	const handleCancelDecline = () => {
		setShowDeclineModal(false);
	};

	const formattedText = project?.data?.brief
		.replace(/\\r\\n/g, "<br />")
		.replace(/\\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");

	return (
		<div className="flex flex-col gap-10 pb-20">
			<div className="flex w-full px-14 py-4 flex-col gap-6">
				<div className="flex flex-col gap-4">
					<span className="font-semibold text-xl text-black">
						Project Title
					</span>
					<div
						className="whitespace-pre-line text-sm text-[#727374] leading-relaxed"
						dangerouslySetInnerHTML={{
							__html: formattedText,
						}}
					/>
					<span className="text-base text-[#878A93]">
						Goal: {project?.data?.goal}
					</span>
				</div>

				<div className="flex flex-col gap-4">
					<span className="font-semibold text-xl text-black">
						Project Details
					</span>
					<div className="flex flex-col gap-2">
						<div className="flex gap-2">
							<span className="font-medium text-sm text-[#878A93] w-32">
								Client Name:
							</span>
							<span className="text-sm text-black">
								{project?.data?.businessId?.name}
							</span>
						</div>
						<div className="flex gap-2">
							<span className="font-medium text-sm text-[#878A93] w-32">
								Company:
							</span>
							<span className="text-sm text-black">
								{project?.data?.businessId?.title}
							</span>
						</div>
						{/* <div className="flex gap-2">
                        <span className="font-medium text-sm text-[#878A93] w-32">Email:</span>
                        <span className="text-sm text-black">{project?.data?.businessId?.email}</span>
                        </div>
                        <div className="flex gap-2">
                        <span className="font-medium text-sm text-[#878A93] w-32">Phone:</span>
                        <span className="text-sm text-black">{project?.data?.businessId?.phone}</span>
                        </div> */}
						<div className="flex gap-2">
							<span className="font-medium text-sm text-[#878A93] w-32">
								Due Date:
							</span>
							<span className="text-sm text-black">
								{new Date(
									project?.data?.dueDate
								).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</span>
						</div>
						<div className="flex gap-2">
							<span className="font-medium text-sm text-[#878A93] w-32">
								Status:
							</span>
							<span className="text-sm capitalize text-black">
								{project?.data?.status}
							</span>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<span className="font-semibold text-xl text-black">
						Resources
					</span>
					<div className="flex gap-4">
						{project?.data?.resources.map(
							(url: string, idx: number) => (
								<img
									key={idx}
									src={url}
									alt="Project resource"
									className="w-40 h-28 object-cover rounded-md border"
								/>
							)
						)}
					</div>
				</div>
				<div className="flex gap-4">
					<Button
						disabled={isPending}
						onClick={() =>
							handleAcceptDecline("accepted", projectId as string)
						}
						className="bg-primary text-white w-fit text-xs rounded-[14px] px-4 py-6"
					>
						{isPending ? "Accepting match..." : "Accept Match"}
					</Button>
					<Button
						disabled={isPending}
						variant={"destructive"}
						onClick={() => handleDeclineClick(project.id)}
						className="w-fit text-xs rounded-[14px] px-4 py-6"
					>
						{isPending ? "Declining match..." : "Decline Match"}
					</Button>
				</div>
			</div>

			<Dialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
				<DialogContent className="!rounded-3xl">
					<DialogTitle>Decline Opportunity</DialogTitle>
					<div className="flex flex-col gap-4 mt-2">
						<div className="form-group flex flex-col gap-2">
							<Label>
								Select Reason for Rejection{" "}
								<span className="text-red-600">*</span>
							</Label>
							<Select>
								<SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
									<SelectValue placeholder="Select Reason" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="expert">
											Lack of clarity
										</SelectItem>
										<SelectItem value="business">
											Not interested
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="flex gap-2 justify-end">
							<Button
								variant="outline"
								onClick={handleCancelDecline}
							>
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={handleConfirmDecline}
								disabled={isPending}
							>
								{isPending ? "Declining..." : "Confirm Decline"}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog open={showAcceptModal} onOpenChange={setShowAcceptModal}>
				<DialogContent className="!rounded-3xl">
					<DialogTitle>Submit Offer</DialogTitle>

					<form
						onSubmit={() =>
							handleConfirm("accepted", projectId as string)
						}
						className="flex flex-col gap-4 mt-2"
					>
						{/* Price */}
						<div className="flex flex-col gap-2">
							<Label>
								Price <span className="text-red-600">*</span>
							</Label>
							<Input
								type="number"
								placeholder="Enter price"
								className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
								{...register("price", {
									required: "Price is required",
									min: {
										value: 1,
										message: "Price must be greater than 0",
									},
								})}
							/>
							{formState.errors.price && (
								<span className="text-red-500 text-sm">
									{formState.errors.price.message}
								</span>
							)}
						</div>

						{/* Due Date */}
						<div className="form-group flex flex-col gap-2">
							<Label>
								Due Date <span className="text-red-600">*</span>
							</Label>
							<Controller
								name="dueDate"
								control={control}
								rules={{
									required: "Due date is required",
									validate: (value) => {
										if (
											value &&
											new Date(value) >
												project?.data?.dueDate
										) {
											return `Due date cannot exceed ${format(
												project?.data?.dueDate,
												"PPP"
											)}`;
										}
										return true;
									},
								}}
								render={({ field, fieldState }) => {
									const handleSelect = (
										date: Date | undefined
									) => {
										field.onChange(date);
										setOpen(false);
									};

									return (
										<>
											<Popover
												open={open}
												onOpenChange={setOpen}
											>
												<PopoverTrigger asChild>
													<Button
														type="button"
														variant="outline"
														className={cn(
															"w-full justify-start text-left font-normal rounded-[14px] py-6 px-4 border border-[#D1DAEC]",
															!field.value &&
																"text-muted-foreground"
														)}
													>
														<CalendarIcon className="mr-2 h-4 w-4" />
														{field.value
															? format(
																	new Date(
																		field.value
																	),
																	"PPP"
															  )
															: "Select due date"}
													</Button>
												</PopoverTrigger>
												<PopoverContent
													className="w-auto p-0"
													align="start"
												>
													<Calendar
														mode="single"
														selected={
															field.value
																? new Date(
																		field.value
																  )
																: undefined
														}
														onSelect={handleSelect}
														disabled={(date) =>
															date >
															project?.data
																?.dueDate
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>

											{fieldState.error && (
												<span className="text-red-500 text-sm mt-1">
													{fieldState.error.message}
												</span>
											)}
										</>
									);
								}}
							/>
						</div>

						{/* Buttons */}
						<div className="flex gap-2 justify-end mt-2">
							<Button
								variant="outline"
								type="button"
								onClick={() => setShowAcceptModal(false)}
							>
								Cancel
							</Button>
							<Button
								variant="default"
								type="submit"
								disabled={isPending}
							>
								{isPending ? "Submitting..." : "Submit Offer"}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ProjectInvitePage;
