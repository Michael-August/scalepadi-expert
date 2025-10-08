import { axiosClient } from "@/lib/api/axiosclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useSignUp = () => {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axiosClient.post("/sign-up-expert", data);
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message || "An error occurred during sign up"
          );
        }
        return res.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to register expert."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(
            "An unexpected error occured while registering expert."
          );
        }

        throw error;
      }
    },
  });

  return { signUp, isPending };
};

export const useLogin = () => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      try {
        const res = await axiosClient.post("/login/expert", data);
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message || "An error occurred during login"
          );
        }
        return res.data;
       } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Failed to login.");
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occured while logging in.");
        }

        throw error;
      }
    },
  });

  return { login, isPending };
};

export const useVerifyEmail = () => {
  const { mutate: verifyEmail, isPending } = useMutation({
    mutationFn: async (data: { code: string }) => {
      try {
        const res = await axiosClient.put("/verify-expert", data);
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message || "An error occurred during email verification"
          );
        }
        return res.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to verify email."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occured while verifying email.");
        }

        throw error;
      }
    },
  });

  return { verifyEmail, isPending };
};

export const useResendVerificationCode = () => {
  const { mutate: resendVerificationCode, isPending } = useMutation({
    mutationFn: async (data: { email: string }) => {
      try {
        const res = await axiosClient.put("/resend-verify-expert", data);
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message || "An error occurred during email verification"
          );
        }
        return res.data;
     } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message ||
              "Failed to resend verification code."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occured while resending code.");
        }

        throw error;
      }
    },
  });

  return { resendVerificationCode, isPending };
};

export const useSetexpertDetails = () => {
  const { mutate: setexpertDetails, isPending } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const res = await axiosClient.post("/profile/expert", data);
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message ||
              "An error occurred while setting expert details"
          );
        }
        return res.data;
       } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to set expert details."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occured while setting expert.");
        }

        throw error;
      }
    },
  });

  return { setexpertDetails, isPending };
};

export const useForgotPassword = () => {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: async (data: { email: string }) => {
      try {
        const res = await axiosClient.post("/forgot-password-expert", data);
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message ||
              "An error occurred during password reset request"
          );
        }
        return res.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to reset request."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occured while reseting request.");
        }

        throw error;
      }
    },
  });

  return { forgotPassword, isPending };
};

export const useResetPassword = () => {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: async (data: {
      code: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      try {
        const res = await axiosClient.put("/reset-password-expert", data);
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message || "An error occurred during password reset"
          );
        }
        return res.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to reset password."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occured while reseting password.");
        }

        throw error;
      }
    },
  });

  return { resetPassword, isPending };
};

export const useGetExpertByToken = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/token/expert`);
        if (response.data?.status === false) {
          throw new Error(response.data?.message || "Failed to fetch expert");
        }
        // console.log(response.data)
        return response.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to fetch expert."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occured while fetching expert.");
        }

        throw error;
      }
    },
  });

  return { expert: data, isLoading };
};

export const useCompleteProfileSetUp = () => {
  const queryClient = useQueryClient();
  const { mutate: completeProfileSetup, isPending } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const config = {
          headers: {},
        };
        if (!(data instanceof FormData)) {
          config.headers = {
            "Content-Type": "application/json",
          };
        }

        const res = await axiosClient.put("/profile/expert", data, config);
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message || "An error occurred during profile update"
          );
        }
        console.log(res.data);
        return res.data;
       } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to update profile."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occured while updating profile.");
        }

        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return { completeProfileSetup, isPending };
};

export const useLogout = () => {
  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axiosClient.post("/logout/expert");
        if (res.data?.status === false) {
          throw new Error(
            res.data?.message || "An error occurred during logout"
          );
        }
        return res.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Failed to logout expert."
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occured while logging out.");
        }

        throw error;
      }
    },
  });

  return { logout, isPending };
};
