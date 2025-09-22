"use client"

import { useAcceptDeclineMatch, useGetProject } from "@/hooks/useProject"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"

const ProjectInvitePage = () => {

    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const { projectId } = useParams()
        
    const { project, isLoading } = useGetProject(projectId as string)

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
        setShowDeclineModal(true);
    };

    const handleConfirmDecline = () => {
        setShowDeclineModal(false);
    };

    const handleCancelDecline = () => {
        setShowDeclineModal(false);
    };

    return (
        <div className="flex flex-col gap-10 pb-20">
            <div className="flex w-full px-14 py-4 flex-col gap-6">
                <div className="page-heading flex flex-col gap-2">
                    <span className="text-[#1A1A1A] font-bold text-2xl">Project Invitation</span>
                    <span className="text-[#1A1A1A] font-normal text-base">You have been invited to join this project. Please review the details and accept or decline the invitation.</span>
                </div>
                <div className="rounded-3xl border border-[#D1DAEC80] p-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <span className="font-semibold text-xl text-black">Project Title</span>
                        <span className="text-base text-[#878A93]">This is a brief description of the project, outlining its main objectives and requirements.</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="font-semibold text-xl text-black">Project Details</span>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <span className="font-medium text-sm text-[#878A93] w-32">Client Name:</span>
                                <span className="text-sm text-black">John Doe</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-medium text-sm text-[#878A93] w-32">Start Date:</span>
                                <span className="text-sm text-black">January 15, 2024</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-medium text-sm text-[#878A93] w-32">End Date:</span>
                                <span className="text-sm text-black">March 15, 2024</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-medium text-sm text-[#878A93] w-32">Budget:</span>
                                <span className="text-sm text-black">₦5,000</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-medium text-sm text-[#878A93] w-32">Location:</span>
                                <span className="text-sm text-black">Remote</span>
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
    )
}

export default ProjectInvitePage