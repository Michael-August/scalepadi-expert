"use client";

import { Clock, Edit2, Link, Pin, Trash2Icon, Verified } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const Profile = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'account'>('about')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setProfileImage(imageUrl);
        }
    };

    return (
        <div className="w-full flex flex-col gap-4 lg:w-[919px]">
            <div className="flex w-full flex-col gap-6">
                <div className="page-heading flex flex-col gap-2">
                    <span className="text-[#1A1A1A] font-bold text-2xl">My Profile</span>
                    <span className="text-[#1A1A1A] font-normal text-base">Configure your profile to your taste</span>
                </div>

                <div className="rounded-3xl gap-3 w-full border border-[#D1DAEC80] p-6">
                    <div className="rounded-3xl flex flex-col gap-2 w-full h-full bg-[#FBFCFC] py-6 px-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-[70px] relative h-[70px] rounded-full">
                                    <Image src={'/images/profile-pic.svg'} alt="Profile Picture" width={70} height={70} className="rounded-full w-full h-full" />
                                    <Image className="absolute bottom-0 left-0" src={'/images/profile-logo.svg'} alt="logo" width={20} height={20} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[#1A1A1A] font-medium text-[20px]">David ABIJANRI eerie</span>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><Verified className="w-4 h-4 text-[#878A93]" /> Verified</span>
                                        <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><Pin className="w-4 h-4 text-[#878A93]" /> Abuja,Nigeria</span>
                                        <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><Clock className="w-4 h-4 text-[#878A93]" /> Availability: Full time</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div>
                                    <Edit2 className="w-4 h-4 cursor-pointer" onClick={() => fileInputRef.current?.click()} />

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <span className="text-[#1A1A1A] font-medium text-base">Change image</span>
                                <Trash2Icon className="text-[#E33161] cursor-pointer w-4 h-4" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div>
                                <div className="tab pt-2 w-1/2 flex items-center gap-5 bg-[#F9FAFB]">
                                    <div
                                        className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                                        hover:border-[#3A96E8] transition-colors 
                                        ${activeTab === 'about' ? 'border-[#3A96E8] text-[#3A96E8]' : 'border-transparent'}`}
                                        onClick={() => setActiveTab('about')}
                                    >
                                        <span className="text-sm">About</span>
                                    </div>

                                    <div
                                        className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                                        hover:border-[#3A96E8] transition-colors 
                                        ${activeTab === 'portfolio' ? 'border-[#3A96E8] text-[#3A96E8]' : 'border-transparent'}`}
                                        onClick={() => setActiveTab('portfolio')}
                                    >
                                        <span className="text-sm">Portfolio</span>
                                    </div>

                                    <div
                                        className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                                        hover:border-[#3A96E8] transition-colors 
                                        ${activeTab === 'account' ? 'border-[#3A96E8] text-[#3A96E8]' : 'border-transparent'}`}
                                        onClick={() => setActiveTab('account')}
                                    >
                                        <span className="text-sm">Account details</span>
                                    </div>
                                </div>
                            </div>

                            {activeTab === 'about' && (
                                <div className="flex flex-col gap-4">
                                    <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-[20px] text-primary">Bio</span>
                                            <span className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm">Update</span>
                                        </div>
                                        <span className="text-[#353D44] text-sm">👋 Hey there! I&rsquo;m Abdullahi Suleiman (sulbyee) a curious, resourceful, and impact-driven UI/UX and Product Designer with over 3 years of experience turning ideas into user-centered digital experiences across mobile, web, and wearables.</span>
                                    </div>

                                    <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-[20px] text-primary">Personal information</span>
                                            <span className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm">Edit</span>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Full Name</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">David ezeri</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Email</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">Davidezeri@gmail.com</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Gender</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">Male</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Phone number</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">+234 7067538138</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Country of  residence</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">Nigeria</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">State of residence</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">FCT, Abuja</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-[20px] text-primary">Professional Details</span>
                                            <span className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm">Edit</span>
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Years of experience</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">2 years</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Category</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">Expert</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Role</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">Business developer</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 mt-5">
                                            <span className="font-medium text-sm text-[#878A93]">Preferred industries</span>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Rapid prototyping</span>
                                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Agile development strategies</span>
                                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Business Analytics</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 mt-5">
                                            <span className="font-medium text-sm text-[#878A93]">Skills</span>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Rapid prototyping</span>
                                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Agile development strategies</span>
                                                <span className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">Business Analytics</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-[20px] text-primary">External links</span>
                                            <span className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm">Edit</span>
                                        </div>

                                        <div className="flex items-center flex-wrap justify-between">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-sm text-[#878A93]">Portfolio</span>
                                                <span className="flex gap-2 border text-[#878A93] border-[#ABC6FB] bg-white rounded-[14px] p-[10px] items-center"><Link className="text-[#FFC371] w-4 h-4" />https://www.linkedin.com</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-sm text-[#878A93]">Portfolio</span>
                                                <span className="flex gap-2 border text-[#878A93] border-[#ABC6FB] bg-white rounded-[14px] p-[10px] items-center"><Link className="text-[#FFC371] w-4 h-4" />https://www.linkedin.com</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-sm text-[#878A93]">Portfolio</span>
                                                <span className="flex gap-2 border text-[#878A93] border-[#ABC6FB] bg-white rounded-[14px] p-[10px] items-center"><Link className="text-[#FFC371] w-4 h-4" />https://www.linkedin.com</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-[20px] text-primary">Settings</span>
                                            <span className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm">Edit</span>
                                        </div>


                                    </div>
                                </div>
                            )}

                            {activeTab === 'portfolio' && (
                                <div className="flex flex-col gap-4">
                                    <div className="portfolio flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-[20px] text-primary">Resume</span>
                                            <span className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm">Update</span>
                                        </div>
                                    </div>

                                    <div className="portfolio flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-[20px] text-primary">Identity</span>
                                            <span className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm">Update</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Profile;