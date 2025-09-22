"use client"

import { Button } from "@/components/ui/button";
import { useAcceptDeclineMatch, useGetProjects } from "@/hooks/useProject";
import { Calendar, Clock, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const Opportunities = () => {

    const [activeTab, setActiveTab] = useState<'admin' | 'business'>('admin')
    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    
    const [params, setParams] = useState({ status: activeTab === 'admin' ? 'in-progress' : 'completed' })

    const { projects, isLoading } = useGetProjects(params)
    const { acceptOrDecline, isPending } = useAcceptDeclineMatch()
    const router = useRouter()

    const handleAcceptDecline = (action: 'accepted' | 'declined', projectId: string) => {
        if (!projectId) {
            return;
        }
        acceptOrDecline({ response: action, projectId}, {
            onSuccess: () => {
                toast.success(`Project ${action} successfully`)
                if(action === 'declined') {
                    router.push('/opportunities')
                    return
                }
                router.push(`/projects/${projectId}`)
            },
            onError: () => {
                toast.error(`Error ${action === 'accepted' ? 'accepting' : 'declining'} project`)
            }
        });
    }

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
        setParams({status: activeTab === 'admin' ? 'in-progress' : 'completed'})
    }, [activeTab])

    return (
        <div className="w-full flex flex-col gap-4 lg:w-[919px]">
            <div className="flex w-full flex-col gap-6">
                <div className="page-heading flex flex-col gap-2">
                    <span className="text-[#1A1A1A] font-bold text-2xl">New Opportunities</span>
                    <span className="text-[#1A1A1A] font-normal text-base">Here are opportunities for you.</span>
                </div>

                <div className="w-full lg:w-[895px] pb-10">
                    <div className="tab pt-2 w-1/2 flex items-center gap-5 bg-[#F9FAFB]">
                        <div
                            className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                            hover:border-[#3A96E8] transition-colors 
                            ${activeTab === 'admin' ? 'border-[#3A96E8] text-[#3A96E8]' : 'border-transparent'}`}
                            onClick={() => setActiveTab('admin')}
                        >
                            <span className="text-sm">Admin Invites</span>
                        </div>

                        <div
                            className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                            hover:border-[#3A96E8] transition-colors 
                            ${activeTab === 'business' ? 'border-[#3A96E8] text-[#3A96E8]' : 'border-transparent'}`}
                            onClick={() => setActiveTab('business')}
                        >
                            <span className="text-sm">Business Hires</span>
                        </div>
                    </div>

                    {activeTab === 'admin' && 
                        <div className="rounded-3xl gap-3 w-full border border-[#D1DAEC80] hide-scrollbar p-3 h-[862px] overflow-y-scroll">
                            <div className="h-full flex flex-col gap-4 w-full bg-[#FBFCFC] rounded-3xl p-3 hide-scrollbar overflow-y-scroll">
                                {projects?.data?.length === 0 && !isLoading && <div className="flex flex-col gap-2 items-center justify-center h-full">
                                    <span className="text-sm text-[#878A93]">No opportunities available at the moment</span>
                                </div>}

                                {isLoading && <div className="flex flex-col gap-2 items-center justify-center h-full">
                                    <span className="text-sm text-[#878A93]">Loading opportunities...</span>
                                </div>}

                                {projects?.data?.map((project: any) => 
                                    <div key={project.id} className="opportunity w-full p-3 rounded-2xl flex flex-col gap-2">
                                        <div className="top border-b border-primary-border pb-3 w-full flex items-center gap-3">
                                            <div className="bg-[#D1F7FF] flex items-center justify-center p-[5.84px] text-[#1A1A1A] text-xs h-[54px] rounded-[11.68px]">{project?.client?.name?.charAt(0) || 'C'}</div>
                                            <div className="flex flex-col gap-2">
                                                <span className="text-sm text-[#878A93] ">{project?.title}</span>
                                                <div className="items-center gap-2 flex">
                                                    <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                                        <Users2 className="w-4 h-4" />
                                                        Members: <span className="text-[#121217]">{project?.members?.length || '0'}</span>
                                                    </span>
                                                    <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                                        <Clock className="w-4 h-4" />
                                                        Due: <span className="text-[#121217]">{project?.duration || 'N/A'}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-[#878A93] opacity-0">Hi</span>
                                                <div className="items-center gap-1 flex">
                                                    <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                                        <Calendar className="w-4 h-4" />
                                                        Availability: <span className="text-[#121217]">{project?.availability || 'N/A'}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 rounded-[14px] bg-white border border-[#D1DAEC] p-4">
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm text-[#878A93]">Role: </span>
                                                <span className="font-medium text-[#1A1A1A] text-sm">{project?.role || 'N/A'}</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[#1A1A1A] text-sm">Project brief</span>
                                                <span className="text-[#727374] text-sm">{project?.description || 'N/A'}</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[#1A1A1A] text-sm">Required Skills</span>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {project?.skills?.map((skill: string, idx: number) => 
                                                        <span key={idx} className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">{skill}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <Button disabled={isPending} onClick={() => handleAcceptDecline("accepted", project.id)} className="bg-primary text-white w-fit text-xs rounded-[14px] px-4 py-6">{isPending ? 'Accepting match...' : 'Accept Match'}</Button>
                                            <Button disabled={isPending}
                                                variant={'destructive'}
                                                onClick={() => handleDeclineClick(project.id)} className="w-fit text-xs rounded-[14px] px-4 py-6"
                                            >
                                                {isPending ? 'Declining match...' : 'Decline Match'}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    {activeTab === 'business' && 
                        <div className="rounded-3xl gap-3 w-full border border-[#D1DAEC80] hide-scrollbar p-3 h-[862px] overflow-y-scroll">
                            
                        </div>
                    }
                </div>
            </div>

            <Dialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
                <DialogContent className="!rounded-3xl">
                    <DialogTitle>Decline Opportunity</DialogTitle>
                    <div className="flex flex-col gap-4 mt-2">
                        <span className="text-sm text-[#878A93]">
                            Are you sure you want to decline this opportunity? This action cannot be undone.
                        </span>
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" onClick={handleCancelDecline}>Cancel</Button>
                            <Button variant="destructive" onClick={handleConfirmDecline} disabled={isPending}>
                                {isPending ? "Declining..." : "Confirm Decline"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Opportunities;
