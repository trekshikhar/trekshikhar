// /components/ui/button.tsx
/* eslint-disable */

import React from "react"
import Link from "next/link"
import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "ghost" | "outline" | "default"
  size?: "icon" | "default"
  asChild?: boolean
  className?: string
}

export const Button = ({
  children,
  variant = "default",
  size = "default",
  asChild = false,
  className = "",
  ...props
}: ButtonProps) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  const variants: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent hover:bg-gray-100",
    outline: "border border-gray-300 hover:bg-gray-100",
  }
  const sizes: Record<string, string> = {
    default: "h-10 px-4 py-2",
    icon: "h-10 w-10",
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (asChild) {
    return <Link className={classes} {...(props as any)}>{children}</Link>
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
