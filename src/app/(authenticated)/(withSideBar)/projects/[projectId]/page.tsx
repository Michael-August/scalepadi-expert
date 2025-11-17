"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Users2,
	Clock,
	Church,
	Download,
	File,
	Plus,
	X,
	Link as URL,
	Link2,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
	useAcceptDeclineTask,
	useGetProject,
	useGetTask,
	useGetTasksForProject,
	useSubmitTask,
} from "@/hooks/useProject";
import moment from "moment";
import ProjectSkeleton from "@/components/skeletons/project-details.skeleton";
import TaskDeliverableSkeleton from "@/components/skeletons/Task-deliverables.skeleton";
import { toast } from "sonner";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Modal from "@/components/modal";
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

const ProjectDetails = () => {
	const [activeTab, setActiveTab] = useState<
		"projectOverview" | "taskTracker"
	>("projectOverview");
	const { projectId } = useParams();

	const [taskId, setTaskId] = useState("");
	const [links, setLinks] = useState<string[]>([]);
	const [documents, setDocuments] = useState<{ title: string; file: File }[]>(
		[]
	);

	const methods = useForm<FormValues>({
		defaultValues: {
			price: 0,
			dueDate: null,
		},
	});

	const [reason, setReason] = useState("");

	const { handleSubmit, control, register, formState } = methods;

	const [openTaskDeliverablesForm, setOpenTaskDeliverablesForm] =
		useState(false);
	const [showDeclineModal, setShowDeclineModal] = useState(false);
	const [showAcceptModal, setShowAcceptModal] = useState(false);
	const [openTaskSuccessModal, setOpenTaskSuccessModal] = useState(false);
	const [addLink, setAddLink] = useState(false);
	const [linkUrl, setLinkUrl] = useState("");

	const [open, setOpen] = useState(false);

	const { project, isLoading } = useGetProject(projectId as string);
	const { tasks, isLoading: isLoadingTasks } = useGetTasksForProject(
		projectId as string
	);
	const { task, isLoading: isLoadingTask } = useGetTask(taskId);
	const { submitTask, isPending } = useSubmitTask(taskId);

	const [selectedTask, setSelectedTask] = useState("");

	const { acceptOrDeclineTask, isPending: isAcceptingDecliningTask } =
		useAcceptDeclineTask(projectId as string);

	const router = useRouter();

	const handleAddDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;

		const newDocs = Array.from(files).map((file) => ({
			title: file.name,
			file,
		}));

		setDocuments((prev) => [...prev, ...newDocs]);
	};

	const onSubmitTask = (e: any) => {
		e.preventDefault();
		if (links.length === 0 && documents.length === 0) {
			toast.warning("Please add at least one link or document.");
			return;
		}

		const formData = new FormData();
		links.forEach((link, index) =>
			formData.append(`submission[${index}]`, link)
		);
		documents.forEach((doc) => formData.append("files", doc.file));

		submitTask(formData, {
			onSuccess: () => {
				setOpenTaskDeliverablesForm(false);
				setOpenTaskSuccessModal(true);
				setLinks([]);
				setDocuments([]);
			},
			onError: (error) => {
				toast.error(`Error submitting task: ${error}`);
			},
		});
	};

	const handleAcceptDecline = (
		action: "accepted" | "declined",
		taskId: string,
		price?: number,
		dueDate?: Date | null
	) => {
		if (!taskId) {
			return;
		}
		const payload: any = {
			status: action,
			taskId,
		};
		if (action === "accepted") {
			payload.cost = price;
			payload.dueDate = dueDate
				? new Date(dueDate).toISOString()
				: undefined;
		}

		if (action === "declined") {
			payload.declineReason = reason;
		}
		acceptOrDeclineTask(payload, {
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

	const handleConfirm = (action: "accepted" | "declined", taskId: string) =>
		handleSubmit((data) => {
			// now you have form data + other arguments
			handleAcceptDecline(action, taskId, data.price, data.dueDate);
		});

	const handleDeclineClick = () => {
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

	const LoadingState = () => (
		<div className="flex flex-col gap-6">
			<Skeleton className="h-6 w-40" />
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-5/6" />
			<Skeleton className="h-4 w-2/3" />
		</div>
	);

	return (
		<div className="flex w-full flex-col gap-6">
			{/* Header */}
			<div className="flex flex-col gap-4 border-b border-[#EDEEF3] pb-4">
				<div className="heading w-full bg-[#F8F8F8] py-4 px-6 flex items-center gap-2">
					<span
						onClick={() => window.history.back()}
						className="text-[#1746A2AB] text-sm font-medium cursor-pointer hover:underline"
					>
						Back to My Projects
					</span>
					<span className="text-[#CFD0D4] text-sm">/</span>
					<span className="text-[#1A1A1A] text-sm font-medium">
						{project?.data?.title || "Project Details"}
					</span>
				</div>

				<div className="flex w-full items-center justify-between">
					{isLoading ? (
						<Skeleton className="h-16 w-full rounded-xl" />
					) : (
						<div className="flex w-full items-center gap-3">
							<div className="bg-[#D1F7FF] flex items-center justify-center p-[5.84px] text-[#1A1A1A] text-xs h-[54px] w-[54px] rounded-[11.68px]">
								{project?.data?.businessId?.name
									?.trim()
									.split(" ")[0] || "Client"}
							</div>
							<div className="flex flex-col gap-2">
								<span className="text-sm text-[#878A93] ">
									{project?.data?.title}
								</span>
								<div className="items-center gap-2 flex">
									<span className="flex items-center gap-[2px] text-sm text-[#878A93]">
										<Users2 className="w-4 h-4" />
										Members:{" "}
										<span className="text-[#121217]">
											{project?.data?.experts?.length ??
												0}
										</span>
									</span>
									<span className="flex items-center gap-[2px] text-sm text-[#878A93]">
										<Clock className="w-4 h-4" />
										Due:{" "}
										<span className="text-[#121217]">
											{moment(
												project?.data?.dueDate
											).format("MMMM DD")}
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
										<Church className="w-4 h-4" />
										Status:{" "}
										<span className="text-[#121217] capitalize">
											{project?.data?.status || "N/A"}
										</span>
									</span>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Tabs */}
			<div className="project-details w-full lg:w-[895px] pb-10">
				<div className="tab pt-2 w-1/2 flex items-center gap-5 bg-[#F9FAFB] rounded-t-2xl">
					{["projectOverview", "taskTracker"].map((tab) => (
						<div
							key={tab}
							onClick={() => setActiveTab(tab as any)}
							className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3 text-sm transition-colors ${
								activeTab === tab
									? "border-[#3A96E8] text-[#3A96E8]"
									: "border-transparent text-[#727374] hover:text-[#3A96E8]"
							}`}
						>
							{tab === "projectOverview"
								? "Project Overview"
								: "Task Tracker"}
						</div>
					))}
				</div>

				{/* Project Overview */}
				{/* {activeTab === "projectOverview" && (
          <div className="w-full border border-[#F2F2F2] rounded-2xl p-6 flex flex-col gap-6 bg-white">
            {isLoading ? (
              <ProjectSkeleton />
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <span className="text-[#1A1A1A] text-sm font-medium">
                    Project Brief
                  </span>
                  <span className="text-sm text-[#727374] whitespace-pre-wrap">
                    {project?.data?.brief || "No brief provided."}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[#1A1A1A] text-sm font-medium">
                    Goal
                  </span>
                  <span className="text-sm text-[#727374]">
                    {project?.data?.goal || "No goal specified."}
                  </span>
                </div>

                {project?.data?.resources?.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[#1A1A1A] text-sm font-medium">
                      Resources
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {project?.data?.resources?.map(
                        (resource: string, i: number) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 bg-[#F7F9F9] rounded-xl border border-[#EDEEF3]"
                          >
                            <File className="w-4 h-4 text-primary" />
                            <span className="text-[#878A93] text-xs truncate max-w-[120px]">
                              {resource.split("/").pop()}
                            </span>
                            <a
                              href={resource}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                            >
                              <Download className="w-4 h-4 text-[#878A93] cursor-pointer hover:text-primary" />
                            </a>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )} */}

				{activeTab === "projectOverview" && (
					<div className="w-full border border-[#F2F2F2] rounded-2xl p-4 my-2 flex flex-col gap-6 bg-white">
						{isLoading ? (
							<ProjectSkeleton />
						) : (
							<>
								<div className="flex flex-col gap-2">
									<span className="text-[#1A1A1A] text-sm font-normal">
										Project Brief
									</span>
									<div
										className="whitespace-pre-line text-sm text-[#727374] leading-relaxed"
										dangerouslySetInnerHTML={{
											__html: formattedText,
										}}
									/>
								</div>

								<div className="flex flex-col gap-2">
									<span className="text-[#1A1A1A] text-sm font-normal">
										Goal
									</span>
									<span className="text-sm text-[#727374]">
										{project?.data?.goal ||
											"No goal specified."}
									</span>
								</div>

								<div className="flex flex-col gap-2">
									<span className="text-[#1A1A1A] text-sm font-normal">
										Challenge
									</span>
									<span className="text-sm text-[#727374]">
										{project?.data?.description ||
											"No challenge description provided."}
									</span>
								</div>

								{/* <div className="flex flex-col gap-2">
          <span className="text-[#1A1A1A] text-sm font-normal">
            Metrics to Influence
          </span>
          <ul className="list-none flex flex-col gap-2 text-sm text-[#727374]">
            <li>Weekly Sign-Ups</li>
            <li>Landing Page Conversion Rate</li>
            <li>CPA (Cost per Acquisition)</li>
            <li>Referral Rate</li>
          </ul>
        </div> */}

								{project?.data?.resources?.length > 0 && (
									<div className="flex flex-col gap-2">
										<span className="text-[#1A1A1A] text-sm font-normal">
											Resources
										</span>
										<div className="flex items-center gap-[10px] flex-wrap">
											{project?.data?.resources.map(
												(
													resourceUrl: string,
													idx: number
												) => (
													<div
														key={idx}
														className="flex items-center gap-2 p-1 bg-[#F7F9F9] rounded-3xl px-4"
													>
														<Image
															src={resourceUrl}
															alt={`Resource ${
																idx + 1
															}`}
															width={18}
															height={18}
															className="w-8 h-8 rounded-lg object-cover border"
														/>
														<span className="text-[#878A93] text-xs">
															Resource {idx + 1}
														</span>
														<a
															href={resourceUrl}
															target="_blank"
															rel="noopener noreferrer"
														>
															<Download className="w-4 h-4 text-[#878A93] cursor-pointer hover:text-primary" />
														</a>
													</div>
												)
											)}
										</div>
									</div>
								)}

								{/* <div className="flex flex-col gap-2">
          <span className="text-[#1A1A1A] text-sm font-normal">
            Deliverables
          </span>
          <ul className="list-none flex flex-col gap-2 text-sm text-[#727374]">
            <li>Project Analysis Report</li>
            <li>Implementation Plan</li>
            <li>Progress Updates</li>
            <li>Final Review</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[#1A1A1A] text-sm font-normal">Budget</span>
          <span className="text-sm text-[#727374]">
            {project?.data?.totalCost
              ? `₦${Number(project?.data?.totalCost).toLocaleString()}`
              : "No budget specified"}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[#1A1A1A] text-sm font-normal">
            Payment Status
          </span>
          <span className="text-sm text-[#727374] capitalize">
            {project?.data?.paymentStatus || "Not specified"}
          </span>
        </div> */}
							</>
						)}
					</div>
				)}

				{/* Task Tracker */}
				{activeTab === "taskTracker" && (
					<div className="w-full border border-[#F2F2F2] rounded-2xl p-6 flex flex-col gap-6 bg-white">
						<div className="flex flex-col gap-2 pb-5 border-b border-[#F2F2F2]">
							<span className="text-[#1A1A1A] text-sm font-medium">
								Tasks & Deliverables
							</span>
							<span className="text-[#727374] text-sm">
								Here’s your personalized task plan for this
								project. Complete each deliverable, upload your
								work, and mark it done when ready.
							</span>
						</div>

						{isLoadingTasks ? (
							<LoadingState />
						) : tasks?.data?.length === 0 ? (
							<div className="text-center text-[#878A93] py-10 text-sm">
								No tasks available yet.
							</div>
						) : (
							tasks?.data?.map((task: any, index: number) => (
								<div
									key={index}
									className="bg-[#FBFCFC] p-3 rounded-2xl flex flex-col gap-4 border border-[#F3F4F6]"
								>
									<span className="text-[#878A93] text-sm font-medium">
										Task {index + 1}:{" "}
										<span className="text-[#1A1A1A]">
											{task.title}
										</span>
									</span>
									<span className="text-[#727374] text-sm">
										{task.description}
									</span>

									{task.status === "in-progress" &&
										project?.data?.paymentStatus !==
											"pending" && (
											<Button
												onClick={() => {
													setTaskId(task.id);
													setOpenTaskDeliverablesForm(
														true
													);
												}}
												variant="outline"
												className="w-fit text-xs rounded-lg"
											>
												Add Task Deliverables
											</Button>
										)}

									{task?.status === "assigned" && (
										<div className="flex gap-4">
											<Button
												disabled={
													isAcceptingDecliningTask
												}
												onClick={() => {
													console.log(task?.id);
													setSelectedTask(task?.id);
													setShowAcceptModal(true);
												}}
												className="bg-primary text-white w-fit text-xs rounded-[14px] px-4 py-6"
											>
												{isAcceptingDecliningTask
													? "Accepting task..."
													: "Accept Task"}
											</Button>
											<Button
												disabled={
													isAcceptingDecliningTask
												}
												variant={"destructive"}
												onClick={() => {
													setSelectedTask(task?.id);
													handleDeclineClick();
												}}
												className="w-fit text-xs rounded-[14px] px-4 py-6"
											>
												{isAcceptingDecliningTask
													? "Declining task..."
													: "Decline Task"}
											</Button>
										</div>
									)}
								</div>
							))
						)}
					</div>
				)}
			</div>

			{/* Task Deliverables Modal */}
			<Dialog
				open={openTaskDeliverablesForm}
				onOpenChange={setOpenTaskDeliverablesForm}
			>
				<DialogContent className="!rounded-3xl">
					<DialogTitle>Task Deliverables Update</DialogTitle>
					{isLoadingTask ? (
						<TaskDeliverableSkeleton />
					) : (
						<form
							onSubmit={onSubmitTask}
							className="flex flex-col gap-6 mt-5"
						>
							<div className="flex flex-col gap-2">
								<Label>Task Title</Label>
								<Input
									value={task?.data?.title || ""}
									disabled
									className="rounded-[14px]"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label>Description</Label>
								<Textarea
									value={task?.data?.description || ""}
									disabled
									className="rounded-[14px]"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label>Add Link</Label>
								<Button
									type="button"
									variant="outline"
									onClick={() => setAddLink(true)}
									className="w-fit text-xs rounded-lg"
								>
									<Plus className="w-4 h-4 mr-1" /> Add task
									link
								</Button>
							</div>

							{addLink && (
								<div className="flex gap-2 items-center">
									<Input
										value={linkUrl}
										onChange={(e) =>
											setLinkUrl(e.target.value)
										}
										placeholder="https://"
										className="rounded-[14px]"
									/>
									<Button
										type="button"
										onClick={() => {
											setLinks([...links, linkUrl]);
											setAddLink(false);
											setLinkUrl("");
										}}
									>
										Add
									</Button>
								</div>
							)}

							<div className="flex flex-wrap gap-2">
								{links.map((link, i) => (
									<div
										key={i}
										className="flex items-center gap-2 border p-2 rounded-lg text-xs"
									>
										<URL className="w-4 h-4" />
										<span>{link}</span>
										<X
											className="cursor-pointer"
											onClick={() =>
												setLinks(
													links.filter(
														(item) => item !== link
													)
												)
											}
										/>
									</div>
								))}
							</div>

							<div className="flex flex-col gap-2">
								<Label>Task Documents</Label>
								<label
									htmlFor="task-upload"
									className="w-fit border p-2 rounded-lg cursor-pointer text-xs"
								>
									<Plus className="w-4 h-4 inline" /> Add
									document
								</label>
								<input
									id="task-upload"
									type="file"
									className="hidden"
									multiple
									onChange={handleAddDocument}
								/>
							</div>

							{documents.length > 0 && (
								<div className="flex flex-wrap gap-3">
									{documents.map((doc, i) => (
										<div
											key={i}
											className="flex items-center gap-2 border p-2 rounded-lg text-xs"
										>
											<File className="w-4 h-4" />
											{doc.title}
											<X
												className="cursor-pointer"
												onClick={() =>
													setDocuments(
														documents.filter(
															(d) => d !== doc
														)
													)
												}
											/>
										</div>
									))}
								</div>
							)}

							<Button
								type="submit"
								className="bg-primary text-white w-fit rounded-[14px]"
								disabled={isPending}
							>
								{isPending ? "Submitting..." : "Submit Task"}
							</Button>
						</form>
					)}
				</DialogContent>
			</Dialog>

			{/* Success Modal */}
			<Dialog
				open={openTaskSuccessModal}
				onOpenChange={setOpenTaskSuccessModal}
			>
				<DialogContent className="!rounded-3xl">
					<div className="flex flex-col items-center gap-6">
						<Image
							src="/icons/success-check.svg"
							alt="success"
							width={80}
							height={80}
						/>
						<div className="text-center">
							<p className="text-[32px] font-bold text-[#0E1426]">
								Well Done!
							</p>
							<p className="text-[#0E1426] text-lg mt-2">
								Project task submitted successfully. Kindly wait
								for feedback.
							</p>
						</div>
						<Button
							onClick={() => setOpenTaskSuccessModal(false)}
							className="bg-[#1A1A1A] text-[#FCCE37] w-fit rounded-[14px]"
						>
							Okay
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
				<DialogContent className="!rounded-3xl">
					<DialogTitle>Decline Opportunity</DialogTitle>
					<div className="flex flex-col gap-4 mt-2">
						<div className="form-group flex flex-col gap-2">
							<Label>
								Select Reason for Rejection{" "}
								<span className="text-red-600">*</span>
							</Label>
							<Select
								value={reason}
								onValueChange={(val) => setReason(val)}
							>
								<SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
									<SelectValue placeholder="Select Reason" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="Lack of clarity">
											Lack of clarity
										</SelectItem>
										<SelectItem value="Not interested">
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
								onClick={() =>
									handleAcceptDecline(
										"declined",
										selectedTask
									)
								}
								disabled={isAcceptingDecliningTask}
							>
								{isAcceptingDecliningTask
									? "Declining..."
									: "Confirm Decline"}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			<Modal
				open={showAcceptModal}
				onClose={() => setShowAcceptModal(false)}
				title="Submit Offer"
			>
				<form
					onSubmit={handleConfirm("accepted", selectedTask)}
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
									if (!value) return "Due date is required";

									const selectedDate =
										value instanceof Date
											? value
											: new Date(value);
									const projectDue =
										project?.data?.dueDate instanceof Date
											? project.data.dueDate
											: new Date(project?.data?.dueDate);

									if (selectedDate > projectDue) {
										return `Due date cannot exceed ${format(
											projectDue,
											"PPP"
										)}`;
									}

									return true; // ✅ return true only when valid
								},
							}}
							render={({ field, fieldState }) => (
								<>
									<Popover
										open={open}
										onOpenChange={setOpen}
										modal={false}
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
															field.value instanceof
																Date
																? field.value
																: new Date(
																		field.value
																  ),
															"PPP"
													  )
													: "Select due date"}
											</Button>
										</PopoverTrigger>

										<PopoverContent
											className="w-auto p-0 z-[9999]"
											align="start"
											forceMount
											onOpenAutoFocus={(e) =>
												e.preventDefault()
											}
										>
											<Calendar
												mode="single"
												selected={
													field.value instanceof Date
														? field.value
														: field.value
														? new Date(field.value)
														: undefined
												}
												onSelect={(date) => {
													if (date) {
														field.onChange(date);
														setOpen(false);
													}
												}}
												disabled={(date) =>
													project?.data?.dueDate
														? date >
														  project.data.dueDate
														: false
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
							)}
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
							disabled={isAcceptingDecliningTask}
						>
							{isAcceptingDecliningTask
								? "Submitting..."
								: "Submit Offer"}
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default ProjectDetails;
