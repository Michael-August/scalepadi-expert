import { useGetExpertByToken } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Protected = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { expert, isLoading } = useGetExpertByToken();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			toast.info("You need to login first");
			router.replace("/signin");
		}

		if (expert?.status === true) {
			localStorage.setItem("user", JSON.stringify(expert.data));

			if (expert?.data?.regPercentage === 0) {
				router.replace("/profile-setup");
			}
		}
	}, [expert]);

	if (isLoading) {
		return (
			<div className="w-full h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
			</div>
		);
	}

	return <>{children}</>;
};

export default Protected;
