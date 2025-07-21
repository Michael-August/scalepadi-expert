import { Dot, Star } from "lucide-react";
import Image from "next/image";

const performance = () => {

    return (
        <div className="w-full flex flex-col gap-4 lg:w-[919px]">
            <div className="flex w-full flex-col gap-6">
                <div className="page-heading flex flex-col gap-2">
                    <span className="text-[#1A1A1A] font-bold text-2xl">Performance Score</span>
                    <span className="text-[#1A1A1A] font-normal text-base">Here are opportunities for you.</span>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white border flex flex-col border-[#EFF2F3] rounded-3xl p-4 w-[324px] ">
                        <div className="flex flex-col gap-2 border-b border-[#EFF2F3] pb-4 mb-4">
                            <span className="text-base text-[#878A93] font-medium">Projects Completed</span>
                            <span className="font-bold text-[32px] text-[#121217]">5</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-base text-[#878A93] font-medium">Average Project Duration</span>
                            <span className="font-bold text-[24px] text-[#121217]">3 months</span>
                        </div>
                    </div>
                    <div className="bg-white border border-[#EFF2F3] flex gap-6 rounded-3xl p-4 flex-1">
                        <div className="flex flex-col">
                            <span className="font-bold text-[84px] text-[#0E1426]">4.0</span>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1">
                                    <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                    <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                    <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                    <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                    <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                </div>
                                <span className="text-[#878A93] text-sm font-normal">Client&rsquo;s Reviews</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-1">
                                <div className="w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px] ">
                                    <div className="w-[40%] h-[6px] bg-[#CCCCCC] rounded-[4px]"></div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                    </div>
                                    <span className="text-[#0E1426] text-sm font-normal">40%</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px] ">
                                    <div className="w-[20%] h-[6px] bg-[#CCCCCC] rounded-[4px]"></div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                    </div>
                                    <span className="text-[#0E1426] text-sm font-normal">20%</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px] ">
                                    <div className="w-[15%] h-[6px] bg-[#CCCCCC] rounded-[4px]"></div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                    </div>
                                    <span className="text-[#0E1426] text-sm font-normal">15%</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px] ">
                                    <div className="w-[15%] h-[6px] bg-[#CCCCCC] rounded-[4px]"></div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                    </div>
                                    <span className="text-[#0E1426] text-sm font-normal">15%</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px] ">
                                    <div className="w-[10%] h-[6px] bg-[#CCCCCC] rounded-[4px]"></div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                        <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                                    </div>
                                    <span className="text-[#0E1426] text-sm font-normal">10%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-[#D1DAEC80] rounded-3xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-[#FBFCFC] rounded-[18px] p-4 flex flex-col gap-[10px]">
                        <div className="flex items-center gap-1">
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Image className="w-[22px] h-[22px] rounded-full border border-[#EFF2F3]" src={'/images/dp.svg'} width={22} height={22} alt="user picture" />
                                <span className="text-xs text-[#3E4351] font-medium">Darlene Robertson</span>
                            </div>
                            <Dot className="text-[#CFD0D4] w-6 h-6" />
                            <span className="text-xs text-[#3E4351] font-normal">AI & ML Smitre ltd</span>
                        </div>
                        <span className="text-[#878A93] text-base font-normal">made scaling our business feel exciting and achievable! Their strategic guidance was crystal clear, their expertise was invaluable, and their collaborative approach gave us the support we needed to hit our growth targets. </span>
                    </div>
                    <div className="bg-[#FBFCFC] rounded-[18px] p-4 flex flex-col gap-[10px]">
                        <div className="flex items-center gap-1">
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Image className="w-[22px] h-[22px] rounded-full border border-[#EFF2F3]" src={'/images/dp.svg'} width={22} height={22} alt="user picture" />
                                <span className="text-xs text-[#3E4351] font-medium">Darlene Robertson</span>
                            </div>
                            <Dot className="text-[#CFD0D4] w-6 h-6" />
                            <span className="text-xs text-[#3E4351] font-normal">AI & ML Smitre ltd</span>
                        </div>
                        <span className="text-[#878A93] text-base font-normal">made scaling our business feel exciting and achievable! Their strategic guidance was crystal clear, their expertise was invaluable, and their collaborative approach gave us the support we needed to hit our growth targets. </span>
                    </div>
                    <div className="bg-[#FBFCFC] rounded-[18px] p-4 flex flex-col gap-[10px]">
                        <div className="flex items-center gap-1">
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Image className="w-[22px] h-[22px] rounded-full border border-[#EFF2F3]" src={'/images/dp.svg'} width={22} height={22} alt="user picture" />
                                <span className="text-xs text-[#3E4351] font-medium">Darlene Robertson</span>
                            </div>
                            <Dot className="text-[#CFD0D4] w-6 h-6" />
                            <span className="text-xs text-[#3E4351] font-normal">AI & ML Smitre ltd</span>
                        </div>
                        <span className="text-[#878A93] text-base font-normal">made scaling our business feel exciting and achievable! Their strategic guidance was crystal clear, their expertise was invaluable, and their collaborative approach gave us the support we needed to hit our growth targets. </span>
                    </div>
                    <div className="bg-[#FBFCFC] rounded-[18px] p-4 flex flex-col gap-[10px]">
                        <div className="flex items-center gap-1">
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#F2BB05] fill-[#F6CF50]" />
                            <Star className="w-[13.33px] h-[13.33px] text-[#CFD0D4] fill-[#E7ECEE]" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Image className="w-[22px] h-[22px] rounded-full border border-[#EFF2F3]" src={'/images/dp.svg'} width={22} height={22} alt="user picture" />
                                <span className="text-xs text-[#3E4351] font-medium">Darlene Robertson</span>
                            </div>
                            <Dot className="text-[#CFD0D4] w-6 h-6" />
                            <span className="text-xs text-[#3E4351] font-normal">AI & ML Smitre ltd</span>
                        </div>
                        <span className="text-[#878A93] text-base font-normal">made scaling our business feel exciting and achievable! Their strategic guidance was crystal clear, their expertise was invaluable, and their collaborative approach gave us the support we needed to hit our growth targets. </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default performance;
