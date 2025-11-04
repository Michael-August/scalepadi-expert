// import { Controller, useFormContext } from "react-hook-form";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Button } from "../ui/button";

// const AccountDetails = ({
//   onBack,
//   onSubmit,
//   isAdding,
// }: {
//   onBack: () => void;
//   onSubmit: (data: any) => void;
//   isAdding: boolean;
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//   } = useFormContext();

//   return (
//     <div className="w-full flex flex-col gap-6">
//       <div className="top flex flex-col gap-2">
//         <span className="text-[#0E1426] font-bold text-[32px]">
//           Account Details
//         </span>
//         <span className="text-[#1A1A1A] font-normal text-base">
//           Set up your payment information for seamless transactions
//         </span>
//       </div>

//       <div className="w-full border border-[#D1DAEC80] rounded-3xl lg:px-10 lg:pt-10 lg:pb-8">
//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
//           <div className="flex flex-col gap-4">
//             {/* Payment Method Selection */}
//             <div className="flex flex-col gap-1">
//               <label className="block text-sm">Preferred Payment Method</label>
//               <Controller
//                 name="paymentMethod"
//                 control={control}
//                 rules={{ required: "Payment method is required" }}
//                 render={({ field }) => (
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
//                       <SelectValue placeholder="Select Payment Method" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectItem value="bank">Bank Transfer</SelectItem>
//                         {/* <SelectItem value="paypal">PayPal</SelectItem>
//                         <SelectItem value="stripe">Stripe</SelectItem>
//                         <SelectItem value="wise">Wise</SelectItem> */}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//               {errors.paymentMethod?.message && (
//                 <p className="text-red-500 text-sm">
//                   {errors.paymentMethod.message as string}
//                 </p>
//               )}
//             </div>

//             {/* Bank Details Section - Commented out for now */}
           
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-1">
//                 <label className="block text-sm">Bank Name</label>
//                 <Input
//                   {...register("bankName")}
//                   className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
//                   placeholder="Enter bank name"
//                 />
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="block text-sm">Account Number</label>
//                 <Input
//                   {...register("accountNumber")}
//                   className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
//                   placeholder="Enter account number"
//                 />
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="block text-sm">Account Name</label>
//                 <Input
//                   {...register("accountName")}
//                   className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
//                   placeholder="Enter account holder name"
//                 />
//               </div>
//  {/*
//               <div className="flex flex-col gap-1">
//                 <label className="block text-sm">Bank Code</label>
//                 <Input
//                   {...register("bankCode")}
//                   className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
//                   placeholder="Enter bank code"
//                 />
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="block text-sm">SWIFT Code</label>
//                 <Input
//                   {...register("swiftCode")}
//                   className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
//                   placeholder="Enter SWIFT code"
//                 />
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="block text-sm">IBAN</label>
//                 <Input
//                   {...register("iban")}
//                   className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
//                   placeholder="Enter IBAN"
//                 />
//               </div>
//               */}
//             </div>
            

//             {/* PayPal Email - Commented out for now */}
//             {/*
//             <div className="flex flex-col gap-1">
//               <label className="block text-sm">PayPal Email</label>
//               <Input
//                 {...register("paypalEmail")}
//                 type="email"
//                 className="rounded-[14px] py-6 px-4 border border-[#D1DAEC]"
//                 placeholder="Enter PayPal email address"
//               />
//             </div>
//             */}

//             {/* Placeholder message since fields are commented out */}
//             {/* <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <p className="text-blue-700 text-sm">
//                 <strong>Note:</strong> Payment setup will be available soon. 
//                 You can complete your profile now and add payment details later.
//               </p>
//             </div> */}
//           </div>

//           {/* Navigation */}
//           <div className="flex gap-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onBack}
//               className="rounded-[14px]"
//             >
//               Back
//             </Button>
//             <Button
//               disabled={isAdding}
//               type="submit"
//               className="bg-primary rounded-[14px] w-fit text-white py-2 px-4"
//             >
//               {isAdding ? "Completing Setup..." : "Complete Setup"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AccountDetails;