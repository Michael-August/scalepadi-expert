import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import MultiSelectField from "../multiselectfield";
import { Upload } from "lucide-react";

const ProfessionalExperience = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="top flex flex-col gap-2">
                <span className="text-[#0E1426] font-bold text-[32px]">Tell us about your professional experience</span>
                <span className="text-[#1A1A1A] font-normal text-base">Your profile set up will only take few minutes</span>
            </div>

            <div className="w-full border border-[#D1DAEC80] rounded-3xl lg:px-10 lg:pt-10 lg:pb-8">
                <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="form-group flex flex-col gap-1">
                            <Label>Joining Capacity <span className="text-red-600">*</span></Label>
                            <Select {...register('capacity', {required: 'Capacity is required'})}>
                                <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                                    <SelectValue placeholder="Select Capacity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="male">Expert</SelectItem>
                                        <SelectItem value="female">Business</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.capacity?.message && <p className="text-red-500 text-sm">{errors?.capacity?.message as string}</p>}
                        </div>

                        <MultiSelectField label="Role" name="role" options={[]} />

                        <MultiSelectField label="Preferred Industries" name="industry" options={[]} />

                        <MultiSelectField label="Skills" name="skills" options={[]} />

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Years of Experience</label>
                            <Input
                                {...register('experience', { required: 'Experience is required' })}
                                className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
                                placeholder="Enter Years of Experience"
                            />
                            {errors.experience?.message && <p className="text-red-500 text-sm">{errors?.experience?.message as string}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Portfolio Link</label>
                            <Input
                                {...register('portfolio', {
                                    required: 'Portfolio link is required',
                                    pattern: {
                                        value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                                        message: 'Enter a valid URL',
                                    },
                                    validate: (value) =>
                                        value.startsWith('http://') || value.startsWith('https://')
                                          ? true
                                          : 'Enter a valid URL starting with http:// or https://',
                                })}
                                className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
                                placeholder="Enter Portfolio Link"
                            />
                            {errors.portfolio?.message && <p className="text-red-500 text-sm">{errors?.portfolio?.message as string}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Linkedin</label>
                            <Input
                                {...register('linkedin', {
                                    required: 'Linked Profile is required',
                                    pattern: {
                                        value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                                        message: 'Enter a valid URL',
                                    },
                                    validate: (value) =>
                                        value.startsWith('http://') || value.startsWith('https://')
                                          ? true
                                          : 'Enter a valid URL starting with http:// or https://',
                                })}
                                className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
                                placeholder="Enter Linkedin profile URL"
                            />
                            {errors.linkedin?.message && <p className="text-red-500 text-sm">{errors?.linkedin?.message as string}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm">Upload Resume</label>
                            <label className="flex cursor-pointer items-center justify-between rounded-[14px] py-3 px-4 border border-[#D1DAEC]" htmlFor="resume">
                                <span className="text-gray-600 text-sm">click to upload resume</span>
                                <Upload className="text-gray-600 w-4 h-4" />
                            </label>
                            <Input {...register('resume', { required: 'Please upload a resume' })} type="file" id="resume" className="hidden" />
                            {errors.resume?.message && <p className="text-red-500 text-sm">{errors?.resume?.message as string}</p>}
                        </div>
                    </div>

                    <Button type="submit" className="bg-primary rounded-[14px] w-fit text-white py-2 px-4">
                        Next
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ProfessionalExperience
