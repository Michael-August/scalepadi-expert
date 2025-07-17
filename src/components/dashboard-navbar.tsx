import { Bell } from "lucide-react"
import Image from "next/image"

const DashboardNav = ({withLogo = true}: {withLogo?: boolean}) => {
    return (
        <nav className="w-full bg-white border-b border-primary-border flex items-center justify-between py-2 px-4 lg:px-14">
            {!withLogo && <div></div>}
            {withLogo && <Image src={'/logo.svg'} alt="Logo" width={104} height={27.54} />}
            <div className="flex items-center gap-2">
                <div className="px-4 py-2 cursor-pointer">
                    <Image src={'/icons/bell.svg'} alt="Bell" width={20} height={20} />
                </div>
                <div className="w-[38px] h-[38px] rounded-full bg-[#FCCE37]"></div>
            </div>
        </nav>
    )
}

export default DashboardNav
