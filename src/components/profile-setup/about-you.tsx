import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

const AboutYou = ({ onNext, user, isAdding }: { onNext: (data: any) => void; user: any; isAdding: boolean }) => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <div className="w-full flex flex-col gap-6">
            <div className="top flex flex-col gap-2">
                <span className="text-[#0E1426] font-bold text-[32px]">Hi { user?.name?.split(' ')[0] }🤚, tell us about yourself</span>
                <span className="text-[#1A1A1A] font-normal text-base">Your profile set up will only take few minutes</span>
            </div>

            <div className="w-full border border-[#D1DAEC80] rounded-3xl lg:px-10 lg:pt-10 lg:pb-8">
                <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-6">

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Full Name</label>
                            <Input
                                {...register('name', { required: 'Full name is required' })}
                                className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
                                placeholder="Enter Fullname"
                            />
                            {errors.name?.message && <p className="text-red-500 text-sm">{errors?.name?.message as string}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Email</label>
                            <Input
                                {...register('email', { required: 'Email is required' })}
                                className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
                                placeholder="Enter Email"
                                type="email"
                            />
                            {errors.email?.message && <p className="text-red-500 text-sm">{errors?.email?.message as string}</p>}
                        </div>

                        <div className="form-group flex flex-col gap-1">
                            <Label>
                                Gender <span className="text-red-600">*</span>
                            </Label>

                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: "Gender is required" }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
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
                                )}
                            />

                            {errors.gender?.message && (
                                <p className="text-red-500 text-sm">{errors.gender.message as string}</p>
                            )}
                        </div>

                        <div className="form-group w-full flex flex-col gap-1">
                            <Label>Phone Number <span className="text-red-600">*</span></Label>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: 'Phone number is required' }}
                                render={({ field }) => (
                                    <PhoneInput
                                        country={'ng'}
                                        value={field.value}
                                        onChange={field.onChange}
                                        inputClass="!rounded-[14px] !py-6 !w-full !border !border-[#D1DAEC]"
                                        containerClass="!w-full !rounded-tl-[14px] !rounded-bl-[14px]"
                                    />
                                )}
                            />
                            {errors.phone?.message && (
                                <p className="text-red-500 text-sm">{errors.phone.message as string}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Country of Residence</label>
                            <Input
                                {...register('country', { required: 'Country is required' })}
                                className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
                                placeholder="Enter Country"
                                type="text"
                            />
                            {errors.country?.message && <p className="text-red-500 text-sm">{errors?.country?.message as string}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">State of Residence</label>
                            <Input
                                {...register('state', { required: 'State is required' })}
                                className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
                                placeholder="Enter State"
                                type="text"
                            />
                            {errors.state?.message && <p className="text-red-500 text-sm">{errors?.state?.message as string}</p>}
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

export default AboutYou;
