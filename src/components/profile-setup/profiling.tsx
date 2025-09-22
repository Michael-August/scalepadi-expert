import { Controller, useFormContext } from "react-hook-form";
import MultiSelectField from "../multiselectfield";
import { Textarea } from "../ui/textarea";
import { Upload } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export enum Availability { FullTime = "full-time", PartTime = "part-time", Freelance = "freelance", NotAvailable = "not available", ProjectBased = "project-based", Others = "others", }

const Profiling = ({ onBack, onSubmit, isAdding }: { onBack: (data: any) => void; onSubmit: (data: any) => void, isAdding: boolean }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control
    } = useFormContext();

    const availabilityOptions = Object.values(Availability).map((value) => ({
        label: value.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()), // Pretty label
        value,
    }));

    const [preview, setPreview] = useState<string | null>(null);

    // Watch the file input
    const identificationFile = watch("identification");

    useEffect(() => {
        if (identificationFile && identificationFile.length > 0) {
            const file = identificationFile[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl); // Cleanup
        } else {
            setPreview(null);
        }
    }, [identificationFile]);

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="top flex flex-col gap-2">
                <span className="text-[#0E1426] font-bold text-[32px]">Little More , we did be done </span>
                <span className="text-[#1A1A1A] font-normal text-base">Your profile set up will only take few minutes</span>
            </div>

            <div className="w-full border border-[#D1DAEC80] rounded-3xl lg:px-10 lg:pt-10 lg:pb-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Availability</label>

                            <Controller
                                name="availability"
                                control={control}
                                rules={{ required: "Availabilty is required" }}
                                render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                                    <SelectValue placeholder="Select Means of Identification" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        {availabilityOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                                )}
                            />

                            {errors.availability?.message && (
                                <p className="text-red-500 text-sm">{errors.availability.message as string}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Bio</label>
                            <Textarea
                                {...register('bio', { required: 'Bio is required' })}
                                className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
                                placeholder="Write a brief bio about yourself"
                            />
                            {errors.bio?.message && <p className="text-red-500 text-sm">{errors?.bio?.message as string}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Identity type</label>
                            <label className="block text-sm text-gray-600">
                                this is to help scalepadi , assign you a verification badge and verify your identity
                            </label>

                            <Controller
                                name="identityType"
                                control={control}
                                rules={{ required: "Identity type is required" }}
                                render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                                    <SelectValue placeholder="Select Means of Identification" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="international passport">International Passport</SelectItem>
                                        <SelectItem value="national identification number">NIN</SelectItem>
                                        <SelectItem value="driver license">Driver license</SelectItem>
                                        <SelectItem value="voter's card">Voter&apos;s card</SelectItem>
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                                )}
                            />

                            {errors.identityType?.message && (
                                <p className="text-red-500 text-sm">{errors.identityType.message as string}</p>
                            )}
                            </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Upload a valid ID card</label>
                            <Controller
                                name="identification"
                                control={control}
                                rules={{ required: "Please upload an ID" }}
                                render={({ field }) => (
                                <>
                                    <label
                                        className="flex cursor-pointer items-center justify-between rounded-[14px] py-3 px-4 border border-[#D1DAEC]"
                                        htmlFor="idcard"
                                    >
                                        <span className="text-gray-600 text-sm">Click to upload means of identification</span>
                                        <Upload className="text-gray-600 w-4 h-4" />
                                    </label>
                                    <Input
                                        type="file"
                                        id="idcard"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            field.onChange(file); // store the File object in RHF state
                                            if (file) {
                                                const url = URL.createObjectURL(file);
                                                setPreview(url);
                                            } else {
                                                setPreview(null);
                                            }
                                        }}
                                    />
                                </>
                                )}
                            />
                            {errors.identification?.message && (
                                <p className="text-red-500 text-sm">{errors.identification.message as string}</p>
                            )}

                            {/* Image Preview */}
                            {preview && (
                                <div className="mt-3">
                                <img
                                    src={preview}
                                    alt="ID Preview"
                                    className="w-40 h-28 object-cover rounded-md border"
                                />
                                </div>
                            )}
                        </div>
                    </div>

                    <Button disabled={isAdding} type="submit" className="bg-primary rounded-[14px] w-fit text-white py-2 px-4">
                        {isAdding ? 'Submitting...' : 'Next'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Profiling
