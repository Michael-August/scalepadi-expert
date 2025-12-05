import { Controller, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import MultiSelectDropdownField from "../multiselectDropdownMenu";
import { preferredIndustries, Roles, Skills } from "@/lib/constants";

const ProfessionalExperience = ({
	onBack,
	onNext,
	isAdding,
}: {
	onNext: (data: any) => void;
	onBack: () => void;
	isAdding: boolean;
}) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="w-full flex flex-col gap-6">
			<div className="top flex flex-col gap-2">
				<span className="text-[#0E1426] font-bold text-[32px]">
					Tell us about your professional experience
				</span>
				<span className="text-[#1A1A1A] font-normal text-base">
					Your profile set up will only take few minutes
				</span>
			</div>

			<div className="w-full border border-[#D1DAEC80] rounded-3xl lg:px-10 lg:pt-10 lg:pb-8">
				<form
					onSubmit={handleSubmit(onNext)}
					className="flex flex-col gap-6"
				>
					<div className="flex flex-col gap-4">
						{/* Joining Capacity */}
						{/* <div className="form-group flex flex-col gap-1">
                <Label>
                    Joining Capacity <span className="text-red-600">*</span>
                </Label>

                <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                        <SelectValue placeholder="Select Capacity" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectItem value="expert">Expert</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    )}
                />

                {errors.category?.message && (
                    <p className="text-red-500 text-sm">{typeof errors.category?.message === "string" ? errors.category.message : ""}</p>
                )}
            </div> */}

						{/* Roles */}
						<MultiSelectDropdownField
							name="roles"
							label="Roles"
							options={Roles}
							rules={{
								required: "At least one role is required",
							}}
						/>

						{/* Preferred Industries */}
						<MultiSelectDropdownField
							name="preferredIndustry"
							label="Preferred Industries"
							options={preferredIndustries}
							rules={{
								required: "At least one industry is required",
							}}
						/>

						{/* Skills */}
						<MultiSelectDropdownField
							name="skills"
							label="Skills"
							options={Skills}
							rules={{
								required: "At least one skill is required",
							}}
						/>

						{/* Years of Experience */}
						<div className="flex flex-col gap-1">
							<label className="block text-sm">
								Years of Experience
							</label>
							<Controller
								name="yearsOfExperience"
								control={control}
								rules={{
									required: "Experience level is required",
								}}
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
											<SelectValue placeholder="Select Experience level" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="Less than 1 year">
													Less than 1 year
												</SelectItem>
												<SelectItem value="1 to 2 years">
													1 to 2 years
												</SelectItem>
												<SelectItem value="3 to 5 years">
													3 to 5 years
												</SelectItem>
												<SelectItem value="6 to 10 years">
													6 to 10 years
												</SelectItem>
												<SelectItem value="10+ above">
													10+ above
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							/>
							{errors.yearsOfExperience?.message && (
								<p className="text-red-500 text-sm">
									{typeof errors.yearsOfExperience
										?.message === "string"
										? errors.yearsOfExperience.message
										: ""}
								</p>
							)}
						</div>

						{/* Portfolio */}
						<div className="flex flex-col gap-1">
							<label className="block text-sm">
								Portfolio Link
							</label>
							<Input
								{...register("portfolio", {
									required: "Portfolio link is required",
									pattern: {
										value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
										message: "Enter a valid URL",
									},
								})}
								className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
								placeholder="Enter Portfolio Link"
							/>
							<p className="text-xs text-[#878A93]">
								Example: https://www.behance.net/username or
								https://github.com/username
							</p>
							{errors.portfolio?.message && (
								<p className="text-red-500 text-sm">
									{errors?.portfolio?.message as string}
								</p>
							)}
						</div>

						{/* Linkedin */}
						<div className="flex flex-col gap-1">
							<label className="block text-sm">LinkedIn</label>
							<Input
								{...register("linkedin", {
									required: "LinkedIn profile is required",
									pattern: {
										value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
										message: "Enter a valid URL",
									},
								})}
								className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
								placeholder="Enter LinkedIn profile URL"
							/>
							<p className="text-xs text-[#878A93]">
								Example: https://www.linkedin.com/in/username
							</p>
							{errors.linkedin?.message && (
								<p className="text-red-500 text-sm">
									{errors?.linkedin?.message as string}
								</p>
							)}
						</div>

						{/* Resume */}
						{/* <div className="flex flex-col gap-1">
              <label className="block text-sm">Upload Resume</label>
              <label
                className="flex cursor-pointer items-center justify-between rounded-[14px] py-3 px-4 border border-[#D1DAEC]"
                htmlFor="resume"
              >
                <span className="text-gray-600 text-sm">Click to upload resume</span>
                <Upload className="text-gray-600 w-4 h-4" />
              </label>
              <Input
                {...register("resume")}
                type="file"
                id="resume"
                className="hidden"
              />
              {errors.resume?.message && (
                <p className="text-red-500 text-sm">
                  {errors?.resume?.message as string}
                </p>
              )}
            </div> */}
					</div>

					<div className="flex gap-4">
						<Button
							type="button"
							variant="outline"
							onClick={onBack}
							className="rounded-[14px]"
						>
							Back
						</Button>
						<Button
							disabled={isAdding}
							type="submit"
							className="bg-primary rounded-[14px] w-fit text-white py-2 px-4"
						>
							{isAdding ? "Submitting..." : "Next"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfessionalExperience;
