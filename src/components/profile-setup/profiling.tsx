import { Controller, useFormContext } from "react-hook-form";
import MultiSelectField from "../multiselectfield";
import { Textarea } from "../ui/textarea";
import { Upload } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";

export enum Availability {
  FullTime = "full-time",
  PartTime = "part-time",
  Freelance = "freelance",
  NotAvailable = "not available",
  ProjectBased = "project-based",
  Others = "others",
}

const Profiling = ({
  onBack,
  onSubmit,
  isAdding,
}: {
  onBack: (data: any) => void;
  onSubmit: (data: any) => void;
  isAdding: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useFormContext();

  const availabilityOptions = Object.values(Availability).map((value) => ({
    label: value.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()), // Pretty label
    value,
  }));

  const [preview, setPreview] = useState<string | null>(null);

  // Watch the file input and identity type
  const identificationFile = watch("identification");
  const identityType = watch("identityType");

  useEffect(() => {
    if (identificationFile) {
      // Handle both single file and array cases
      const file = Array.isArray(identificationFile)
        ? identificationFile[0]
        : identificationFile;
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl); // Cleanup
      }
    } else {
      setPreview(null);
    }
  }, [identificationFile]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="top flex flex-col gap-2">
        <span className="text-[#0E1426] font-bold text-[32px]">
          Little More , we will be done{" "}
        </span>
        <span className="text-[#1A1A1A] font-normal text-base">
          Your profile set up will only take few minutes
        </span>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                <p className="text-red-500 text-sm">
                  {errors.availability.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm">Bio</label>
              <Textarea
                {...register("bio", { required: "Bio is required" })}
                className="rounded-[14px] py-6 px-4 border border-[#D1DAEC] pr-12"
                placeholder="Write a brief bio about yourself"
              />
              {errors.bio?.message && (
                <p className="text-red-500 text-sm">
                  {errors?.bio?.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm">Identity type</label>
              <label className="block text-sm text-gray-600">
                this is to help scalepadi , assign you a verification badge and
                verify your identity
              </label>

              <Controller
                name="identityType"
                control={control}
                rules={{ required: "Identity type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                      <SelectValue placeholder="Select Means of Identification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="international passport">
                          International Passport
                        </SelectItem>
                        <SelectItem value="national identification number">
                          NIN
                        </SelectItem>
                        <SelectItem value="driver license">
                          Driver license
                        </SelectItem>
                        <SelectItem value="voter's card">
                          Voter&apos;s card
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.identityType?.message && (
                <p className="text-red-500 text-sm">
                  {errors.identityType.message as string}
                </p>
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
                      <span className="text-gray-600 text-sm">
                        Click to upload means of identification
                      </span>
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
                        // Preview will be handled by useEffect watching the field value
                      }}
                    />
                  </>
                )}
              />
              {errors.identification?.message && (
                <p className="text-red-500 text-sm">
                  {errors.identification.message as string}
                </p>
              )}

              {/* Image Preview */}
              {preview && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex flex-col items-center gap-3">
                  <p className="text-sm font-medium text-gray-700">
                        ID Document Preview
                      </p>
                    <div className="flex-shrink-0">
                      <Image
                        src={preview}
                        alt="ID Preview"
                        width={80}
                        height={64}
                        className="w-20 h-16 object-cover rounded border"
                        unoptimized
                      />
                    </div>
                    {/* <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        ID Document Preview
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Selected: {identificationFile?.name || "ID document"}
                      </p>
                      {identityType && (
                        <p className="text-xs text-blue-600 mt-1">
                          Type:{" "}
                          {identityType
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str: string) => str.toUpperCase())}
                        </p>
                      )}
                      <p className="text-xs text-green-600 mt-1">
                        ✓ Document uploaded successfully
                      </p>
                    </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>

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

export default Profiling;
