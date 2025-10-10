import { axiosClient } from "@/lib/api/axiosclient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useExpertReview = (expertId: string) => {
  const query = useQuery({
    queryKey: ["review", expertId],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(
          `/expert-review`
        );
        const result = response.data;
        
        if (result?.status === false && result?.message === "No review found.") {
          return null;
        }

        if (result?.status === false) {
          toast.error(result?.message || "Failed to fetch review");
          return null;
        }
        
        console.log(result);
        return result;
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;

        if (error.response?.status === 404) {
          return null;
        }

        toast.error(
          error.response?.data?.message || "Unexpected error fetching review"
        );
        return null;
      }
    },
    enabled: !!expertId,
  });

  return {
    review: query.data,
    isLoading: query.isLoading,
  };
};