"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users2, Clock, Church, Download, File, Plus, X, Link as URL, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetProject, useGetTask, useGetTasksForProject, useSubmitTask } from "@/hooks/useProject";
import moment from "moment";
import ProjectSkeleton from "@/components/skeletons/project-details.skeleton";
import TaskDeliverableSkeleton from "@/components/skeletons/Task-deliverables.skeleton";
import { toast } from "sonner";
import Link from "next/link";

const ProjectDetails = () => {

    const [activeTab, setActiveTab] = useState<'projectOverview' | 'taskTracker'>('projectOverview')

    const { projectId } = useParams()
    const [taskId, setTaskId] = useState("")
    
    const { project, isLoading } = useGetProject(projectId as string)
    const { tasks, isLoading: isLoadingTasks } = useGetTasksForProject(projectId as string)
    const { task, isLoading: isLoadingTask } = useGetTask(taskId)

    const [submittedLinks, setSubmittedLinks] = useState<string[]>([])
    const [submittedDocs, setSubmittedDocs] = useState<string[]>([])


    const { submitTask, isPending } = useSubmitTask(taskId)

    const [openTaskDeliverablesForm, setOpenTaskDeliverablesForm] = useState(false)
    const [openTaskSuccessModal, setOpenTaskSuccessModal] = useState(false)

    const [linkTitle, setLinkTitle] = useState('');
    const [linkUrl, setLinkUrl] = useState<any>('');

    const [addLink, setAddLink] = useState(false)

    const [links, setLinks] = useState<string[]>([])
    const [documents, setDocuments] = useState<{ title: string; file: File }[]>([]);

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

        const formData = new FormData();

        links.forEach((link, index) => {
            formData.append(`submission[${index}]`, link);
        });

        // Append files
        documents.forEach((doc) => {
            formData.append("files", doc.file); // backend expects "files"
        });

        submitTask(formData, {
            onSuccess: () => {
                setOpenTaskDeliverablesForm(false)
                setOpenTaskSuccessModal(true)
                setLinks([])
                setDocuments([])
            },
            onError: (error) => {
                toast.error(`Error submitting task: ${error}`)
            }
        })
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col gap-4 border-b border-[#EDEEF3] pb-4">
                <div className="heading w-full bg-[#F8F8F8] py-4 px-6 flex items-center gap-2">
                    <span onClick={() => window.history.back()} className="text-[#1746A2AB] text-sm font-medium cursor-pointer">Back to My projects</span>
                    <span className="text-[#CFD0D4] text-sm">/</span>
                    <span className="text-[#1A1A1A] text-sm font-medium">Growth Audit for GreenMart </span>
                    <span className="text-[#CFD0D4] text-sm">/</span>
                </div>

                 <div className="flex w-full items-center justify-between">
                    <div className="top w-full flex items-center gap-3">
                        <div className="bg-[#D1F7FF] flex items-center justify-center p-[5.84px] text-[#1A1A1A] text-xs h-[54px] rounded-[11.68px]">BlueMart</div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-[#878A93] ">{ project?.data?.title }</span>
                            <div className="items-center gap-2 flex">
                                <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                    <Users2 className="w-4 h-4" />
                                    Members: <span className="text-[#121217]">{project?.data?.experts?.length}</span>
                                </span>
                                <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                    <Clock className="w-4 h-4" />
                                    Due: <span className="text-[#121217]">{ moment(project?.data?.dueDate).format("MMMM DD") }</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-[#878A93] opacity-0">Hi</span>
                            <div className="items-center gap-1 flex">
                                <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                    <Church className="w-4 h-4" />
                                    Status: <span className="text-[#121217]">{project?.data?.status}</span>
                                </span>
                                {/* <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                    <Church className="w-4 h-4" />
                                    Role: <span className="text-[#121217]">In progress</span>
                                </span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="project-details w-full lg:w-[895px] pb-10">
                <div className="tab pt-2 w-1/2 flex items-center gap-5 bg-[#F9FAFB]">
                    <div
                        className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                        hover:border-[#3A96E8] transition-colors 
                        ${activeTab === 'projectOverview' ? 'border-[#3A96E8] text-[#3A96E8]' : 'border-transparent'}`}
                        onClick={() => setActiveTab('projectOverview')}
                    >
                        <span className="text-sm">Project Overview</span>
                    </div>

                    <div
                        className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                        hover:border-[#3A96E8] transition-colors 
                        ${activeTab === 'taskTracker' ? 'border-[#3A96E8] text-[#3A96E8]' : 'border-transparent'}`}
                        onClick={() => setActiveTab('taskTracker')}
                    >
                        <span className="text-sm">Task Tracker</span>
                    </div>
                </div>
                {activeTab === 'projectOverview' && <div className="w-full border border-[#F2F2F2] rounded-2xl p-6 flex flex-col gap-6">
                    {isLoading && <ProjectSkeleton />}
                    {!isLoading && 
                        <>
                            <div className="flex flex-col gap-2">
                                <span className="text-[#1A1A1A] text-sm font-normal">Project brief</span>
                                {/* <div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(yourContent) }}
                                /> */}
                                <span className="text-sm text-[#727374]">
                                    {project?.data?.brief}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[#1A1A1A] text-sm font-normal">Goal</span>
                                <span className="text-sm text-[#727374]">{ project?.data?.goal }</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[#1A1A1A] text-sm font-normal">Challenge</span>
                                <span className="text-sm text-[#727374]">Increase weekly customer sign-ups by 30% in 6 weeks through acquisition funnel optimization and sales outreach.</span>
                            </div>
                            {/* <div className="flex flex-col gap-2">
                                <span className="text-[#1A1A1A] text-sm font-normal">Metrics to Influence</span>
                                <ul className="list-none flex flex-col gap-2 text-sm text-[#727374]">
                                    <li>Weekly Sign-Ups</li>
                                    <li>Landing Page Conversion Rate</li>
                                    <li>CPA (Cost per Acquisition)</li>
                                    <li>Referral Rate</li>
                                </ul>
                            </div> */}
                            <div className="flex flex-col gap-2">
                                {project?.data?.resources?.length > 0 && <span className="text-[#1A1A1A] text-sm font-normal">Resources</span>}
                                {project?.data?.resources?.map((resource: string, index: number) => (
                                    <div key={index} className="flex items-center gap-[10px]">
                                        <div className="flex items-center gap-2 p-1 bg-[#F7F9F9] rounded-3xl">
                                        <File className="w-4 h-4 text-primary" />
                                        <span className="text-[#878A93] text-[8px] truncate max-w-[120px]">
                                            {resource.split("/").pop()} {/* show only file name */}
                                        </span>
                                        <a
                                            href={resource}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Download className="w-4 h-4 text-[#878A93] cursor-pointer" />
                                        </a>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                            {/* <div className="flex flex-col gap-2">
                                <span className="text-[#1A1A1A] text-sm font-normal">Deliverables</span>
                                <ul className="list-none flex flex-col gap-2 text-sm text-[#727374]">
                                    <li>Weekly Sign-Ups</li>
                                    <li>Landing Page Conversion Rate</li>
                                    <li>CPA (Cost per Acquisition)</li>
                                    <li>Referral Rate</li>
                                </ul>
                            </div> */}
                        </>
                    }
                </div>}

                {activeTab === 'taskTracker' &&
                    <div className="w-full border border-[#F2F2F2] rounded-2xl p-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-2 pb-5 border-b border-[#F2F2F2]">
                            <span className="text-[#1A1A1A] text-sm font-normal">Tasks & Deliverables</span>
                            <span className="text-[#727374] text-sm font-normal">Here’s your personalized task plan for this project.Complete each deliverable, upload your work, and mark it done when ready.</span>
                            <span className="text-sm text-[#3E4351] font-semibold">All tasks must be submitted before the final delivery is approved.</span>
                        </div>

                        {isLoadingTasks ? <div>Loading tasks...</div> : tasks?.data?.length === 0 ? <div>No tasks available</div> :
                            tasks?.data?.map((task: any, index: number) => (
                                <div key={index} className="flex flex-col gap-5">
                                    <div className="bg-[#FBFCFC] p-3 rounded-2xl flex flex-col gap-4">
                                        <span className="text-[#878A93] text-sm font-medium">Task {index + 1}: <span className="text-[#1A1A1A]">{task.title}</span></span>
                                        <span className="text-[#727374] text-sm">{task.description}</span>

                                        {/* Documents */}
                                        {((task.link && task.link.length > 0) ||
                                            (task.document && task.document.length > 0)) && (
                                            <div className="flex flex-col gap-3">
                                                <span className="text-[#878A93] text-sm font-medium mt-4">Task Resources</span>
                                                {/* Links */}
                                                {task.link && task.link.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {task.link.map((link: string, index: number) => (
                                                    <Link
                                                        key={index}
                                                        href={link}
                                                        target="_blank"
                                                        className="flex items-center cursor-pointer gap-2 p-2 border border-[#EDEEF3] rounded-xl flex-1 min-w-0"
                                                    >
                                                        <Link2 />
                                                        <input
                                                        type="text"
                                                        className="w-full outline-none text-sm text-[#727374] bg-transparent"
                                                        value={link}
                                                        readOnly
                                                        />
                                                    </Link>
                                                    ))}
                                                </div>
                                                )}

                                                {/* Documents */}
                                                {task.document && task.document.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {task.document.map((doc: string, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-2 border border-[#EDEEF3] rounded-xl flex-1 min-w-0"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                        <Image
                                                            src="/icons/file-icon.svg"
                                                            alt="file icon"
                                                            width={16}
                                                            height={16}
                                                        />
                                                        <div className="flex flex-col min-w-0">
                                                            <span className="text-sm font-medium text-[#1A1A1A] truncate">
                                                            Document {index + 1}
                                                            </span>
                                                            <span className="text-xs text-[#878A93]">
                                                            PDF File
                                                            </span>
                                                        </div>
                                                        </div>
                                                        <a
                                                        href={doc}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        >
                                                        <Download className="w-4 h-4 text-[#878A93] cursor-pointer hover:text-primary" />
                                                        </a>
                                                    </div>
                                                    ))}
                                                </div>
                                                )}
                                            </div>
                                            )}
                                        
                                        {/* Submissions */}
                                        {task.submission && task.submission.length > 0 && (
                                            <div className="flex flex-col gap-3">
                                                <span className="text-[#878A93] text-sm font-medium mt-4">Submissions</span>
                                                
                                                {/* Links */}
                                                
                                                <div className="flex flex-wrap gap-2">
                                                    {(task?.submission?.filter((item: string) => !item.includes("res.cloudinary.com")) || [])?.map((link: string, index: number) => (
                                                        <Link
                                                            href={link}
                                                            target="_blank"
                                                            key={index}
                                                            className="flex items-center cursor-pointer gap-2 p-2 border border-[#EDEEF3] rounded-xl flex-1 min-w-0"
                                                        >
                                                            <Link2 />
                                                            <input
                                                                type="text"
                                                                className="w-full outline-none text-sm text-[#727374] bg-transparent"
                                                                value={link}
                                                                readOnly
                                                            />
                                                        </Link>
                                                    ))}
                                                </div>

                                                {/* Documents */}
                                                <div className="flex flex-wrap gap-2">
                                                    {(task?.submission?.filter((item: string) => item.includes("res.cloudinary.com")) || [])?.map((doc: string, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-2 border border-[#EDEEF3] rounded-xl flex-1 min-w-0"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                        <Image
                                                            src="/icons/file-icon.svg"
                                                            alt="file icon"
                                                            width={16}
                                                            height={16}
                                                        />
                                                        <div className="flex flex-col min-w-0">
                                                            <span className="text-sm font-medium text-[#1A1A1A] truncate">
                                                            Document {index + 1}
                                                            </span>
                                                            <span className="text-xs text-[#878A93]">File</span>
                                                        </div>
                                                        </div>
                                                        <a href={doc} target="_blank" rel="noopener noreferrer">
                                                        <Download className="w-4 h-4 text-[#878A93] cursor-pointer hover:text-primary" />
                                                        </a>
                                                    </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <span onClick={() => { 
                                                setTaskId(task.id);
                                                setOpenTaskDeliverablesForm(true);
                                             }} className="bg-white border w-fit border-[#E7E8E9] text-[#0E1426] text-xs p-2 rounded-[10px] cursor-pointer">Add tasks deliverables</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            
            <Dialog open={openTaskDeliverablesForm} onOpenChange={setOpenTaskDeliverablesForm}>
                <DialogContent className="!rounded-3xl">
                    <DialogTitle>
                        Task Deliverables update
                    </DialogTitle>
                    {isLoadingTask && <TaskDeliverableSkeleton />}
                    {!isLoadingTask && task && 
                        
                        <form className="flex flex-col gap-6 mt-5">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label className="text-[#0E1426] text-sm font-normal">Task deliverables title</Label>
                                    <Input value={task?.data?.title} className="rounded-[14px] py-5 px-4 border focus:border-[#FEE1BA] border-[#D1DAEC]" type="text" placeholder="Enter Deliverables title" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="text-[#0E1426] text-sm font-normal">Task deliverables description</Label>
                                    <Textarea value={task?.data?.description} className="rounded-[14px] focus:border-[#FEE1BA] py-6 px-4 border border-[#D1DAEC]" placeholder="Enter Deliverables title" />
                                </div>
                                <div onClick={() => setAddLink(!addLink)} className="flex flex-col gap-2">
                                    <Label className="text-[#0E1426] text-sm font-normal">Task Link</Label>
                                    <div className="w-fit bg-[#FFFFFF] border rounded-[10px] cursor-pointer border-[#D1DAEC80] p-2 flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        <span className="text-[#1A1A1A] text-xs font-normal">Add task link</span>
                                    </div>
                                </div>
                                {links.length > 0 && 
                                    <div className="flex flex-wrap gap-4">
                                        {links.map((link, index) => (
                                            <div key={index} className="flex items-center gap-1">
                                                <div className="flex items-center gap-1 border border-[#ABC6FB] bg-white rounded-[8.4px] py-[6px] px-[4.8px]">
                                                    <URL className="w-4 h-4 text-[#FF5F6D]" />
                                                    <span className="text-[#878A93] text-xs">{link}</span>
                                                </div>
                                                <div className="flex items-center justify-center w-3 h-3 bg-[#BCC2C7] rounded-full cursor-pointer">
                                                    <X onClick={() => setLinks(links.filter(li => li !== link))} className="text-[#878A93] cursor-pointer" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {addLink && 
                                    <div className="flex flex-col gap-4">
                                        {/* <div className="flex flex-col gap-2">
                                            <Label className="text-[#0E1426] text-sm font-normal">Link Title</Label>
                                            <Input value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} className="rounded-[14px] py-5 px-4 border focus:border-[#FEE1BA] border-[#D1DAEC]" type="text" placeholder="Analytics resource" />
                                        </div> */}
                                        <div className="flex flex-col gap-2">
                                            <Label className="text-[#0E1426] text-sm font-normal">Test link</Label>
                                            <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="rounded-[14px] py-2 px-3 border focus:border-[#FEE1BA] border-[#D1DAEC]" type="text" placeholder="https://" />
                                        </div>
                                        <Button onClick={() => { setLinks([...links, linkUrl]); setAddLink(false); setLinkTitle(''); setLinkUrl('')}} className="bg-primary text-white w-fit text-xs rounded-[14px] px-4 py-6">Add link</Button>
                                    </div>
                                }
                                <div className="flex flex-col gap-2">
                                    <Label className="text-[#0E1426] text-sm font-normal">Task document</Label>

                                    <label htmlFor="task-upload" className="w-fit bg-white border rounded-[10px] cursor-pointer border-[#D1DAEC80] p-2 flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        <span className="text-[#1A1A1A] text-xs font-normal">Add task document</span>
                                    </label>

                                    <input
                                        id="task-upload"
                                        type="file"
                                        className="hidden"
                                        multiple
                                        onChange={handleAddDocument}
                                    />
                                </div>
                                
                                {documents.length > 0 && 
                                    <div className="flex flex-wrap gap-4">
                                        {documents.map((doc, index) => (
                                            <div key={index} className="flex items-center gap-1">
                                                <div className="flex items-center gap-1 border border-[#ABC6FB] bg-white rounded-[8.4px] p-[7.3px]">
                                                    <Image src={'/icons/file-icon.svg'} alt="File icon" width={20} height={20} />
                                                    <span className="text-[#878A93] text-xs">{doc.title}</span>
                                                </div>
                                                <div className="flex items-center justify-center w-3 h-3 bg-[#BCC2C7] rounded-full cursor-pointer">
                                                    <X onClick={() => setDocuments(documents.filter(d => d.title !== doc.title))} className="text-[#878A93] cursor-pointer" />
                                                </div> 
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                                
                            <Button onClick={onSubmitTask} className="bg-primary text-white w-fit rounded-[14px] px-4 py-6">{isPending ? 'Submitting...' : 'Submit task'}</Button>
                        </form>
                    }
                </DialogContent>
            </Dialog>
            
            <Dialog open={openTaskSuccessModal} onOpenChange={setOpenTaskSuccessModal}>
                <DialogContent className="!rounded-3xl">
                    <div className="flex flex-col items-center justify-center gap-6">
                        <Image src={'/icons/success-check.svg'} alt="success Modal" width={80} height={80} />
                        <div className="flex flex-col items-center justify-center gap-4">
                            <span className="font-bold text-[#0E1426] text-[32px]">Well done work</span>
                            <span className="text-[#0E1426] text-2xl font-normal text-center">Project task submitted successfully , kindly wait for feedback</span>
                            <Button onClick={() => setOpenTaskSuccessModal(false)} className="bg-[#1A1A1A] text-[#FCCE37] w-fit rounded-[14px] px-4 py-6">Okay</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProjectDetails
