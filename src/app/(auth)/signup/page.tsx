"use client"

import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const SignUp = () => {

    const [selected, setSelected] = useState<"expert" | "business" | null>('expert');
    const [pageState, setPageState] = useState('initial')
    
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            {pageState === 'initial' && 
                <div className="flex justify-center py-10">
                    <div className="flex flex-col gap-6">
                        <div className="top flex flex-col gap-4 items-center justify-center">
                            <span className="text-primary-text font-bold lg:text-[32px] text-2xl">Sign up</span>
                        </div>

                        <div className="flex items-center gap-6 mt-7">
                            <div onClick={() => setSelected('expert')} className={`card w-[300px] p-6 rounded-3xl cursor-pointer border ${selected === 'expert' ? 'border-[#FEE1BA]' : 'border-[#D1DAEC4D]'} flex justify-between`}>
                                <div className="flex flex-col gap-4">
                                    <Image src={'/icons/expert.png'} alt="Expert icon" width={50} height={52} />
                                    <span className="text-[#1A1A1A] text-base">For Experts</span>
                                </div>
                                <Checkbox checked={selected === "expert"} />
                            </div>
                            <div onClick={() => setSelected('business')} className={`card w-[300px] p-6 rounded-3xl cursor-pointer border ${selected === 'business' ? 'border-[#FEE1BA]' : 'border-[#D1DAEC4D]'} flex justify-between`}>
                                <div className="flex flex-col gap-4">
                                    <Image src={'/icons/business.svg'} alt="Business icon" width={50} height={52} />
                                    <span className="text-[#1A1A1A] text-base">For Business</span>
                                </div>
                                <Checkbox checked={selected === "business"} />
                            </div>
                        </div>

                        <Button
                            onClick={() => {
                                if (selected === "expert") {
                                    setPageState("create-account");
                                } else {
                                    window.location.href = "https://external-website.com"; // replace with your link
                                }
                            }}
                            className="bg-primary text-white w-fit rounded-[14px] px-4 py-6"
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            }

            {pageState === 'create-account' &&
                <div className="flex">
                    <Image className="hidden lg:block" src={'/images/signup-side.svg'} alt="Side image" width={692} height={743} />
                    <div className="bg-[url('/images/blur-bg.svg')] w-full flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-6 lg:w-[506px]">
                            <div className="top flex flex-col gap-4 items-center justify-center">
                                <span className="text-primary-text font-bold lg:text-[32px] text-2xl">Sign up</span>
                                <span className="text-secondary-text text-base font-medium text-center">Complete the form below to create account</span>
                            </div>
        
                            <div className="rounded-3xl bg-white p-10 border border-[#EFF2F3] w-full">
                                <form action="" className="flex flex-col gap-6">
                                <div className="form-group flex flex-col gap-2">
                                        <Label>Full Name <span className="text-red-600">*</span></Label>
                                        <Input className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" type="text" placeholder="Enter Full Name" />
                                    </div>
                                    <div className="form-group flex flex-col gap-2">
                                        <Label>Email <span className="text-red-600">*</span></Label>
                                        <Input className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]" type="email" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group flex flex-col gap-2">
                                        <Label>Category <span className="text-red-600">*</span></Label>
                                        <Select>
                                            <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="expert">Expert</SelectItem>
                                                    <SelectItem value="business">Business</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="form-group flex flex-col gap-2">
                                        <Label>Gender <span className="text-red-600">*</span></Label>
                                        <Select>
                                            <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="form-group w-full flex flex-col gap-2">
                                        <Label>Phone Number <span className="text-red-600">*</span></Label>
                                        <PhoneInput
                                            country={'ng'}
                                            value={''}
                                            onChange={() => {}}
                                            inputClass="!rounded-[14px] !py-6 !w-full !border !border-[#D1DAEC]"
                                            containerClass="!w-full !rounded-tl-[14px] !rounded-bl-[14px]"
                                        />
                                    </div>
                                    <div className="form-group flex flex-col gap-2">
                                        <Label>
                                            Password <span className="text-red-600">*</span>
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
                                                onClick={() => setShowPassword((prev: boolean) => !prev)}
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <Checkbox /> <span className='text-sm text-[#878A93]'>By signing up, you agree to our <span className='text-primary cursor-pointer'>Terms</span>.</span>
                                        </div>
                                    </div>
                                    <Button className="bg-primary text-white w-fit rounded-[14px] px-4 py-6">Create my account</Button>
                                </form>
                            </div>
        
                            <div className="w-full">
                                <Link href={'/signin'} className="text-sm text-[#878A93] text-left">Already have an account? <span className="text-primary cursor-pointer">Log in</span></Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            }
        </div>
    )
}

export default SignUp
