import { axiosClient } from "@/lib/api/axiosclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetProjects = (params?: any) => {
    const { data, isLoading } = useQuery({
        queryKey: ["projects", params],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/projects/account/expert?${new URLSearchParams(params).toString()}`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch projects");
                }
                return response.data?.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch projects")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching projects")
                }

                throw error;
            }
        }
    })

    return { projects: data, isLoading }
} 

export const useGetProject = (projectId: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ["projects", projectId],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/project/${projectId}`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch project");
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch project")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching project")
                }

                throw error;
            }
        },
        enabled: !!projectId
    })

    return { project: data, isLoading }
}   

export const useAcceptDeclineMatch = () => { 
    const queryClient = useQueryClient()
    const { mutate: acceptOrDecline, isPending } = useMutation({
        mutationFn: async (data: { response: "accepted" | "declined", projectId: string}) => {
            try {
                const response = await axiosClient.put(`/project/${data?.projectId}/invite-response`, {response: data.response})
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || `Failed to ${data.response} match`);
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || `Failed to ${data.response} match`)
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error(`An unexpected error occured while trying to ${data.response} match`)
                }

                throw error;
            }
        },
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })

    return { acceptOrDecline, isPending }
}

