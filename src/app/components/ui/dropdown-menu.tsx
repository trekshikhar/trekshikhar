// /components/ui/dropdown-menu.tsx
/* eslint-disable */

import React, { ReactNode } from "react"

export const DropdownMenu = ({ children }: { children: ReactNode }) => <div>{children}</div>

export const DropdownMenuTrigger = ({ asChild = false, children }: { asChild?: boolean, children: ReactNode }) => (
  <div>{children}</div>
)

export const DropdownMenuContent = ({ children }: { children: ReactNode }) => (
  <div className="absolute mt-2 w-40 rounded-md border bg-white shadow-md z-50">{children}</div>
)

export const DropdownMenuItem = ({ children }: { children: ReactNode }) => (
  <div className="px-4 py-2 hover:bg-muted cursor-pointer">{children}</div>
)
