"use client"

import { useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { Check } from 'lucide-react';
import AboutYou from "@/components/profile-setup/about-you";
import ProfessionalExperience from "@/components/profile-setup/professional-experience";
import Profiling from "@/components/profile-setup/profiling";

const steps = ['About You', 'Professional Experience', 'Profiling'];

const ProfileSetUp = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const methods = useForm({ mode: 'onBlur' });

    const onNext = () => setCurrentStep((prev) => prev + 1);
    const onBack = () => setCurrentStep((prev) => prev - 1);

    const onSubmitFinal = (data: any) => {
        console.log('Form submitted with:', data);
    };

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
                        {currentStep === 0 && <AboutYou onNext={onNext} />}
                        {currentStep === 1 && <ProfessionalExperience onNext={onNext} onBack={onBack} />}
                        {currentStep === 2 && <Profiling onBack={onBack} onSubmit={onSubmitFinal} />}
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

export default ProfileSetUp
