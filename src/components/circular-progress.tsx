'use client';

import React from 'react';

export default function CircularProgress({ percentage }: { percentage: number }) {
    // Ensure percentage is a valid number, default to 0 if invalid
    const validPercentage = Number(percentage) || 0;
    const clampedPercentage = Math.min(100, Math.max(0, validPercentage));
    
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

    const getColor = () => {
        if (clampedPercentage < 40) return '#EF4444';
        if (clampedPercentage < 60) return '#F97316';
        if (clampedPercentage < 80) return '#FACC15';
        return '#22C55E';
    };

    return (
        <div className="flex items-center justify-center">
            <svg height={radius * 2} width={radius * 2}>
                <circle
                    stroke="#D1D5DB"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={getColor()}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference + ' ' + circumference}
                    strokeDashoffset={strokeDashoffset || 0} // Fallback to 0
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    transform={`rotate(-90 ${radius} ${radius})`}
                />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#1E293B"
                    fontWeight="bold"
                >
                    {clampedPercentage}%
                </text>
            </svg>
        </div>
    );
}