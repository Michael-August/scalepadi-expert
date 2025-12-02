import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";
import { NIGERIAN_STATES_AND_LGAS } from "@/lib/nigeria-data";

const AboutYou = ({
	onNext,
	user,
	isAdding,
}: {
	onNext: (data: any) => void;
	user: any;
	isAdding: boolean;
}) => {
	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useFormContext();

	const selectedCountry = watch("country", "Nigeria");
	const selectedState = watch("state");
	const [lgas, setLgas] = useState<string[]>([]);
	const [stateSearch, setStateSearch] = useState("");
	const [lgaSearch, setLgaSearch] = useState("");

	const filteredStates = Object.keys(NIGERIAN_STATES_AND_LGAS).filter((s) =>
		s.toLowerCase().includes(stateSearch.toLowerCase())
	);

	const filteredLgas = lgas.filter((lga) =>
		lga.toLowerCase().includes(lgaSearch.toLowerCase())
	);

	useEffect(() => {
		if (
			selectedCountry === "Nigeria" &&
			selectedState &&
			NIGERIAN_STATES_AND_LGAS[selectedState]
		) {
			setLgas(NIGERIAN_STATES_AND_LGAS[selectedState]);
		} else {
			setLgas([]);
		}
	}, [selectedCountry, selectedState]);

	return (
		<div className="w-full flex flex-col gap-6">
			<div className="top flex flex-col gap-2">
				<span className="text-[#0E1426] font-bold text-[32px]">
					Hi {user?.name?.split(" ")[0]}🤚, tell us about yourself
				</span>
				<span className="text-[#1A1A1A] font-normal text-base">
					Your profile setup will only take a few minutes
				</span>
			</div>

			<div className="w-full border border-[#D1DAEC80] rounded-3xl lg:px-10 lg:pt-10 lg:pb-8">
				<form
					onSubmit={handleSubmit(onNext)}
					className="flex flex-col gap-6"
				>
					{/* FULL NAME */}
					<div className="flex flex-col gap-1">
						<label className="block text-sm">Full Name</label>
						<Input
							{...register("name", {
								required: "Full name is required",
							})}
							placeholder="Enter Fullname"
							className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
						/>
						{errors.name && (
							<p className="text-red-500 text-sm">
								{errors.name.message as string}
							</p>
						)}
					</div>

					{/* EMAIL */}
					<div className="flex flex-col gap-1">
						<label className="block text-sm">Email</label>
						<Input
							{...register("email", {
								required: "Email is required",
							})}
							placeholder="Enter Email"
							type="email"
							className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">
								{errors.email.message as string}
							</p>
						)}
					</div>

					{/* GENDER */}
					<div className="form-group flex flex-col gap-1">
						<Label>
							Gender <span className="text-red-600">*</span>
						</Label>
						<Controller
							name="gender"
							control={control}
							rules={{ required: "Gender is required" }}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<SelectTrigger className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] w-full">
										<SelectValue placeholder="Select Gender" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="male">
												Male
											</SelectItem>
											<SelectItem value="female">
												Female
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.gender && (
							<p className="text-red-500 text-sm">
								{errors.gender.message as string}
							</p>
						)}
					</div>

					{/* PHONE */}
					<div className="form-group flex flex-col gap-1">
						<Label>
							Phone Number <span className="text-red-600">*</span>
						</Label>
						<Controller
							name="phone"
							control={control}
							rules={{ required: "Phone number is required" }}
							render={({ field }) => (
								<PhoneInput
									country="ng"
									value={field.value}
									onChange={field.onChange}
									inputClass="!rounded-[14px] !py-6 !w-full !border !border-[#D1DAEC]"
								/>
							)}
						/>
						{errors.phone && (
							<p className="text-red-500 text-sm">
								{errors.phone.message as string}
							</p>
						)}
					</div>

					{/* COUNTRY */}
					<div className="flex flex-col gap-1">
						<Label>Country of Residence</Label>
						<Input
							{...register("country", {
								required: "Country is required",
							})}
							placeholder="Nigeria"
							defaultValue="Nigeria"
							onChange={(e) =>
								setValue("country", e.target.value)
							}
							className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] capitalize"
						/>
						{errors.country && (
							<p className="text-red-500 text-sm">
								{errors.country.message as string}
							</p>
						)}
					</div>

					{/* CONDITIONAL STATE & LGA */}
					{selectedCountry === "Nigeria" || "nigeria" ? (
						<>
							{/* STATE */}
							<div className="flex flex-col gap-1 w-full">
								<Label>State of Residence</Label>
								<Controller
									name="state"
									control={control}
									rules={{ required: "State is required" }}
									render={({ field }) => (
										<Select
											onValueChange={(val) => {
												field.onChange(val);
												setStateSearch(""); // reset search after selecting
											}}
											value={field.value}
										>
											<SelectTrigger className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] w-full">
												<SelectValue placeholder="Select or Search State" />
											</SelectTrigger>
											<SelectContent className="max-h-[250px] overflow-y-auto">
												<div className="p-2 sticky top-0 bg-white border-b border-[#E5E7EB]">
													<input
														type="text"
														placeholder="Search state..."
														value={stateSearch}
														onChange={(e) =>
															setStateSearch(
																e.target.value
															)
														}
														className="w-full px-3 py-2 text-sm border border-[#D1DAEC] rounded-md focus:outline-none"
													/>
												</div>

												<SelectGroup>
													{filteredStates.length >
													0 ? (
														filteredStates.map(
															(state) => (
																<SelectItem
																	key={state}
																	value={
																		state
																	}
																>
																	{state}
																</SelectItem>
															)
														)
													) : (
														<div className="py-3 text-center text-sm text-gray-500">
															No results found
														</div>
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								/>
								{errors.state && (
									<p className="text-red-500 text-sm">
										{errors.state.message as string}
									</p>
								)}
							</div>

							{/* LGA */}
							{/* <div className="flex flex-col gap-1 w-full">
                <Label>Local Government Area</Label>
                <Controller
                  name="lga"
                  control={control}
                  rules={{ required: "LGA is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val);
                        setLgaSearch("");
                      }}
                      value={field.value}
                      disabled={!selectedState}
                    >
                      <SelectTrigger className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] w-full">
                        <SelectValue placeholder="Select or Search LGA" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[250px] overflow-y-auto">
                        <div className="p-2 sticky top-0 bg-white border-b border-[#E5E7EB]">
                          <input
                            type="text"
                            placeholder="Search LGA..."
                            value={lgaSearch}
                            onChange={(e) => setLgaSearch(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-[#D1DAEC] rounded-md focus:outline-none"
                          />
                        </div>

                        <SelectGroup>
                          {filteredLgas.length > 0 ? (
                            filteredLgas.map((lga) => (
                              <SelectItem key={lga} value={lga}>
                                {lga}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="py-3 text-center text-sm text-gray-500">
                              No results found
                            </div>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.lga && (
                  <p className="text-red-500 text-sm">
                    {errors.lga.message as string}
                  </p>
                )}
              </div> */}
						</>
					) : (
						<>
							{/* OTHER COUNTRY STATE/PROVINCE */}
							<div className="flex flex-col gap-1">
								<Label>State/Province</Label>
								<Input
									{...register("state", {
										required: "State/Province is required",
									})}
									placeholder="Enter your state or province"
									className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
								/>
								{errors.state && (
									<p className="text-red-500 text-sm">
										{errors.state.message as string}
									</p>
								)}
							</div>

							{/* OTHER COUNTRY CITY/REGION */}
							<div className="flex flex-col gap-1">
								<Label>City/Region</Label>
								<Input
									{...register("lga", {
										required: "City/Region is required",
									})}
									placeholder="Enter your city or region"
									className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
								/>
								{errors.lga && (
									<p className="text-red-500 text-sm">
										{errors.lga.message as string}
									</p>
								)}
							</div>
						</>
					)}

					{/* SUBMIT */}
					<Button
						disabled={isAdding}
						type="submit"
						className="bg-primary rounded-[14px] w-fit text-white py-2 px-4"
					>
						{isAdding ? "Submitting..." : "Next"}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default AboutYou;
