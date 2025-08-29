import { useFormContext } from "react-hook-form";
import MultiSelectField from "../multiselectfield";
import { Textarea } from "../ui/textarea";
import { Upload } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

const Profiling = ({ onBack, onSubmit, isAdding }: { onBack: (data: any) => void; onSubmit: (data: any) => void, isAdding: boolean }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="top flex flex-col gap-2">
                <span className="text-[#0E1426] font-bold text-[32px]">Little More , we did be done </span>
                <span className="text-[#1A1A1A] font-normal text-base">Your profile set up will only take few minutes</span>
            </div>

            <div className="w-full border border-[#D1DAEC80] rounded-3xl lg:px-10 lg:pt-10 lg:pb-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <MultiSelectField label="Available for?" name="availableFor" options={[]} />

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
                            <label className="block text-sm text-gray-600">this is to help scalepadi , assign you a verification badge and verify your identity</label>
                            <Select {...register('capacity', {required: 'Capacity is required'})}>
                                <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                                    <SelectValue placeholder="Select Means of Identification" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="male">NIN</SelectItem>
                                        <SelectItem value="female">BVN</SelectItem>
                                        <SelectItem value="female">Voter&apos;s Card</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.capacity?.message && <p className="text-red-500 text-sm">{errors?.capacity?.message as string}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Upload a valid ID card</label>
                            <label className="flex cursor-pointer items-center justify-between rounded-[14px] py-3 px-4 border border-[#D1DAEC]" htmlFor="idcard">
                                <span className="text-gray-600 text-sm">click to upload means of identification</span>
                                <Upload className="text-gray-600 w-4 h-4" />
                            </label>
                            <Input {...register('identification', { required: 'Please upload an ID' })} type="file" id="idcard" className="hidden" />
                            {errors.identification?.message && <p className="text-red-500 text-sm">{errors?.identification?.message as string}</p>}
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
