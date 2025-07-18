import { Routes } from "@/lib/routes"
import { Folder, FolderOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SideBar = ({ onLinkClick }: { onLinkClick?: () => void }) => {

    const pathname = usePathname();
    
    return (
        <div className="bg-[#ffffff] w-full border-r border-[#EDEEF3] px-[18px] py-[30px] flex flex-col gap-14">
            <Image src={'/logo.svg'} alt="Logo" width={137.7} height={28} />
            
            <div className="flex w-full flex-col items-center justify-between">
                <div className="routes w-full flex flex-col gap-3">
                {Routes.map((route) => {
                    const isActive = pathname === route.route;
                    return (
                    <Link
                        key={route.route}
                        href={route.route}
                        className={`route cursor-pointer rounded-xl w-full items-center px-4 py-3 flex gap-[10px] font-medium text-sm
                        ${isActive ? 'bg-secondary text-primary' : 'text-[#1A1A1A] hover:bg-secondary hover:text-primary'}`}
                    >
                        <route.icon />
                        <span>{route.name}</span>
                    </Link>
                    );
                })}
                </div>
            </div>
        </div>
    )
}

export default SideBar
