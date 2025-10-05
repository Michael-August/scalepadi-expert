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
				throw (
					new Error(error) ||
					new Error("An error occurred during sign up")
				);
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
					toast.error(
						error.response?.data?.message || `Failed to log in`
					);
				} else if (error instanceof Error) {
					toast.error(error.message);
				} else {
					toast.error(
						`An unexpected error occured while trying to log in`
					);
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
						res.data?.message ||
							"An error occurred during email verification"
					);
				}
				return res.data;
			} catch (error: any) {
				throw (
					new Error(error) ||
					new Error("An error occurred during email verification")
				);
			}
		},
	});

	return { verifyEmail, isPending };
};

export const useResendVerificationCode = () => {
	const { mutate: resendVerificationCode, isPending } = useMutation({
		mutationFn: async (data: { email: string }) => {
			try {
				const res = await axiosClient.put(
					"/resend-verify-expert",
					data
				);
				if (res.data?.status === false) {
					throw new Error(
						res.data?.message ||
							"An error occurred during email verification"
					);
				}
				return res.data;
			} catch (error: any) {
				// If backend sent a message, preserve it
				const backendMessage =
					error?.response?.data?.message ||
					error?.message ||
					"An error occurred during login";

				throw new Error(backendMessage);
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
				throw (
					new Error(error) ||
					new Error("An error occurred while setting expert details")
				);
			}
		},
	});

	return { setexpertDetails, isPending };
};

export const useForgotPassword = () => {
	const { mutate: forgotPassword, isPending } = useMutation({
		mutationFn: async (data: { email: string }) => {
			try {
				const res = await axiosClient.post(
					"/forgot-password-expert",
					data
				);
				if (res.data?.status === false) {
					throw new Error(
						res.data?.message ||
							"An error occurred during password reset request"
					);
				}
				return res.data;
			} catch (error: any) {
				throw (
					new Error(error) ||
					new Error("An error occurred during password reset request")
				);
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
				const res = await axiosClient.put(
					"/reset-password-expert",
					data
				);
				if (res.data?.status === false) {
					throw new Error(
						res.data?.message ||
							"An error occurred during password reset"
					);
				}
				return res.data;
			} catch (error: any) {
				throw (
					new Error(error) ||
					new Error("An error occurred during password reset")
				);
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
					throw new Error(
						response.data?.message || "Failed to fetch expert"
					);
				}
				return response.data;
			} catch (error: any) {
				if (error instanceof AxiosError) {
					toast.error(
						error.response?.data?.message ||
							"Failed to fetch expert"
					);
				} else if (error instanceof Error) {
					toast.error(error.message);
				} else {
					toast.error(
						"An unexpected error occured while fetching expert"
					);
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
				const res = await axiosClient.put("/profile/expert", data);
				if (res.data?.status === false) {
					throw new Error(
						res.data?.message ||
							"An error occurred during profile update"
					);
				}
				return res.data;
			} catch (error: any) {
				// If backend sent a message, preserve it
				const backendMessage =
					error?.response?.data?.message ||
					error?.message ||
					"An error occurred during profile update";

				throw new Error(backendMessage);
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
				throw (
					new Error(error) ||
					new Error("An error occurred during logout")
				);
			}
		},
	});

	return { logout, isPending };
};
