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
    label: value.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    value,
  }));

  const [preview, setPreview] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const identificationFile = watch("identification");
  const identityType = watch("identityType");

  useEffect(() => {
    if (identificationFile) {
      const file = Array.isArray(identificationFile)
        ? identificationFile[0]
        : identificationFile;

      if (file) {
        const sizeInMB = file.size / (1024 * 1024);
        setFileSize(sizeInMB);

        if (sizeInMB > 5) {
          setFileError("File size exceeds 5MB. Please upload a smaller image.");
          setPreview(null);
          return;
        }

        setFileError(null);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
      }
    } else {
      setPreview(null);
      setFileSize(null);
      setFileError(null);
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
            {/* Availability */}
            <div className="flex flex-col gap-1">
              <label className="block text-sm">Availability</label>

              <Controller
                name="availability"
                control={control}
                rules={{ required: "Availability is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full rounded-[14px] py-6 px-4 border border-[#D1DAEC]">
                      <SelectValue placeholder="Select Availability Type" />
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

            {/* Bio */}
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

            {/* Identity Type */}
            <div className="flex flex-col gap-1">
              <label className="block text-sm">Identity type</label>
              <label className="block text-sm text-gray-600">
                This helps Scalepadi assign you a verification badge and confirm
                your identity.
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
                          Driver’s License
                        </SelectItem>
                        <SelectItem value="voter's card">
                          Voter’s Card
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

            {/* Upload ID */}
            <div className="flex flex-col gap-1">
              <label className="block text-sm">Upload a valid ID card</label>
              <p className="text-gray-500 text-xs">
                Only image files (JPEG, PNG) under 5MB are allowed.
              </p>

              <Controller
                name="identification"
                control={control}
                rules={{ required: "Please upload an ID" }}
                render={({ field }) => (
                  <>
                    <label
                      className="flex cursor-pointer items-center justify-between rounded-[14px] py-3 px-4 border border-[#D1DAEC] hover:bg-gray-50 transition"
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
                        if (file) field.onChange(file);
                      }}
                    />
                  </>
                )}
              />

              {fileError && (
                <p className="text-red-500 text-sm">{fileError}</p>
              )}
              {errors.identification?.message && (
                <p className="text-red-500 text-sm">
                  {errors.identification.message as string}
                </p>
              )}

              {/* Image Preview */}
              {preview && !fileError && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-sm font-medium text-gray-700">
                      ID Document Preview
                    </p>
                    <Image
                      src={preview}
                      alt="ID Preview"
                      width={80}
                      height={64}
                      className="w-20 h-16 object-cover rounded border"
                      unoptimized
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      File Size: {fileSize?.toFixed(2)} MB
                    </p>
                    {/* {identityType && (
                      <p className="text-xs text-blue-600 mt-1">
                        Type: {identityType}
                      </p>
                    )}
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Document ready for upload
                    </p> */}
                  </div>
                </div>
              )}
            </div>

            {/* Cloudinary Upload Example (Commented) */}
            {/*
              // To integrate with Cloudinary:
              const formData = new FormData();
              formData.append("file", identificationFile);
              formData.append("upload_preset", "<your_upload_preset>");
              const response = await fetch("https://api.cloudinary.com/v1_1/<cloud_name>/upload", {
                method: "POST",
                body: formData,
              });
              const data = await response.json();
              console.log("Cloudinary URL:", data.secure_url);
            */}
          </div>

          {/* Navigation */}
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

export default Profiling;
