"use client";

import { Button } from "@/components/ui/button";
import { useGetProjects } from "@/hooks/useProject";
import { Clock, Users2, X, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Dashboard = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "activeProjects" | "completedProjects"
  >("activeProjects");

  const status = activeTab === "activeProjects" ? "in-progress" : "completed";
  const { projects, isLoading } = useGetProjects({ status });

  return (
    <div className="w-full flex flex-col gap-4 lg:w-[919px]">
      {showNotification && (
        <div className="w-full flex gap-2 bg-[#FEF3CF47] p-5 border border-[#EFF2F3] rounded-[30px] animate-fadeIn">
          <div className="w-1 h-[100px] rounded-[8px] bg-gradient-to-b from-[#FFA8A8] to-[#FCFF00]" />
          <div className="flex flex-col w-full mt-2 ml-3 gap-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#1A1A1A] text-base">
                Your application has been submitted successfully.
              </span>
              <X
                onClick={() => setShowNotification(false)}
                className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800 transition"
              />
            </div>
            <div className="text-sm text-[#3E4351]">
              <p>It is currently under review.</p>
              <p>We’ll notify you via email once a project match is found.</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div className="page-heading flex flex-col gap-2">
          <span className="text-[#1A1A1A] font-bold text-2xl">
            Project Dashboard
          </span>
          <span className="text-[#1A1A1A] font-normal text-base">
            Here’s what’s on your radar today.
          </span>
        </div>

        <div className="rounded-3xl w-full border border-[#D1DAEC80] p-3 h-[862px]">
          <div className="tab py-2 w-1/2 flex items-center gap-5 bg-[#F9FAFB]">
            {["activeProjects", "completedProjects"].map((tab) => (
              <div
                key={tab}
                className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
                hover:border-primary transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent"
                }`}
                onClick={() =>
                  setActiveTab(tab as "activeProjects" | "completedProjects")
                }
              >
                <span className="text-sm capitalize">
                  {tab === "activeProjects"
                    ? "Active Projects"
                    : "Completed Projects"}
                </span>
              </div>
            ))}
          </div>

          <ProjectList
            projects={projects?.data || []}
            isLoading={isLoading}
            status={status}
          />
        </div>
      </div>
    </div>
  );
};

const ProjectList = ({
  projects,
  isLoading,
  status,
}: {
  projects: any[];
  isLoading: boolean;
  status: string;
}) => {
  if (isLoading) return <SkeletonLoader />;
  console.log(projects);

  if (!projects.length)
    return (
      <div className="h-full w-full bg-[#FBFCFC] rounded-3xl p-3 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <Image
            src={"/images/empty-search.svg"}
            alt="No projects"
            width={164}
            height={150}
          />
          <p className="text-[#878A93] text-base">
            No {status === "in-progress" ? "active" : "completed"} projects yet.
            Projects will appear here when available.
          </p>
        </div>
      </div>
    );

  return (
    <div className="h-full flex flex-col gap-3 w-full bg-[#FBFCFC] rounded-3xl p-3 overflow-y-scroll hide-scrollbar animate-fadeIn">
      {projects.map((project: any) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="project group border border-[#D1DAEC80] hover:border-[#B3C6FF] hover:shadow-sm transition-all bg-white rounded-2xl p-4 flex flex-col gap-3"
        >
          {/* Top row: avatar + title/company + meta */}
          <div className="flex items-start gap-4 md:items-center md:justify-between w-full">
            <div className="flex items-start gap-4">
              {/* Avatar (initials) */}
              <AvatarInitials
                companyName={
                  project.businessId?.name ||
                  project.businessId?.title ||
                  project.name ||
                  project.title
                }
              />

              {/* Title + Company */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#1A1A1A] font-semibold text-lg leading-tight">
                    {project.title}
                  </span>
                  <span className="text-[#6B7280] text-sm">
                    {project.businessId?.name || "Unknown Company"}
                  </span>
                </div>

                <div className="flex gap-4 text-[#6B7280] text-xs">
                  <div className="flex items-center gap-1">
                    <Users2 className="w-4 h-4" /> Member(s):
                    <span className="font-medium text-[#121217]">
                      {project.experts?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> Due Date:
                    <span className="font-medium text-[#121217]">
                      {project.dueDate
                        ? new Date(project.dueDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "TBD"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" /> Status:
                    <span className="font-medium text-[#121217] capitalize">
                      {project.status || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role + Brief box */}
          <div className="bg-[#F9FAFB] border border-[#E8EAF1] rounded-xl p-4 flex flex-col gap-2 text-sm">
            <div className="flex items-center">
              <span className="text-sm text-[#6B7280] font-medium">Goal: </span>
              <span className="text-sm text-[#121217] font-semibold">
                  {project.goal || "—"}
              </span>
            </div>

            <div className="text-sm text-[#3E4351]">
              <strong className="block mb-1 text-[#6B7280]">
                Project brief:
              </strong>
              <p className="text-sm text-[#3E4351] leading-relaxed line-clamp-3">
                {project.brief || "No project brief provided."}
              </p>
            </div>
          </div>

          {/* Bottom row: left-aligned CTA */}
          <div className="flex items-center justify-start">
            <Button className="bg-primary text-white text-xs w-fit rounded-[10px] px-3 py-2 hover:bg-primary/90 transition">
              Open Workspace
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
};

/* Avatar component: initials in a rounded square matching the visual sample */
const AvatarInitials = ({ companyName }: { companyName?: string }) => {
  const name = companyName || "Unknown";
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Pick a deterministic background based on initials char codes
  const colors = [
    "bg-[#F0F9FF]",
    "bg-[#FEF3CF]",
    "bg-[#FCE7F3]",
    "bg-[#ECFDF5]",
    "bg-[#EFF6FF]",
    "bg-[#FFF7ED]",
  ];
  const colorIndex = initials.charCodeAt(0) % colors.length;
  const bgClass = colors[colorIndex];

  return (
    <div
      className={`w-[52px] h-[52px] rounded-lg flex items-center justify-center ${bgClass} border border-[#E6EEF9]`}
    >
      <span className="text-sm font-semibold text-[#0F172A]">{initials}</span>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="flex flex-col gap-3 p-3">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="w-full h-[140px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-2xl"
      />
    ))}
  </div>
);

export default Dashboard;

// "use client"

// import { Button } from "@/components/ui/button"
// import { useGetProjects } from "@/hooks/useProject"
// import { Church, Clock, Users2, X } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { useEffect, useState } from "react"

// const Dashboard = () => {

//     const [showNotification, setShowNotification] = useState(true)
//     const [activeTab, setActiveTab] = useState<'activeProjects' | 'completedProjects'>('activeProjects')

//     const [params, setParams] = useState({status: activeTab === 'activeProjects' ? 'in-progress' : 'completed'})

//     const { projects, isLoading } = useGetProjects(params)

//     useEffect(() => {
//         setParams({status: activeTab === 'activeProjects' ? 'in-progress' : 'completed'})
//     }, [activeTab])

//     return (
//         <div className="w-full flex flex-col gap-4 lg:w-[919px]">
//             {showNotification && <div className="w-full flex gap-1 bg-[#FEF3CF47] p-5 border border-[#EFF2F3] rounded-[30px]">
//                 <div className="w-1 h-[76.95px] mt-3 rounded-[8px] bg-gradient-to-b from-[#FFA8A8] to-[#FCFF00]"></div>
//                 <div className="w-1 h-[100px] rounded-[8px] bg-gradient-to-b from-[#FFA8A8] to-[#FCFF00]"></div>

//                 <div className="flex flex-col w-full mt-2 ml-3 gap-4">
//                     <div className="flex items-center justify-between">
//                         <span className="font-semibold text-[#1A1A1A] text-base">Your application has been submitted successfully.</span>
//                         <X onClick={() => setShowNotification(false)} className="w-4 h-4 text-gray-600 cursor-pointer" />
//                     </div>
//                     <div className="flex flex-col">
//                         <span className="text-[#3E4351] text-sm">It is currently under review. </span>
//                         <span className="text-[#3E4351] text-sm">We will notify you via email and dashboard alerts once a project match is found. </span>
//                     </div>
//                 </div>
//             </div>}
//             <div className="flex w-full flex-col gap-6">
//                 <div className="page-heading flex flex-col gap-2">
//                     <span className="text-[#1A1A1A] font-bold text-2xl">Project Dashboard</span>
//                     <span className="text-[#1A1A1A] font-normal text-base">Here is what is waiting for you today.</span>
//                 </div>

//                 <div className="rounded-3xl gap-3 w-full border border-[#D1DAEC80] hide-scrollbar p-3 h-[862px]">
//                     <div className="tab py-2 w-1/2 flex items-center gap-5 bg-[#F9FAFB]">
//                         <div
//                             className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
//                             hover:border-primary transition-colors
//                             ${activeTab === 'activeProjects' ? 'border-primary text-primary' : 'border-transparent'}`}
//                             onClick={() => setActiveTab('activeProjects')}
//                         >
//                             <span className="text-sm">Active Projects</span>
//                         </div>

//                         <div
//                             className={`flex cursor-pointer w-full items-center justify-center border-b-2 pb-3
//                             hover:border-primary transition-colors
//                             ${activeTab === 'completedProjects' ? 'border-primary text-primary' : 'border-transparent'}`}
//                             onClick={() => setActiveTab('completedProjects')}
//                         >
//                             <span className="text-sm">Completed Projecs</span>
//                         </div>
//                     </div>

//                     {activeTab === "activeProjects" &&
//                         <div className="h-full flex flex-col gap-2 w-full bg-[#FBFCFC] rounded-3xl p-3 hide-scrollbar overflow-y-scroll">
//                             {isLoading && <span>Loading...</span>}
//                             {((!isLoading && (!projects || projects?.data?.length === 0))) && (
//                                 <div className="empty-state h-full w-full bg-[#FBFCFC] rounded-3xl p-3">
//                                     <div className="bg-[#FFFFFF] h-full w-full rounded-[14px] border border-[#D1DAEC80] flex items-center justify-center">
//                                         <div className="flex flex-col items-center w-full lg:w-[533px] justify-center gap-10">
//                                             <Image src={'/images/empty-search.svg'} alt="Search icon" width={164} height={150} />
//                                             <span className="text-center text-base text-[#878A93]">
//                                                 You do not have any active projects yet, your projects will appear here as soon as you are matched with a project
//                                             </span>
//                                             {/* <Button className="bg-primary text-white w-fit rounded-[14px] px-4 py-6">Find New Project</Button> */}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                             {projects?.data?.map((project: any) => (
//                                 <Link key={project.id} href={`/projects/${project.id}`} className="project w-full p-3 rounded-2xl flex flex-col gap-2">
//                                     <div className="top w-full flex items-center gap-3">
//                                         <div className="bg-[#D1F7FF] flex items-center justify-center p-[5.84px] text-[#1A1A1A] text-xs h-[54px] rounded-[11.68px]">{project.client?.name}</div>
//                                         <div className="flex flex-col gap-2">
//                                             <span className="text-sm text-[#878A93] ">{project.title} </span>
//                                             <div className="items-center gap-2 flex">
//                                                 <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
//                                                     <Users2 className="w-4 h-4" />
//                                                     Members: <span className="text-[#121217]">{project.experts?.length.toString().padStart(2, '0')}</span>
//                                                 </span>
//                                                 <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
//                                                     <Clock className="w-4 h-4" />
//                                                     Due: <span className="text-[#121217]">{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
//                                                 </span>
//                                                 <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
//                                                     <Church className="w-4 h-4" />
//                                                     Status: <span className="text-[#121217]">{project.status === 'in-progress' ? 'In progress' : project.status}</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div className="flex flex-col gap-1">
//                                             <span className="text-sm text-[#878A93] ">{project.client?.name}</span>
//                                             <div className="items-center gap-1 flex">

//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="bg-white border border-[#D1DAEC80] flex flex-col gap-2 p-4 rounded-[14px] w-full">
//                                         <span className="text-sm text-[#878A93] font-normal">Role: <span className="text-[#1A1A1A]">{project.expertRole}</span></span>
//                                         <div className="flex flex-col gap-2 text-sm font-normal">
//                                             <span className="text-[#1A1A1A]">Project brief:</span>
//                                             <span className="text-[#727374]">{project.brief}</span>
//                                         </div>
//                                     </div>
//                                     <Button className="bg-primary text-white text-xs w-fit rounded-[10px] px-2 ">Open Workspace</Button>
//                                 </Link>
//                             ))}
//                         </div>
//                     }
//                     {activeTab === "completedProjects" &&
//                         <div className="h-full flex flex-col gap-2 w-full bg-[#FBFCFC] rounded-3xl p-3 hide-scrollbar overflow-y-scroll">
//                             {isLoading && <span>Loading...</span>}
//                             {((!isLoading && (!projects || projects?.data?.length === 0))) && (
//                                 <div className="empty-state h-full w-full bg-[#FBFCFC] rounded-3xl p-3">
//                                     <div className="bg-[#FFFFFF] h-full w-full rounded-[14px] border border-[#D1DAEC80] flex items-center justify-center">
//                                         <div className="flex flex-col items-center w-full lg:w-[533px] justify-center gap-10">
//                                             <Image src={'/images/empty-search.svg'} alt="Search icon" width={164} height={150} />
//                                             <span className="text-center text-base text-[#878A93]">
//                                                 You do not have any active projects yet, your projects will appear here as soon as you are matched with a project
//                                             </span>
//                                             {/* <Button className="bg-primary text-white w-fit rounded-[14px] px-4 py-6">Find New Project</Button> */}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                             {projects?.data?.map((project: any) => (
//                                 <Link key={project.id} href={`/projects/${project.id}`} className="project w-full p-3 rounded-2xl flex flex-col gap-2">
//                                     <div className="top w-full flex items-center gap-3">
//                                         <div className="bg-[#D1F7FF] flex items-center justify-center p-[5.84px] text-[#1A1A1A] text-xs h-[54px] rounded-[11.68px]">{project.client?.name}</div>
//                                         <div className="flex flex-col gap-2">
//                                             <span className="text-sm text-[#878A93] ">{project.title} </span>
//                                             <div className="items-center gap-2 flex">
//                                                 <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
//                                                     <Users2 className="w-4 h-4" />
//                                                     Members: <span className="text-[#121217]">{project.experts?.length.toString().padStart(2, '0')}</span>
//                                                 </span>
//                                                 <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
//                                                     <Clock className="w-4 h-4" />
//                                                     Due: <span className="text-[#121217]">{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div className="flex flex-col gap-1">
//                                             <span className="text-sm text-[#878A93] ">{project.client?.name}</span>
//                                             <div className="items-center gap-1 flex">
//                                                 <span className="flex items-center gap-[2px] text-sm text-[#878A93]">
//                                                     <Church className="w-4 h-4" />
//                                                     Status: <span className="text-[#121217]">{project.status === 'in-progress' ? 'In progress' : project.status}</span>
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="bg-white border border-[#D1DAEC80] flex flex-col gap-2 p-4 rounded-[14px] w-full">
//                                         <span className="text-sm text-[#878A93] font-normal">Role: <span className="text-[#1A1A1A]">{project.expertRole}</span></span>
//                                         <div className="flex flex-col gap-2 text-sm font-normal">
//                                             <span className="text-[#1A1A1A]">Project brief:</span>
//                                             <span className="text-[#727374]">{project.brief}</span>
//                                         </div>
//                                     </div>
//                                     <Button className="bg-primary text-white text-xs w-fit rounded-[10px] px-2 ">Open Workspace</Button>
//                                 </Link>
//                             ))}
//                         </div>
//                     }

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Dashboard
