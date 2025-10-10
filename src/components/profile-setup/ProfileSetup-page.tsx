"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Check } from "lucide-react";
import AboutYou from "@/components/profile-setup/about-you";
import ProfessionalExperience from "@/components/profile-setup/professional-experience";
import Profiling from "@/components/profile-setup/profiling";
import { useCompleteProfileSetUp } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

// Removed "Account Details" from steps
const steps = ["About You", "Professional Experience", "Profiling"];

const ProfileSetUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm({
    mode: "onBlur",
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
      yearsOfExperience: "",
      portfolio: "",
      linkedin: "",
      resume: null, // Added resume field
      bio: "",
      identityType: "",
      identification: null,
      availability: "",
    },
  });

  const [user, setUser] = useState<any>();
  const router = useRouter();

  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");

  useEffect(() => {
    if (stepParam) {
      const stepIndex = steps.findIndex(
        (step) =>
          step.toLowerCase().replace(/\s+/g, "-") === stepParam.toLowerCase()
      );
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex);
      }
    }
  }, [stepParam]);

  const { completeProfileSetup, isPending } = useCompleteProfileSetUp();

  const onNext = () => setCurrentStep((prev) => prev + 1);
  const onBack = () => setCurrentStep((prev) => prev - 1);

  const onSubmitFinal = (data: any) => {
    let stepRate = 0;
    if (currentStep === 0) stepRate = 30;
    if (currentStep === 1) stepRate = 70;
    if (currentStep === 2) stepRate = 100; // Updated percentages

    let completionRate =
      user?.regPercentage && user.regPercentage >= stepRate
        ? user.regPercentage
        : stepRate;

    if (currentStep === 0) {
      completeProfileSetup(
        { ...data, regPercentage: completionRate },
        {
          onSuccess: () => {
            if (stepParam) {
              router.push("/profile");
            } else {
              onNext();
            }
          },
        }
      );
    }

    if (currentStep === 1) {
      const payload = {
        ...data,
        socialLinks: {
          linkedin: data.linkedin,
          website: data.portfolio,
        },
      };
      completeProfileSetup(
        { ...payload, regPercentage: completionRate },
        {
          onSuccess: () => {
             if (stepParam) {
              router.push("/profile");
            } else {
              onNext();
            }
          },
        }
      );
    }

    if (currentStep === 2) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "identification" || key === "resume") {
          if (data[key]) {
            formData.append(key === "identification" ? "idImage" : "resume", data[key]);
          }
        } else {
          formData.append(key, data[key]);
        }
      });
      formData.append("regPercentage", String(completionRate));

      completeProfileSetup(formData, {
        onSuccess: () => {
          if (stepParam) {
            router.push("/profile");
          } else {
            router.push("/projects");
          }
        },
      });
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);

    methods.reset({
      name: storedUser?.name || "",
      email: storedUser?.email || "",
      gender: storedUser?.gender || "",
      phone: storedUser?.phone || "",
      country: storedUser?.country || "",
      state: storedUser?.state || "",
      category: storedUser?.category || "",
      role: Array.isArray(storedUser?.role)
        ? storedUser.role.filter((r: string) => r !== "undefined")
        : [],
      preferredIndustry: Array.isArray(storedUser?.preferredIndustry)
        ? storedUser.preferredIndustry.filter(
            (ind: string) => ind !== "undefined"
          )
        : [],
      skills: Array.isArray(storedUser?.skills)
        ? storedUser.skills.filter((skill: string) => skill !== "undefined")
        : [],
      yearsOfExperience: storedUser?.yearsOfExperience || "",
      portfolio: storedUser?.socialLinks?.website || "",
      linkedin: storedUser?.socialLinks?.linkedin || "",
      resume: null, // Reset resume file
      bio: storedUser?.bio || "",
      identityType: storedUser?.identification?.type || "",
      identification: null,
      availability: storedUser?.availability,
    });
  }, [methods]);

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="heading flex items-center gap-[9px] w-full px-14 py-4 bg-[#F8F8F8]">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-2 select-none">
            <div
              className={`w-6 h-6 rounded-sm flex items-center justify-center text-white text-sm ${
                idx < currentStep
                  ? "bg-green-500"
                  : idx === currentStep
                  ? "bg-primary"
                  : "bg-[#878A93]"
              }`}
            >
              {idx < currentStep ? <Check size={16} /> : ""}
            </div>
            <span
              className={`${
                idx === currentStep ? "font-semibold" : "text-[#878A93]"
              }`}
            >
              {step}
            </span>
            {idx < steps.length - 1 && (
              <span className="text-[#878A93]">→</span>
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex items-center">
        <div className="w-full lg:w-[570px] flex flex-col gap-2 mx-auto p-2 lg:p-0">
          <FormProvider {...methods}>
            {currentStep === 0 && (
              <AboutYou
                user={user}
                onNext={onSubmitFinal}
                isAdding={isPending}
              />
            )}
            {currentStep === 1 && (
              <ProfessionalExperience
                onNext={onSubmitFinal}
                onBack={onBack}
                isAdding={isPending}
              />
            )}
            {currentStep === 2 && (
              <Profiling
                onBack={onBack}
                onSubmit={onSubmitFinal}
                isAdding={isPending}
              />
            )}
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetUp;