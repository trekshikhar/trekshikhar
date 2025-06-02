"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
}

export default function StarRating({ rating, onRatingChange, readonly = false, size = "md" }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value)
    }
  }

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoverRating || rating)
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            className={`${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"} transition-all duration-150 ${
              readonly ? "" : "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 rounded"
            }`}
          >
            <Star
              className={`${sizeClasses[size]} transition-colors duration-150 ${
                isActive
                  ? "text-green-600 fill-green-600"
                  : readonly
                    ? "text-gray-300"
                    : "text-gray-300 hover:text-green-400"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
