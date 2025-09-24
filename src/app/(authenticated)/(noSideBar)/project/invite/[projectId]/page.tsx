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
                <div className="flex flex-col gap-4">
                    <span className="font-semibold text-xl text-black">Project Title</span>
                    <span className="text-base text-[#878A93]">{project?.data?.brief}</span>
                    <span className="text-base text-[#878A93]">Goal: {project?.data?.goal}</span>
                    </div>

                    <div className="flex flex-col gap-4">
                    <span className="font-semibold text-xl text-black">Project Details</span>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                        <span className="font-medium text-sm text-[#878A93] w-32">Client Name:</span>
                        <span className="text-sm text-black">{project?.data?.businessId?.name}</span>
                        </div>
                        <div className="flex gap-2">
                        <span className="font-medium text-sm text-[#878A93] w-32">Company:</span>
                        <span className="text-sm text-black">{project?.data?.businessId?.title}</span>
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
                        <span className="font-medium text-sm text-[#878A93] w-32">Due Date:</span>
                        <span className="text-sm text-black">
                            {new Date(project?.data?.dueDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            })}
                        </span>
                        </div>
                        <div className="flex gap-2">
                        <span className="font-medium text-sm text-[#878A93] w-32">Status:</span>
                        <span className="text-sm capitalize text-black">{project?.data?.status}</span>
                        </div>
                    </div>
                    </div>

                    <div className="flex flex-col gap-4">
                    <span className="font-semibold text-xl text-black">Resources</span>
                    <div className="flex gap-4">
                        {project?.data?.resources.map((url: string, idx: number) => (
                        <img
                            key={idx}
                            src={url}
                            alt="Project resource"
                            className="w-40 h-28 object-cover rounded-md border"
                        />
                        ))}
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