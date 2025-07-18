import Image from "next/image"

const SideBar = ({onLinkClick}: {onLinkClick?: () => void}) => {
    return (
        <div className="bg-[#ffffff] px-[18px] py-[30px] flex flex-col gap-14">
            <Image src={'/logo.svg'} alt="Logo" width={137.7} height={28} />
            
            <div>
                hi
            </div>
        </div>
    )
}

export default SideBar
