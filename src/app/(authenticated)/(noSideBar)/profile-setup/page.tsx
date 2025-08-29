"use client"

import { useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { Check } from 'lucide-react';
import AboutYou from "@/components/profile-setup/about-you";
import ProfessionalExperience from "@/components/profile-setup/professional-experience";
import Profiling from "@/components/profile-setup/profiling";
import { useCompleteProfileSetUp } from "@/hooks/useAuth";
import { toast } from "sonner";

const steps = ['About You', 'Professional Experience', 'Profiling'];

const ProfileSetUp = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: "",
            email: "",
            gender: "",
            phone: "",
            country: "",
            state: "",
            category: "",
            role: [],
            preferredIndustry: [],
            skills: [],
            experience: "",
            portfolio: "",
            linkedin: "",
            resume: "",
            bio: "",
            identityType: "",
            identification: ""
        }
    });

    const [user, setUser] = useState()

    const { completeProfileSetup, isPending } = useCompleteProfileSetUp()

    const onNext = () => setCurrentStep((prev) => prev + 1);
    const onBack = () => setCurrentStep((prev) => prev - 1);

    const onSubmitFinal = (data: any) => {
        let completionRate = 0

        if (currentStep === 0) {
            completionRate = 33;
            completeProfileSetup({ ...data, regPercentage: completionRate }, {
                onSuccess: () => {
                    toast.success("Expert details added successfully")
                    onNext();
                },
                onError: () => {
                    toast.error("Error adding Expert details")
                }
            })
        }

        if (currentStep === 1) {
            completionRate = 66;
            completeProfileSetup({ ...data, regPercentage: completionRate }, {
                onSuccess: () => {
                    toast.success("Expert experience details added successfully")
                    onNext;
                },
                onError: () => {
                    toast.error("Error adding Expert experience details")
                }
            })
        }

        if (currentStep === 2) {
            completionRate = 100;
            completeProfileSetup({ ...data, regPercentage: completionRate }, {
                onSuccess: () => {
                    toast.success("Expert other details added successfully")
                    onNext;
                },
                onError: () => {
                    toast.error("Error adding Expert other details")
                }
            })
        }
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
        setUser(storedUser)

        methods.reset({
            name: storedUser?.name,
            email: storedUser?.email,
            gender: storedUser?.gender,
            phone: storedUser?.phone,
        })
    }, [])

    return (
        <div className="flex flex-col gap-10 pb-20">
            <div className="heading flex items-center gap-[9px] w-full px-14 py-4 bg-[#F8F8F8]">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <div
                            className={`w-6 h-6 rounded-sm flex items-center justify-center text-white text-sm ${
                                idx < currentStep
                                ? 'bg-green-500'
                                : idx === currentStep
                                ? 'bg-primary'
                                : 'bg-[#878A93]'
                            }`}
                        >
                            {idx < currentStep ? <Check size={16} /> : ''}
                        </div>
                        <span className={idx === currentStep ? 'font-semibold' : 'text-[#878A93]'}>
                            {step}
                        </span>
                        {idx < steps.length - 1 && <span className="text-[#878A93]">→</span>}
                    </div>
                ))}
            </div>
            <div className="w-full flex items-center">
                <div className="w-full lg:w-[570px] flex flex-col gap-2 mx-auto p-2 lg:p-0">
                    <FormProvider {...methods}>
                        {currentStep === 0 && <AboutYou user={user} onNext={onSubmitFinal} isAdding={isPending} />}
                        {currentStep === 1 && <ProfessionalExperience onNext={onSubmitFinal} onBack={onBack} isAdding={isPending} />}
                        {currentStep === 2 && <Profiling onBack={onBack} onSubmit={onSubmitFinal} isAdding={isPending} />}
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

export default ProfileSetUp
