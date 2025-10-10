"use client";

import { useExpertReview } from "@/hooks/useReview";
import { Dot, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const Performance = () => {
  const [user, setUser] = useState<any>();
  const { review: expertReview, isLoading: reviewLoading } = useExpertReview(
    user?.id
  );
  const projectCount = 0; 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const ratingData = useMemo(() => {
    if (!expertReview?.data) {
      return {
        averageRating: 0,
        totalRatings: 0,
        ratings: [],
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const ratings = expertReview.data.ratings || [];
    const totalRatings = expertReview.data.totalRatings || 0;
    const averageRating = expertReview.data.averageScore || 0;

    // Calculate rating distribution
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratings.forEach((rating: any) => {
      const score = Math.round(rating.score);
      if (score >= 1 && score <= 5) {
        distribution[score as keyof typeof distribution]++;
      }
    });

    return {
      averageRating,
      totalRatings,
      ratings,
      ratingDistribution: distribution,
    };
  }, [expertReview]);

  // Calculate percentage for each star rating
  const getRatingPercentage = (starCount: number) => {
    if (ratingData.totalRatings === 0) return 0;
    return (
      (ratingData.ratingDistribution[
        starCount as keyof typeof ratingData.ratingDistribution
      ] /
        ratingData.totalRatings) *
      100
    );
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-[13.33px] h-[13.33px] ${
          index < Math.floor(rating)
            ? "text-[#F2BB05] fill-[#F6CF50]"
            : "text-[#CFD0D4] fill-[#E7ECEE]"
        }`}
      />
    ));
  };

  // Calculate performance metrics
  const performanceMetrics = useMemo(() => {
    const completedProjects = projectCount || 0;
    const averageDuration = projectCount * projectCount || "Not yet determined"; // This could be calculated from actual project data

    return {
      completedProjects,
      averageDuration,
      successRate: completedProjects > 0 ? "95%" : "0%", // Placeholder - could be calculated from actual data
      responseTime: "2 hours", // Placeholder
    };
  }, [projectCount]);

  if (reviewLoading) {
    return (
      <div className="w-full flex flex-col gap-4 lg:w-[919px]">
        <div className="flex w-full flex-col gap-6">
          <div className="page-heading flex flex-col gap-2">
            <span className="text-[#1A1A1A] font-bold text-2xl">
              Performance Score
            </span>
            <span className="text-[#1A1A1A] font-normal text-base">
              Loading performance data...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 lg:w-[919px]">
      <div className="flex w-full flex-col gap-6">
        <div className="page-heading flex flex-col gap-2">
          <span className="text-[#1A1A1A] font-bold text-2xl">
            Performance Score
          </span>
          <span className="text-[#1A1A1A] font-normal text-base">
            Here are opportunities for you.
          </span>
        </div>

        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Performance Stats */}
          <div className="bg-white border flex flex-col border-[#EFF2F3] rounded-3xl p-4 w-full lg:w-[324px]">
            <div className="flex flex-col gap-2 border-b border-[#EFF2F3] pb-4 mb-4">
              <span className="text-base text-[#878A93] font-medium">
                Projects Completed
              </span>
              <span className="font-bold text-[32px] text-[#121217]">
                {performanceMetrics.completedProjects}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base text-[#878A93] font-medium">
                Average Project Duration
              </span>
              <span className="font-bold text-[24px] text-[#121217]">
                {performanceMetrics.averageDuration}
              </span>
            </div>
          </div>

          {/* Rating Overview */}
          <div className="bg-white border border-[#EFF2F3] flex gap-6 rounded-3xl p-4 flex-1">
            <div className="flex flex-col">
              <span className="font-bold text-[84px] text-[#0E1426]">
                {ratingData.averageRating > 0
                  ? ratingData.averageRating.toFixed(1)
                  : "0.0"}
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  {renderStars(ratingData.averageRating)}
                </div>
                <span className="text-[#878A93] text-sm font-normal">
                  {ratingData.totalRatings} Client Review
                  {ratingData.totalRatings !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="flex flex-col gap-3 flex-1">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-1">
                  <div className="w-full lg:w-[245px] h-[6px] bg-[#F5F5F5] rounded-[4px]">
                    <div
                      className="h-[6px] bg-[#CCCCCC] rounded-[4px] transition-all duration-300"
                      style={{ width: `${getRatingPercentage(stars)}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-1 min-w-[100px]">
                    <div className="flex items-center gap-1">
                      {renderStars(stars)}
                    </div>
                    <span className="text-[#0E1426] text-sm font-normal">
                      {getRatingPercentage(stars).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="bg-white border border-[#D1DAEC80] rounded-3xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {ratingData.ratings.length > 0 ? (
            ratingData.ratings.map((review: any, index: number) => (
              <div
                key={review.id || index}
                className="bg-[#FBFCFC] rounded-[18px] p-4 flex flex-col gap-[10px]"
              >
                <div className="flex items-center gap-1">
                  {renderStars(review.score)}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Image
                      className="w-[22px] h-[22px] rounded-full border border-[#EFF2F3]"
                      src={"/images/dp.svg"}
                      width={22}
                      height={22}
                      alt="reviewer picture"
                    />
                    <span className="text-xs text-[#3E4351] font-medium">
                      {review.ratingBy || "Anonymous"}
                    </span>
                  </div>
                  <Dot className="text-[#CFD0D4] w-6 h-6" />
                  <span className="text-xs text-[#3E4351] font-normal">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span className="text-[#878A93] text-base font-normal">
                  {review.note || "No review text provided"}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <span className="text-[#878A93] text-lg">No reviews yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Performance;
