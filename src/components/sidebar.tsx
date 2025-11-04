"use client";

import { Routes } from "@/lib/routes";
import { ChevronRight, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CircularProgress from "./circular-progress";
import { useGetExpertByToken, useLogout } from "@/hooks/useAuth";
import { toast } from "sonner";

const SideBar = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { logout, isPending } = useLogout();
  const { expert } = useGetExpertByToken();

  const handleLogOut = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout successful");
        localStorage.clear();
        window.location.href = "signin";
      },
    });
  };

  return (
    <div className="bg-white w-full border-r border-[#EDEEF3] px-[18px] py-[30px] flex flex-col gap-10">
      {/* Logo */}
      <Image src="/logo.svg" alt="Logo" width={137.7} height={28} />

      {/* Navigation routes */}
      <div className="flex flex-col justify-between flex-1">
        <div className="routes w-full flex flex-col gap-3">
          {Routes.map((route) => {
            const isActive = pathname.startsWith(route.route);
            return (
              <Link
                key={route.route}
                href={route.route}
                onClick={onLinkClick}
                className={`route cursor-pointer rounded-xl w-full items-center px-4 py-3 flex gap-[10px] font-medium text-sm
                  ${
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-[#1A1A1A] hover:bg-secondary hover:text-primary"
                  }`}
              >
                <route.icon />
                <span>{route.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Progress + Help + Logout */}
        <div className="flex flex-col gap-3">
          <div className="progress mb-4 flex flex-col w-full items-center gap-3 justify-center">
            <CircularProgress percentage={expert?.data?.regPercentage} />
            {expert?.data?.regPercentage < 100 ? (
              <>
                <span className="text-[#0A1B39] font-bold text-sm text-center">
                  Complete your profile
                </span>
                <span className="text-[#83899F] text-sm font-normal text-center">
                  {`You're ${expert.data.regPercentage}% done`}
                </span>
              </>
            ) : expert?.data?.verified ? (
              <>
                <span className="text-[#0A1B39] font-bold text-sm text-center">
                  Profile Verified
                </span>
                <span className="text-[#83899F] text-sm font-normal text-center">
                  Your account is fully verified and ready to take on projects
                </span>
              </>
            ) : (
              <>
                <span className="text-[#0A1B39] font-bold text-sm text-center">
                  Pending Verification
                </span>
                <span className="text-[#83899F] text-sm font-normal text-center">
                  Awaiting profile verification feedback
                </span>
              </>
            )}

            <Link
              href="/profile"
              onClick={onLinkClick}
              className="border border-[#E6E7EC] text-center cursor-pointer text-sm text-[#1A1A1A] font-medium px-4 py-[8px] rounded-[12px]"
            >
              My Profile
            </Link>
          </div>

          <div
            onClick={() => {
              router.push("/inquiry");
              onLinkClick && onLinkClick();
            }}
            className="flex w-full cursor-pointer justify-between bg-[#F5F6F8] items-center rounded-2xl px-4 py-3"
          >
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
              <Image
                src="/icons/double-message.svg"
                alt="message icon"
                width={24}
                height={24}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#1A1A1A] font-bold text-[15px]">
                Help Center
              </span>
              <span className="text-[#83899F] text-sm font-normal">
                Answers here
              </span>
            </div>
            <ChevronRight className="text-[#9CA0B2] w-4 h-4" />
          </div>

          <div
            className="cursor-pointer rounded-xl w-full items-center px-4 py-3 flex text-[#E33161] gap-[10px] font-medium text-sm"
            onClick={handleLogOut}
          >
            <LogOutIcon className="w-5 h-5" />
            <span>{isPending ? "Logging out..." : "Log out"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
