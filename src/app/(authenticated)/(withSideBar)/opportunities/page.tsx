"use client";

import { Button } from "@/components/ui/button";
import {
	useAcceptDeclineHire,
	useAcceptDeclineMatch,
	useGetBusinessHire,
	useGetProjects,
} from "@/hooks/useProject";
import { Calendar, CalendarIcon, Clock, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

type FormValues = {
	price: number;
	dueDate: Date | null;
};

const Opportunities = () => {
	const [activeTab, setActiveTab] = useState<"admin" | "business">("admin");
	const [showDeclineModal, setShowDeclineModal] = useState(false);
	const [showAcceptModal, setShowAcceptModal] = useState(false);
	const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
		null
	);
	const [project, setProject] = useState<any | null>(null);

	const methods = useForm<FormValues>({
		defaultValues: {
			price: 0,
			dueDate: null,
		},
	});

	const { handleSubmit, control, register, formState } = methods;

	const [params, setParams] = useState({ status: "pending" });

	const [user, setUser] = useState<any>();

	const { projects, isLoading } = useGetProjects();
	const { hires, isLoading: isLoadingHires } = useGetBusinessHire();
	const { acceptOrDecline, isPending } = useAcceptDeclineMatch();
	const { acceptOrDeclineHire, isPending: isPendingHire } =
		useAcceptDeclineHire();
	const router = useRouter();
	const [open, setOpen] = useState(false);

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
		if (action === "accepted") {
			payload.cost = price;
			payload.dueDate = dueDate
				? new Date(dueDate).toISOString()
				: undefined;
		}
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

	const handleAcceptDeclineHire = (
		action: "accepted" | "declined",
		hireId: string
	) => {
		if (!hireId) {
			return;
		}
		acceptOrDeclineHire(
			{ expertStatus: action, hireId },
			{
				onSuccess: () => {
					toast.success(`Hire ${action} successfully`);
					if (action === "declined") {
						router.push("/opportunities");
						return;
					}
					router.push(`/opportunities/`);
				},
				onError: () => {
					toast.error(
						`Error ${
							action === "accepted" ? "accepting" : "declining"
						} hire`
					);
				},
			}
		);
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
		setSelectedProjectId(projectId);
		setShowDeclineModal(true);
	};

	const handleConfirmDecline = () => {
		if (selectedProjectId) {
			handleAcceptDecline("declined", selectedProjectId);
		}
		setShowDeclineModal(false);
		setSelectedProjectId(null);
	};

	const handleCancelDecline = () => {
		setShowDeclineModal(false);
		setSelectedProjectId(null);
	};

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	useEffect(() => {
		setParams({ status: activeTab === "admin" ? "pending" : "completed" });
	}, [activeTab]);

	//   console.log(projects.data)

	return (
		<div className="w-full flex flex-col gap-4 lg:w-[919px]">
			<div className="flex w-full flex-col gap-6">
				<div className="page-heading flex flex-col gap-2">
					<span className="text-[#1A1A1A] font-bold text-2xl">
						New Opportunities
					</span>
					<span className="text-[#1A1A1A] font-normal text-base">
						Here are opportunities for you.
					</span>
				</div>

				<div className="w-full lg:w-[895px] pb-10">
					<div className="tab pt-2 w-1/2 flex items-center gap-5 bg-[#F9FAFB]">
						<div
							className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                            hover:border-[#3A96E8] transition-colors 
                            ${
								activeTab === "admin"
									? "border-[#3A96E8] text-[#3A96E8]"
									: "border-transparent"
							}`}
							onClick={() => setActiveTab("admin")}
						>
							<span className="text-sm">Project Invites</span>
						</div>

						<div
							className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                            hover:border-[#3A96E8] transition-colors 
                            ${
								activeTab === "business"
									? "border-[#3A96E8] text-[#3A96E8]"
									: "border-transparent"
							}`}
							onClick={() => setActiveTab("business")}
						>
							<span className="text-sm">Business Hires</span>
						</div>
					</div>

					{activeTab === "admin" && (
						<div className="rounded-3xl gap-3 w-full border border-[#D1DAEC80] hide-scrollbar p-3 h-[862px] overflow-y-scroll">
							<div className="h-full flex flex-col gap-4 w-full bg-[#FBFCFC] rounded-3xl p-3 hide-scrollbar overflow-y-scroll">
								{projects?.data?.length === 0 && !isLoading && (
									<div className="flex flex-col gap-2 items-center justify-center h-full">
										<span className="text-sm text-[#878A93]">
											No opportunities available at the
											moment
										</span>
									</div>
								)}

								{isLoading && (
									<div className="flex flex-col gap-2 items-center justify-center h-full">
										<span className="text-sm text-[#878A93]">
											Loading opportunities...
										</span>
									</div>
								)}

								{projects?.data?.map((project: any) => (
									<div
										key={project.id}
										className="opportunity w-full p-3 rounded-2xl flex flex-col gap-2"
									>
										<div className="top border-b border-primary-border pb-3 w-full flex items-center gap-3">
											<div className="bg-[#D1F7FF] flex items-center justify-center p-[5.84px] text-[#1A1A1A] text-xs h-[54px] w-[54px] rounded-[11.68px]">
												{project?.businessId?.title
													?.trim()
													.split(" ")[0] || "B"}
											</div>
											<div className="flex flex-col gap-2">
												<span className="text-sm text-[#878A93] ">
													{project?.title}
												</span>
												<div className="items-center gap-2 flex">
													<span className="flex items-center gap-[2px] text-sm text-[#878A93]">
														<Users2 className="w-4 h-4" />
														Members:{" "}
														<span className="text-[#121217]">
															{project?.experts
																?.length || "0"}
														</span>
													</span>
													<span className="flex items-center gap-[2px] text-sm text-[#878A93]">
														<Clock className="w-4 h-4" />
														Due:{" "}
														<span className="text-[#121217]">
															{moment(
																project?.dueDate
															).format(
																"DD MMM, YYYY"
															) || "N/A"}
														</span>
													</span>
												</div>
											</div>
											<div className="flex flex-col gap-1">
												<span className="text-sm text-[#878A93] opacity-0">
													Hi
												</span>
												<div className="items-center gap-1 flex">
													<span className="flex items-center gap-[2px] text-sm text-[#878A93]">
														<Calendar className="w-4 h-4" />
														Availability:{" "}
														<span className="text-[#121217]">
															{project?.availability ||
																"N/A"}
														</span>
													</span>
												</div>
											</div>
										</div>

										<div className="flex flex-col gap-4 rounded-[14px] bg-white border border-[#D1DAEC] p-4">
											<div className="flex items-center gap-1">
												<span className="text-sm text-[#878A93]">
													Role:{" "}
												</span>
												<span className="font-medium text-[#1A1A1A] text-sm">
													{project?.role || "N/A"}
												</span>
											</div>
											<div className="flex flex-col gap-2">
												<span className="text-[#1A1A1A] text-sm">
													Project brief
												</span>
												<span className="text-[#727374] text-sm">
													{project?.brief || "N/A"}
												</span>
											</div>
											<div className="flex flex-col gap-2">
												<span className="text-[#1A1A1A] text-sm">
													Goal
												</span>
												<span className="text-[#727374] text-sm">
													{project?.goal || "N/A"}
												</span>
												{/* <div className="flex items-center gap-2 flex-wrap">
                                                    {project?.skills?.map((skill: string, idx: number) => 
                                                        <span key={idx} className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">{skill}</span>
                                                    )}
                                                </div> */}
											</div>
										</div>

										{project?.experts?.some(
											(expert: any) =>
												expert.id.id === user.id &&
												expert.status === "pending"
										) && (
											<div className="flex gap-4">
												<Button
													disabled={isPending}
													onClick={() => {
														setProject(project);
														setShowAcceptModal(
															true
														);
													}}
													className="bg-primary text-white w-fit text-xs rounded-[14px] px-4 py-6"
												>
													{isPending
														? "Accepting match..."
														: "Accept Match"}
												</Button>
												<Button
													disabled={isPending}
													variant={"destructive"}
													onClick={() =>
														handleDeclineClick(
															project.id
														)
													}
													className="w-fit text-xs rounded-[14px] px-4 py-6"
												>
													{isPending
														? "Declining match..."
														: "Decline Match"}
												</Button>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					)}
					{activeTab === "business" && (
						<div className="rounded-3xl gap-3 w-full border border-[#D1DAEC80] hide-scrollbar p-3 h-[862px] overflow-y-scroll">
							<div className="h-full flex flex-col gap-4 w-full bg-[#FBFCFC] rounded-3xl p-3 hide-scrollbar overflow-y-scroll">
								{hires?.data?.data?.length === 0 &&
									!isLoadingHires && (
										<div className="flex flex-col gap-2 items-center justify-center h-full">
											<span className="text-sm text-[#878A93]">
												No opportunities available at
												the moment
											</span>
										</div>
									)}

								{isLoadingHires && (
									<div className="flex flex-col gap-2 items-center justify-center h-full">
										<span className="text-sm text-[#878A93]">
											Loading opportunities...
										</span>
									</div>
								)}

								{hires?.data?.data?.map((hire: any) => (
									<div
										key={hire?.id}
										className="flex flex-col gap-4 rounded-[14px] bg-white border border-[#D1DAEC] p-4"
									>
										<div className="flex flex-col gap-2">
											<span className="text-[#1A1A1A] text-sm">
												Project brief
											</span>
											<span className="text-[#727374] text-sm">
												{hire?.description || "N/A"}
											</span>
										</div>
										<div className="flex flex-col gap-2">
											<span className="text-[#1A1A1A] text-sm">
												Budget
											</span>
											<span className="text-[#727374] text-sm">
												{hire?.budget.toLocaleString() ||
													"N/A"}
											</span>
										</div>
										<div className="flex flex-col gap-2">
											<span className="text-[#1A1A1A] text-sm">
												Duration
											</span>
											<span className="text-[#727374] text-sm">
												{hire?.duration || "N/A"}
											</span>
										</div>

										{hire?.expertStatus ===
											"awaiting-response" && (
											<div className="flex gap-4">
												<Button
													disabled={isPendingHire}
													onClick={() =>
														handleAcceptDeclineHire(
															"accepted",
															hire.id
														)
													}
													className="bg-primary text-white w-fit text-xs rounded-[14px]"
												>
													{isPendingHire
														? "Accepting..."
														: "Accept"}
												</Button>
												<Button
													disabled={isPendingHire}
													variant={"destructive"}
													onClick={() =>
														handleAcceptDeclineHire(
															"declined",
															hire.id
														)
													}
													className="w-fit text-xs rounded-[14px]"
												>
													{isPendingHire
														? "Declining..."
														: "Decline"}
												</Button>
											</div>
										)}
										{hire?.expertStatus === "accepted" && (
											<span className="text-sm text-green-600 font-medium">
												You have accepted this hire.
											</span>
										)}
										{hire?.expertStatus === "declined" && (
											<span className="text-sm text-red-600 font-medium">
												You have declined this hire.
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<Dialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
				<DialogContent className="!rounded-3xl">
					<DialogTitle>Decline Opportunity</DialogTitle>
					<div className="flex flex-col gap-4 mt-2">
						<span className="text-sm text-[#878A93]">
							Are you sure you want to decline this opportunity?
							This action cannot be undone.
						</span>
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
							handleConfirm(
								"accepted",
								selectedProjectId as string
							)
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
													<DatePicker
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

export default Opportunities;
