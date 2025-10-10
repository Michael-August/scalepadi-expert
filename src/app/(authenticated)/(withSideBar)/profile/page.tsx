"use client";

import {
  useAccountDetailsUpload,
  useGetAccountDetails,
  useUpdateAccountDetails,
} from "@/hooks/useAccount";
import { useCompleteProfileSetUp } from "@/hooks/useAuth";
import {
  Clock,
  Edit2,
  Link as LinkIcon,
  Pin,
  Trash2Icon,
  Verified,
  X,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import dynamic from 'next/dynamic';

// Dynamically import react-pdf components with no SSR
const PDFViewer = dynamic(() => import('./PDFViewer'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading PDF viewer...</span>
  </div>
});

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const { completeProfileSetup, isPending: isProfilePending } =
    useCompleteProfileSetUp();
  const [activeTab, setActiveTab] = useState<"about" | "portfolio" | "account">(
    "about"
  );
  const [showResumePdfPreview, setShowResumePdfPreview] = useState(false);
  const [showIdPdfPreview, setShowIdPdfPreview] = useState(false);

  const { accountDetailsUpload, isPending: isUploadPending } =
    useAccountDetailsUpload();
  const { data: accountDetails, isLoading: isAccountLoading } =
    useGetAccountDetails();
  const { updateAccountDetails, isPending: isUpdatePending } =
    useUpdateAccountDetails();

  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [accountFormData, setAccountFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    branch: "",
    sortCode: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      const formData = new FormData();
      formData.append("profilePicture", file);

      completeProfileSetup(formData, {
        onSuccess: (data) => {
          const updatedUser = {
            ...user,
            profilePicture: data?.data?.profilePicture,
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          toast.success("Profile picture updated successfully");
        },
      });
    }
  };

  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (accountDetails) {
      setAccountFormData({
        bankName: accountDetails?.bankName || "",
        accountNumber: accountDetails?.accountNumber || "",
        accountName: accountDetails?.accountName || "",
        branch: accountDetails?.branch || "",
        sortCode: accountDetails?.sortCode || "",
      });
    }
  }, [accountDetails]);

  const handleAccountDetailsSave = () => {
    const hasExistingAccount =
      accountDetails &&
      (accountDetails.bankName ||
        accountDetails.accountNumber ||
        accountDetails.accountName);

    const accountId = accountDetails?.id || user?.expertId;

    if (hasExistingAccount && accountId) {
      // Update existing account details
      updateAccountDetails(
        { accountId, data: accountFormData },
        {
          onSuccess: () => {
            const updatedUser = {
              ...user,
              bankDetails: accountFormData,
            };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setIsEditingAccount(false);
            toast.success("Account details updated successfully");
          },
          onError: (error: Error) => {
            console.error("Failed to update account details:", error);
          },
        }
      );
    } else {
      accountDetailsUpload(accountFormData, {
        onSuccess: () => {
          const updatedUser = {
            ...user,
            bankDetails: accountFormData,
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setIsEditingAccount(false);
          toast.success("Account details saved successfully");
        },
        onError: (error: Error) => {
          console.error("Failed to upload account details:", error);
        },
      });
    }
  };

  // Add loading state
  if (!user) {
    return (
      <div className="w-full flex flex-col gap-4 lg:w-[919px]">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  const isAccountPending = isUploadPending || isUpdatePending;

  return (
    <div className="w-full flex flex-col gap-4 lg:w-[919px]">
      <div className="flex w-full flex-col gap-6">
        <div className="page-heading flex flex-col gap-2">
          <span className="text-[#1A1A1A] font-bold text-2xl">My Profile</span>
          <span className="text-[#1A1A1A] font-normal text-base">
            Configure your profile to your taste
          </span>
        </div>

        <div className="rounded-3xl gap-3 w-full border border-[#D1DAEC80] p-6">
          <div className="rounded-3xl flex flex-col gap-2 w-full h-full bg-[#FBFCFC] py-6 px-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[70px] relative h-[70px] rounded-full">
                  <Image
                    src={user?.profilePicture || "/images/profile-pic.svg"}
                    alt="Profile Picture"
                    width={70}
                    height={70}
                    className="rounded-full w-full h-full object-cover"
                  />
                  <Image
                    className="absolute bottom-0 left-0"
                    src={"/images/profile-logo.svg"}
                    alt="logo"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#1A1A1A] font-medium text-[20px] capitalize">
                    {user?.name || "No name provided"}
                  </span>
                  <div className="flex items-center gap-2">
                    {user?.verified ? (
                      <span className="flex items-center gap-[2px] font-medium text-green-600 text-sm">
                        <Verified className="w-4 h-4 fill-green-600 text-white" />{" "}
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-[2px] font-medium text-red-500 text-sm capitalize">
                        <X className="w-4 h-4 text-red-600" /> Unverified
                      </span>
                    )}
                    <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm capitalize">
                      <Pin className="w-4 h-4 text-[#878A93]" />{" "}
                      {user?.state || "N/A"}, {user?.country || "N/A"}
                    </span>
                    <span className="flex items-center gap-[2px] font-medium text-[#878A93] text-sm capitalize">
                      <Clock className="w-4 h-4 text-[#878A93]" /> Availability:{" "}
                      {user?.availability ? (
                        user.availability
                          .split(",")
                          .map((avail: string, index: number) => (
                            <span key={index}>{avail}</span>
                          ))
                      ) : (
                        <span>Not specified</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#F2F7FF] hover:bg-[#E8F1FF] transition-colors rounded-lg text-[#1E88E5] font-medium text-sm"
                >
                  <Edit2 className="w-4 h-4 text-[#1E88E5]" />
                  Change Image
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <button
                  type="button"
                  onClick={() => {
                    setProfileImage(null);
                    setUser({ ...user, profilePicture: null });
                    localStorage.setItem(
                      "user",
                      JSON.stringify({ ...user, profilePicture: null })
                    );
                    toast.success("Profile image removed");
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF3F6] hover:bg-[#FFE8ED] transition-colors rounded-lg text-[#E33161] font-medium text-sm"
                >
                  <Trash2Icon className="w-4 h-4 text-[#E33161]" />
                  Remove
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                <div className="tab pt-2 w-1/2 flex items-center gap-5 bg-[#F9FAFB]">
                  <div
                    className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3 hover:border-[#3A96E8] transition-colors ${
                      activeTab === "about"
                        ? "border-[#3A96E8] text-[#3A96E8]"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveTab("about")}
                  >
                    <span className="text-sm">About</span>
                  </div>

                  <div
                    className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3 hover:border-[#3A96E8] transition-colors ${
                      activeTab === "portfolio"
                        ? "border-[#3A96E8] text-[#3A96E8]"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveTab("portfolio")}
                  >
                    <span className="text-sm">Portfolio</span>
                  </div>

                  <div
                    className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3 hover:border-[#3A96E8] transition-colors ${
                      activeTab === "account"
                        ? "border-[#3A96E8] text-[#3A96E8]"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveTab("account")}
                  >
                    <span className="text-sm">Account details</span>
                  </div>
                </div>
              </div>

              {activeTab === "about" && (
                <div className="flex flex-col gap-4">
                  {/* About section remains the same */}
                  <div className="about flex flex-col capitalize rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[20px] text-primary">
                        Bio
                      </span>
                      <span
                        onClick={() =>
                          router.push(`/profile-setup?step=profiling`)
                        }
                        className="border border-[#E7E8E9] hover:bg-yellow-400 hover:text-white rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm"
                      >
                        Update
                      </span>
                    </div>
                    <span className="text-[#353D44] text-sm">
                      {user?.bio || "No bio provided"}
                    </span>
                  </div>

                  <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[20px] text-primary">
                        Personal information
                      </span>
                      <span
                        onClick={() =>
                          router.push(`/profile-setup?step=about-you`)
                        }
                        className="border border-[#E7E8E9] hover:bg-yellow-400 hover:text-white rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm"
                      >
                        Edit
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="flex flex-col gap-1 capitalize">
                        <span className="text-[#878A93] text-sm font-normal">
                          Full Name
                        </span>
                        <span className="text-[#1A1A1A] text-base font-semibold">
                          {user?.name || "Not provided"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[#878A93] text-sm font-normal">
                          Email
                        </span>
                        <span className="text-[#1A1A1A] text-base font-semibold">
                          {user?.email || "Not provided"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 capitalize">
                        <span className="text-[#878A93] text-sm font-normal">
                          Gender
                        </span>
                        <span className="text-[#1A1A1A] text-base font-semibold">
                          {user?.gender || "Not specified"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[#878A93] text-sm font-normal">
                          Phone number
                        </span>
                        <span className="text-[#1A1A1A] text-base font-semibold">
                          {user?.phone || "Not provided"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 capitalize">
                        <span className="text-[#878A93] text-sm font-normal">
                          Country of residence
                        </span>
                        <span className="text-[#1A1A1A] text-base font-semibold">
                          {user?.country || "Not provided"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 capitalize">
                        <span className="text-[#878A93] text-sm font-normal">
                          State of residence
                        </span>
                        <span className="text-[#1A1A1A] text-base font-semibold">
                          {user?.state || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "portfolio" && (
                <div className="flex flex-col gap-4">
                  {/* Resume Section */}
                  <div className="portfolio flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[20px] text-primary">
                        Resume
                      </span>
                      <span
                        onClick={() =>
                          router.push(`/profile-setup?step=profiling`)
                        }
                        className="border border-[#E7E8E9] hover:bg-yellow-400 hover:text-white rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm"
                      >
                        Update
                      </span>
                    </div>

                    {/* Resume Display */}
                    <div className="flex flex-col gap-4">
                      {user?.resume ? (
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <FileText className="w-8 h-8 text-green-600" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-800">
                                Resume Uploaded
                              </p>
                              <p className="text-xs text-green-600">
                                Click update to change your resume
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <a
                                href={user.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-primary text-white rounded text-sm transition-colors"
                              >
                                Download
                              </a>
                              <button
                                onClick={() =>
                                  setShowResumePdfPreview(!showResumePdfPreview)
                                }
                                className="px-3 py-1 bg-gray-600 text-white rounded text-sm transition-colors"
                              >
                                {showResumePdfPreview
                                  ? "Hide Preview"
                                  : "Preview"}
                              </button>
                            </div>
                          </div>

                          {/* PDF Preview */}
                          {showResumePdfPreview && (
                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                              <PDFViewer 
                                fileUrl={user.resume}
                                type="resume"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <FileText className="w-8 h-8 text-yellow-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-yellow-800">
                              No Resume Uploaded
                            </p>
                            <p className="text-xs text-yellow-600">
                              Upload your resume to complete your profile
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Identity Section */}
                  <div className="portfolio flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[20px] text-primary">
                        Identity
                      </span>
                      <span
                        onClick={() =>
                          router.push(`/profile-setup?step=profiling`)
                        }
                        className="border border-[#E7E8E9] rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm"
                      >
                        Update
                      </span>
                    </div>

                    {/* Identity Type and ID Image */}
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#878A93] text-sm font-normal">
                          Identity Type
                        </span>
                        <span className="text-[#1A1A1A] text-base font-semibold">
                          {user?.identification?.type
                            ? user.identification.type
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str: string) =>
                                  str.toUpperCase()
                                )
                            : "Not specified"}
                        </span>
                      </div>

                      {/* ID Document Display */}
                      {user?.identification?.idImage && (
                        <div className="flex flex-col gap-3">
                          <span className="text-[#878A93] text-sm font-normal">
                            ID Document
                          </span>

                          {/* Check if file is PDF */}
                          {user.identification.idImage
                            .toLowerCase()
                            .endsWith(".pdf") ? (
                            <div className="flex flex-col gap-3">
                              <div className="flex gap-2">
                                <a
                                  href={user.identification.idImage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                                >
                                  Download PDF
                                </a>
                                <button
                                  onClick={() =>
                                    setShowIdPdfPreview(!showIdPdfPreview)
                                  }
                                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                                >
                                  {showIdPdfPreview
                                    ? "Hide Preview"
                                    : "Preview PDF"}
                                </button>
                              </div>

                              {/* PDF Preview for ID Document */}
                              {showIdPdfPreview && (
                                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                  <PDFViewer 
                                    fileUrl={user.identification.idImage}
                                    type="id"
                                  />
                                </div>
                              )}
                            </div>
                          ) : (
                            // Show image for non-PDF files
                            <div className="relative w-40">
                              <Image
                                src={user.identification.idImage}
                                alt="ID Document"
                                width={160}
                                height={100}
                                className="w-full h-auto rounded-md border border-gray-200 object-cover"
                                unoptimized
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {!user?.identification?.idImage && (
                        <div className="flex flex-col gap-2">
                          <span className="text-[#878A93] text-sm font-normal">
                            ID Document
                          </span>
                          <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                            <div className="text-center">
                              <div className="text-gray-400 text-sm mb-2">
                                No ID document uploaded
                              </div>
                              <div className="text-xs text-gray-500">
                                Upload your ID document to get verified
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <div className="flex flex-col gap-4">
                  {/* Account section remains the same */}
                  <div className="about flex flex-col rounded-[14px] bg-white border border-[#D1DAEC80] gap-3 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[20px] text-primary">
                        Account Details
                      </span>
                      <span
                        onClick={() => setIsEditingAccount(!isEditingAccount)}
                        className="border border-[#E7E8E9] hover:bg-yellow-400 hover:text-white rounded-[10px] p-2 bg-white cursor-pointer text-[#0E1426] text-sm"
                      >
                        {isEditingAccount ? "Cancel" : "Edit"}
                      </span>
                    </div>

                    {!isEditingAccount ? (
                      // Display mode
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-[#878A93] text-sm font-normal">
                            Bank Name
                          </span>
                          <span className="text-[#1A1A1A] text-base font-semibold">
                            {accountDetails?.bankName ||
                              user?.bankDetails?.bankName ||
                              "Not provided"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[#878A93] text-sm font-normal">
                            Account Number
                          </span>
                          <span className="text-[#1A1A1A] text-base font-semibold">
                            {accountDetails?.accountNumber ||
                              user?.bankDetails?.accountNumber ||
                              "Not provided"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[#878A93] text-sm font-normal">
                            Account Name
                          </span>
                          <span className="text-[#1A1A1A] text-base font-semibold">
                            {accountDetails?.accountName ||
                              user?.bankDetails?.accountName ||
                              "Not provided"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[#878A93] text-sm font-normal">
                            Branch
                          </span>
                          <span className="text-[#1A1A1A] text-base font-semibold">
                            {accountDetails?.branch ||
                              user?.bankDetails?.branch ||
                              "Not provided"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[#878A93] text-sm font-normal">
                            Sort Code
                          </span>
                          <span className="text-[#1A1A1A] text-base font-semibold">
                            {accountDetails?.sortCode ||
                              user?.bankDetails?.sortCode ||
                              "Not provided"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      // Edit mode
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[#878A93] text-sm font-normal">
                            Bank Name
                          </label>
                          <input
                            type="text"
                            value={accountFormData.bankName}
                            onChange={(e) =>
                              setAccountFormData((prev) => ({
                                ...prev,
                                bankName: e.target.value,
                              }))
                            }
                            className="rounded-[14px] py-3 px-4 border border-[#D1DAEC]"
                            placeholder="Enter bank name"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[#878A93] text-sm font-normal">
                            Account Number
                          </label>
                          <input
                            type="text"
                            value={accountFormData.accountNumber}
                            onChange={(e) =>
                              setAccountFormData((prev) => ({
                                ...prev,
                                accountNumber: e.target.value,
                              }))
                            }
                            className="rounded-[14px] py-3 px-4 border border-[#D1DAEC]"
                            placeholder="Enter account number"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[#878A93] text-sm font-normal">
                            Account Name
                          </label>
                          <input
                            type="text"
                            value={accountFormData.accountName}
                            onChange={(e) =>
                              setAccountFormData((prev) => ({
                                ...prev,
                                accountName: e.target.value,
                              }))
                            }
                            className="rounded-[14px] py-3 px-4 border border-[#D1DAEC]"
                            placeholder="Enter account holder name"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[#878A93] text-sm font-normal">
                            Branch
                          </label>
                          <input
                            type="text"
                            value={accountFormData.branch}
                            onChange={(e) =>
                              setAccountFormData((prev) => ({
                                ...prev,
                                branch: e.target.value,
                              }))
                            }
                            className="rounded-[14px] py-3 px-4 border border-[#D1DAEC]"
                            placeholder="Enter branch"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[#878A93] text-sm font-normal">
                            Sort Code
                          </label>
                          <input
                            type="text"
                            value={accountFormData.sortCode}
                            onChange={(e) =>
                              setAccountFormData((prev) => ({
                                ...prev,
                                sortCode: e.target.value,
                              }))
                            }
                            className="rounded-[14px] py-3 px-4 border border-[#D1DAEC]"
                            placeholder="Enter sort code"
                          />
                        </div>
                        <div className="flex items-center gap-3 mt-4 col-span-2">
                          <button
                            onClick={handleAccountDetailsSave}
                            disabled={isAccountPending}
                            className="bg-primary text-white py-2 px-6 rounded-[14px] hover:bg-primary-dark transition-colors disabled:opacity-50"
                          >
                            {isAccountPending ? "Saving..." : "Save Changes"}
                          </button>
                          <button
                            onClick={() => setIsEditingAccount(false)}
                            className="border border-gray-300 text-gray-700 py-2 px-6 rounded-[14px] hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;