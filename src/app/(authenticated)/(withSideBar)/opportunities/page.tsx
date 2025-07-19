import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users2 } from "lucide-react";

const Opportunities = () => {
    return (
        <div className="w-full flex flex-col gap-4 lg:w-[919px]">
            <div className="flex w-full flex-col gap-6">
                <div className="page-heading flex flex-col gap-2">
                    <span className="text-[#1A1A1A] font-bold text-2xl">New Opportunities</span>
                    <span className="text-[#1A1A1A] font-normal text-base">Here are opportunities for you.</span>
                </div>

                <div className="rounded-3xl gap-3 w-full border border-[#D1DAEC80] hide-scrollbar p-3 h-[862px] overflow-y-scroll">
                    <div className="h-full flex flex-col gap-4 w-full bg-[#FBFCFC] rounded-3xl p-3 hide-scrollbar overflow-y-scroll">
                        <div className="opportunity w-full p-3 rounded-2xl flex flex-col gap-2">
                            <div className="top border-b border-primary-border pb-3 w-full flex items-center gap-3">
                                <div className="bg-[#D1F7FF] flex items-center justify-center p-[5.84px] text-[#1A1A1A] text-xs h-[54px] rounded-[11.68px]">BlueMart</div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-[#878A93] ">Growth Audit for GreenMart </span>
                                    <div className="items-center gap-2 flex">
                                        <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                            <Users2 className="w-4 h-4" />
                                            Members: <span className="text-[#121217]">03</span>
                                        </span>
                                        <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                            <Clock className="w-4 h-4" />
                                            Due: <span className="text-[#121217]">4 weeks</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-[#878A93] opacity-0">Hi</span>
                                    <div className="items-center gap-1 flex">
                                        <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                            <Calendar className="w-4 h-4" />
                                            Availability: <span className="text-[#121217]">Full time, Contract</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 rounded-[14px] bg-white border border-[#D1DAEC] p-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-[#878A93]">Role: </span>
                                    <span className="font-medium text-[#1A1A1A] text-sm">Sales Strategist</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[#1A1A1A] text-sm">Project brief</span>
                                    <span className="text-[#727374] text-sm">Theming allows users to leverage the power of the dotLottie format by adding multiple themes into a single file. This enables you can easily embed one animation file into your design project and switch between themes without the need to create multiple files.</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[#1A1A1A] text-sm">Required Skills</span>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Rapid prototyping</span>
                                        <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Agile Development strategies</span>
                                        <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Business Analytics</span>
                                    </div>
                                </div>
                            </div>

                            <Button className="bg-primary text-white w-fit text-xs rounded-[14px] px-4 py-6">Accept Match</Button>
                        </div>
                        <div className="opportunity w-full p-3 rounded-2xl flex flex-col gap-2">
                            <div className="top border-b border-primary-border pb-3 w-full flex items-center gap-3">
                                <div className="bg-[#D1F7FF] flex items-center justify-center p-[5.84px] text-[#1A1A1A] text-xs h-[54px] rounded-[11.68px]">BlueMart</div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-[#878A93] ">Growth Audit for GreenMart </span>
                                    <div className="items-center gap-2 flex">
                                        <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                            <Users2 className="w-4 h-4" />
                                            Members: <span className="text-[#121217]">03</span>
                                        </span>
                                        <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                            <Clock className="w-4 h-4" />
                                            Due: <span className="text-[#121217]">4 weeks</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-[#878A93] opacity-0">Hi</span>
                                    <div className="items-center gap-1 flex">
                                        <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
                                            <Calendar className="w-4 h-4" />
                                            Availability: <span className="text-[#121217]">Full time, Contract</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 rounded-[14px] bg-white border border-[#D1DAEC] p-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-[#878A93]">Role: </span>
                                    <span className="font-medium text-[#1A1A1A] text-sm">Sales Strategist</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[#1A1A1A] text-sm">Project brief</span>
                                    <span className="text-[#727374] text-sm">Theming allows users to leverage the power of the dotLottie format by adding multiple themes into a single file. This enables you can easily embed one animation file into your design project and switch between themes without the need to create multiple files.</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[#1A1A1A] text-sm">Required Skills</span>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Rapid prototyping</span>
                                        <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Agile Development strategies</span>
                                        <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Business Analytics</span>
                                    </div>
                                </div>
                            </div>

                            <Button className="bg-primary text-white w-fit text-xs rounded-[14px] px-4 py-6">Accept Match</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Opportunities;
