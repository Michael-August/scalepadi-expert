import { useGetExpertByToken } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const Protected = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const { expert } = useGetExpertByToken()

    useEffect(() => {
        if (!localStorage.getItem("token")) { 
            toast.info("You need to login first")
            router.replace('/signin');
        }

        if (expert?.status === true) {
            localStorage.setItem("user", JSON.stringify(expert.data))

            if (expert?.data?.regPercentage === 0) {
                router.replace('/profile-setup')
            }
        } 
    }, [expert]);

    return (
        <>
            {children}
        </>
    )
}

export default Protected;
