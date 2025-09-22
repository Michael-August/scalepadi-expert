"use client";

import { useCompleteProfileSetUp, useSetexpertDetails } from "@/hooks/useAuth";
import { Clock, Edit2, Link as LinkIcon, Pin, Trash2Icon, Verified, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Profile = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const [user, setUser] = useState<any>()
    const { completeProfileSetup, isPending } = useCompleteProfileSetUp()

    const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'account'>('about')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            
            // Upload to server
            const formData = new FormData();
            formData.append("profilePicture", file);

            completeProfileSetup(formData, {
                onSuccess: (data) => {
                    // Update local user state
                    const updatedUser = { ...user, profilePicture: data?.data?.profilePicture };
                    setUser(updatedUser);
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    toast.success("Profile picture updated successfully");
                },
                onError: (error: any) => {
                    toast.error(error?.message || "An error occurred while updating profile picture");
                }
            });
        }
    };

    const router = useRouter()

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
        setUser(storedUser)
    }, [])

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
                                    <Image src={user?.profilePicture} alt="Profile Picture" width={70} height={70} className="rounded-full w-full h-full" />
                                    <Image className="absolute bottom-0 left-0" src={'/images/profile-logo.svg'} alt="logo" width={20} height={20} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[#1A1A1A] font-medium text-[20px]">{user?.name}</span>
                                    <div className="flex items-center gap-2">
                                        {user?.status === "active" && <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><Verified className="w-4 h-4 fill-green-600 text-white" /> Verified</span>}
                                        {user?.status !== "active" && <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><X className="w-4 h-4 text-red-600" /> Unverified</span>}
                                        <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><Pin className="w-4 h-4 text-[#878A93]" /> {user?.state},{user?.country}</span>
                                        <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm"><Clock className="w-4 h-4 text-[#878A93]" /> Availability: {user?.availability?.split(",")?.map((avail: string) => <span key={avail}>{ avail }</span>) }</span>
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
                                            <span onClick={() => router.push(`/profile-setup?step=profiling`)} className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm">Update</span>
                                        </div>
                                        <span className="text-[#353D44] text-sm">{user?.bio}</span>
                                    </div>

                                    <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-[20px] text-primary">Personal information</span>
                                            <span onClick={() => router.push(`/profile-setup?step=about-you`)} className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm">Edit</span>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Full Name</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">{user?.name}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Email</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">{user?.email}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Gender</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">{user?.gender}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Phone number</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">{user?.phone}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Country of  residence</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">{user?.country}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">State of residence</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">{ user?.state }</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-[20px] text-primary">Professional Details</span>
                                            <span onClick={() => router.push(`/profile-setup?step=professional-experience`)} className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm">Edit</span>
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Years of experience</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">{user?.yearsOfExperience}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Category</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">{user?.category}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#878A93] text-sm font-normal">Role</span>
                                                <span className="text-[#1A1A1A] text-base font-semibold">{user?.role[0]}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 mt-5">
                                            <span className="font-medium text-sm text-[#878A93]">Preferred industries</span>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {user?.preferredIndustry?.map((industry: string, index: number) => (
                                                    <span key={index} className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">{industry}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 mt-5">
                                            <span className="font-medium text-sm text-[#878A93]">Skills</span>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {user?.skills?.map((skill: string, index: number) => (
                                                    <span key={index} className="bg-[#F2F7FF] p-2 rounded-[14px] text-xs text-[#1E88E5]">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-[20px] text-primary">External links</span>
                                            <span onClick={() => router.push(`/profile-setup?step=profiling`)} className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm">Edit</span>
                                        </div>

                                        <div className="flex items-center gap-1 flex-wrap justify-between">
                                            {Object.entries(user?.socialLinks || {}).map(([key, value]: [string, unknown]) => (
                                                (String(value) && <Link href={String(value)} target="_blank" key={key} className="flex cursor-pointer flex-col gap-1">
                                                    <span className="font-medium text-sm text-[#878A93]">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                                    <span className="flex gap-2 border text-[#878A93] border-[#ABC6FB] bg-white rounded-[14px] p-[10px] items-center">
                                                        <LinkIcon className="text-[#FFC371] w-4 h-4" />
                                                        {String(value)}
                                                    </span>
                                                </Link>)
                                            ))}
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