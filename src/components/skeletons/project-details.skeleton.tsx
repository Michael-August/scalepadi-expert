"use client"

import { Skeleton } from "../ui/skeleton"


const ProjectSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Project brief */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-40 rounded-md" /> {/* title */}
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-11/12 rounded-md" />
        <Skeleton className="h-4 w-10/12 rounded-md" />
      </div>

      {/* Goal */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-20 rounded-md" /> {/* title */}
        <Skeleton className="h-4 w-9/12 rounded-md" />
      </div>

      {/* Challenge */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-28 rounded-md" /> {/* title */}
        <Skeleton className="h-4 w-9/12 rounded-md" />
      </div>

      {/* Metrics to Influence */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-40 rounded-md" /> {/* title */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-4 w-52 rounded-md" />
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>
      </div>

      {/* Resources */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-28 rounded-md" /> {/* title */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-32 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
          <Skeleton className="h-8 w-36 rounded-md" />
          <Skeleton className="h-8 w-40 rounded-md" />
        </div>
      </div>

      {/* Deliverables */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-28 rounded-md" /> {/* title */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-44 rounded-md" />
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default ProjectSkeleton
