"use client"

import { Skeleton } from "@/components/ui/skeleton"

const TaskDeliverableSkeleton = () => {
  return (
    <div className="w-[500px] bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
      {/* Header */}
      <Skeleton className="h-6 w-56 rounded-md mx-auto" />

      {/* Task deliverables title */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-40 rounded-md" /> {/* label */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* input */}
      </div>

      {/* Task deliverables description */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-60 rounded-md" /> {/* label */}
        <Skeleton className="h-24 w-full rounded-md" /> {/* textarea */}
      </div>

      {/* Task link */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-28 rounded-md" /> {/* label */}
        <Skeleton className="h-9 w-32 rounded-md" /> {/* + Add task link */}
      </div>

      {/* Task document */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-36 rounded-md" /> {/* label */}
        <Skeleton className="h-9 w-40 rounded-md" /> {/* + Add task document */}
      </div>

      {/* Save task button */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
    </div>
  )
}

export default TaskDeliverableSkeleton
