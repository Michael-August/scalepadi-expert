import ProfileSetUp from "@/components/profile-setup/ProfileSetup-page"
import { Suspense } from "react"

const Page = () => { 
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileSetUp />
        </Suspense>
    )
}

export default Page
