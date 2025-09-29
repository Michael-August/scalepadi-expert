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
                const response = await axiosClient.get(`/project/${projectId}/expert`)
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

export const useGetTasksForProject = (projectId: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ["tasks", projectId],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/tasks/${projectId}/expert`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch tasks");
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch tasks")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching tasks")
                }

                throw error;
            }
        },
        enabled: !!projectId
    })

    return { tasks: data, isLoading }
}

export const useGetTask = (taskId: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ["tasks", taskId],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/expert/task/${taskId}`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch tasks");
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch tasks")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching tasks")
                }

                throw error;
            }
        },
        enabled: !!taskId
    })

    return { task: data, isLoading }
}

export const useGetBusinessHire = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["Hires"],
        queryFn: async () => {
            try {
                const response = await axiosClient.get(`/hires/expert`)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || "Failed to fetch hires");
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to fetch hires")
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("An unexpected error occured while fetching hires")
                }

                throw error;
            }
        },
    })

    return { hires: data, isLoading }
}

export const useAcceptDeclineHire = () => { 
    const queryClient = useQueryClient()
    const { mutate: acceptOrDeclineHire, isPending } = useMutation({
        mutationFn: async (data: { expertStatus: "accepted" | "declined", hireId: string}) => {
            try {
                const response = await axiosClient.put(`/hire/expert/${data?.hireId}`, {expertStatus: data.expertStatus})
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || `Failed to ${data.expertStatus} match`);
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || `Failed to ${data.expertStatus} match`)
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error(`An unexpected error occured while trying to ${data.expertStatus} match`)
                }

                throw error;
            }
        },
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ['Hires'] })
        }
    })

    return { acceptOrDeclineHire, isPending }
}

export const useSubmitTask = (taskId: string) => { 
    const queryClient = useQueryClient()
    const { mutate: submitTask, isPending } = useMutation({
        mutationFn: async (data: any) => {
            try {
                const response = await axiosClient.put(`/task/submit/${taskId}`, data)
                if (response.data?.status === false) {
                    throw new Error(response.data?.message || `Failed to submit task`);
                }
                return response.data
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || `Failed to submit task`)
                } else if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error(`An unexpected error occured while trying to submit task`)
                }

                throw error;
            }
        },
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ['tasks', taskId] })
        }
    })

    return { submitTask, isPending }
}

