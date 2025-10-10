import { axiosClient } from "@/lib/api/axiosclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface AccountDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  branch?: string;
  sortCode?: string;
}

interface ApiResponse {
  status: boolean;
  message?: string;
  data?: any;
}

export const useAccountDetailsUpload = () => {
  const queryClient = useQueryClient();

  const { mutate: accountDetailsUpload, isPending } = useMutation<
    ApiResponse,
    Error,
    AccountDetails
  >({
    mutationFn: async (data: AccountDetails) => {
      try {
        const res = await axiosClient.post("/account-detail/expert", data);
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message || "An error occurred during account upload"
          );
        }
        return res.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to upload account details."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(
            "An unexpected error occurred while uploading account details."
          );
        }
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch account details after successful upload
      queryClient.invalidateQueries({ queryKey: ["account-details"] });
    },
  });

  return { accountDetailsUpload, isPending };
};

export const useUpdateAccountDetails = () => {
  const queryClient = useQueryClient();

  const { mutate: updateAccountDetails, isPending } = useMutation<
    ApiResponse,
    Error,
    { accountId: string; data: AccountDetails }
  >({
    mutationFn: async ({ accountId, data }: { accountId: string; data: AccountDetails }) => {
      try {
        const res = await axiosClient.put(`/account-detail/expert/${accountId}`, data);
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message || "An error occurred during account update"
          );
        }
        return res.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to update account details."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred while updating account details.");
        }
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch account details after successful update
      queryClient.invalidateQueries({ queryKey: ["account-details"] });
    },
  });

  return { updateAccountDetails, isPending };
};

export const useGetAccountDetails = () => {
  const { data, isLoading, error } = useQuery<
    ApiResponse,
    Error
  >({
    queryKey: ["account-details"],
    queryFn: async () => {
      try {
        const response = await axiosClient.get("/account-by-expert-owner");
        if (response.data?.status === false) {
          throw new Error(response.data?.message || "Failed to fetch account details");
        }
        return response.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to fetch account details."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred while fetching account details.");
        }
        throw error;
      }
    },
  });

  // Extract the first item from the array in the hook
  const accountDetails = data?.data?.[0];
  
  return { 
    data: accountDetails, // Return the extracted object instead of the full response
    isLoading, 
    error 
  };
};

