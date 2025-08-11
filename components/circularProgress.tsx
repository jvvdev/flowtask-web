interface CircularProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
}

export function CircularProgress({ progress, size = 20, strokeWidth = 2 }: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <div className="relative group inline-flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgb(75 85 99)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="opacity-30"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgb(34 197 94)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-in-out"
                />
            </svg>

            <span className="hidden absolute -top-8 group-hover:flex text-xs font-semibold p-1 dark:text-zinc-200 border bg-zinc-50 dark:bg-zinc-900 rounded-md">
                {progress} <span className="text-zinc-600 dark:text-zinc-400">%</span>
            </span>
        </div>
    )
}