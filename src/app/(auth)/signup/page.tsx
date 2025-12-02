"use client";

import PhoneInput from "react-phone-input-2";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSignUp } from "@/hooks/useAuth";

import "react-phone-input-2/lib/style.css";

const signupFormSchema = z.object({
	name: z.string().min(1, "Full name is required"),
	gender: z.string().min(1, "Gender is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(1, "Phone number is required"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.refine((value) => {
			// Check for at least one uppercase letter, one lowercase letter, one number, and one special character
			return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
				value
			);
		}, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
	terms: z.boolean().refine((val) => val === true, {
		message: "You must accept the terms and conditions",
	}),
});

const SignUp = () => {
	const [selected, setSelected] = useState<"expert" | "business" | null>(
		"expert"
	);
	const [pageState, setPageState] = useState("initial");

	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();
	const { signUp, isPending } = useSignUp();

	const {
		handleSubmit,
		control,
		formState: { errors },
		register,
		reset,
		clearErrors,
	} = useForm({
		resolver: zodResolver(signupFormSchema),
		defaultValues: {
			name: "",
			gender: "",
			email: "",
			phone: "",
			password: "",
			terms: false,
		},
	});

	const onSubmit = (data: any) => {
		signUp(data, {
			onSuccess: (res) => {
				localStorage.setItem("newUserEmail", data.email);
				toast.success(res?.message || "Sign up successful");

				reset({
					name: "",
					gender: "",
					email: "",
					phone: "",
					password: "",
					terms: false,
				});
				clearErrors();

				router.replace("/otp");
			},
			onError: (error) => {
				// toast.error(error.message || "An error occurred during sign up");
				console.error("Sign up error:", error);
			},
		});
	};

	return (
		<div>
			{/* {pageState === 'initial' && 
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
                                    window.location.href = "https://business.scalepadi.com"; // replace with your link
                                }
                            }}
                            className="bg-primary text-white w-fit rounded-[14px] px-4 py-6"
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            } */}

			<div className="flex">
				<Image
					className="hidden lg:block"
					src={"/images/signup-side.svg"}
					alt="Side image"
					width={692}
					height={743}
				/>
				<div className="bg-[url('/images/blur-bg.svg')] w-full flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-center gap-6 lg:w-[506px]">
						<div className="top flex flex-col gap-4 items-center justify-center">
							<span className="text-primary-text font-bold lg:text-[32px] text-2xl">
								Sign up
							</span>
							<span className="text-secondary-text text-base font-medium text-center">
								Complete the form below to create account
							</span>
						</div>

						<div className="rounded-3xl bg-white p-10 border border-[#EFF2F3] w-full">
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col gap-6"
							>
								<div className="form-group flex flex-col gap-2">
									<Label>
										Full Name{" "}
										<span className="text-red-600">*</span>
									</Label>
									<Input
										{...register("name")}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										type="text"
										placeholder="Enter Full Name"
									/>
									{errors.name && (
										<span className="text-red-600 text-sm">
											{errors.name.message}
										</span>
									)}
								</div>
								<div className="form-group flex flex-col gap-2">
									<Label>
										Email{" "}
										<span className="text-red-600">*</span>
									</Label>
									<Input
										{...register("email")}
										className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
										type="email"
										placeholder="Enter email"
									/>
									{errors.email && (
										<span className="text-red-600 text-sm">
											{errors.email.message}
										</span>
									)}
								</div>
								{/* <div className="form-group flex flex-col gap-2">
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
                                    </div> */}
								<div className="form-group flex flex-col gap-2">
									<Label>
										Gender{" "}
										<span className="text-red-600">*</span>
									</Label>
									<Controller
										name="gender"
										control={control}
										rules={{
											required: "Gender is required",
										}}
										render={({ field, fieldState }) => (
											<>
												<Select
													onValueChange={
														field.onChange
													}
													value={field.value}
												>
													<SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
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
												{fieldState.error && (
													<p className="text-red-500 text-sm mt-1">
														{
															fieldState.error
																.message
														}
													</p>
												)}
											</>
										)}
									/>
								</div>
								<div className="form-group w-full flex flex-col gap-2">
									<Label>
										Phone Number{" "}
										<span className="text-red-600">*</span>
									</Label>
									<Controller
										name="phone"
										control={control}
										rules={{
											required:
												"Phone number is required",
										}}
										render={({ field, fieldState }) => (
											<div>
												<PhoneInput
													country={"ng"}
													value={field.value}
													onChange={(phone) =>
														field.onChange(phone)
													}
													inputClass="!rounded-[14px] !py-6 !w-full !border !border-[#D1DAEC]"
													containerClass="!w-full !rounded-tl-[14px] !rounded-bl-[14px]"
												/>
												{fieldState.error && (
													<p className="text-red-500 text-sm mt-1">
														{
															fieldState.error
																.message
														}
													</p>
												)}
											</div>
										)}
									/>
								</div>
								<div className="form-group flex flex-col gap-2">
									<Label>
										Password{" "}
										<span className="text-red-600">*</span>
									</Label>
									<div className="relative">
										<Input
											className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
											type={
												showPassword
													? "text"
													: "password"
											}
											placeholder="Enter password"
											{...register("password")}
										/>
										<button
											type="button"
											className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
											onClick={() =>
												setShowPassword(
													(prev: boolean) => !prev
												)
											}
										>
											{showPassword ? (
												<EyeOff size={20} />
											) : (
												<Eye size={20} />
											)}
										</button>
									</div>
									{errors.password && (
										<span className="text-red-600 text-sm">
											{errors.password.message}
										</span>
									)}
									<div className="flex flex-col gap-3">
										<div className="flex items-center gap-3">
											<Controller
												name="terms"
												control={control}
												render={({
													field,
													fieldState,
												}) => (
													<div className="flex flex-col gap-2">
														<div className="flex items-center gap-3">
															<Checkbox
																checked={
																	field.value
																}
																onCheckedChange={(
																	val
																) => {
																	field.onChange(
																		val
																	);
																	if (val)
																		clearErrors(
																			"terms"
																		);
																}}
															/>
															<span className="text-sm text-[#878A93]">
																By signing up,
																you agree to our{" "}
																<Link
																	href={
																		"/terms&conditions"
																	}
																	target="_blank"
																	className="text-primary cursor-pointer"
																>
																	Terms
																</Link>
																.
															</span>
														</div>

														{!field.value &&
															fieldState.error && (
																<p className="text-red-500 text-sm">
																	{
																		fieldState
																			.error
																			.message
																	}
																</p>
															)}
													</div>
												)}
											/>
										</div>
									</div>
								</div>
								<Button
									type="submit"
									disabled={isPending}
									className="bg-primary text-white w-fit rounded-[14px] px-4 py-6"
								>
									{isPending ? (
										<>
											Creating Account
											<Loader
												size={16}
												className="animate-spin"
											/>
										</>
									) : (
										"Create my account"
									)}
									{/* {isPending ? "Creating Account..." : "Create my account"} */}
								</Button>
							</form>
						</div>

						<div className="w-full">
							<Link
								href={"/signin"}
								className="text-sm text-[#878A93] text-left"
							>
								Already have an account?{" "}
								<span className="text-primary cursor-pointer">
									Log in
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
