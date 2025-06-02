// components/ui/card.tsx
/* eslint-disable */

import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`rounded-2xl  bg-white text-black shadow ${className}`} {...props} />
))
Card.displayName = "Card"

const CardHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pb-3 ${className}`} {...props} />
)
CardHeader.displayName = "CardHeader"

const CardTitle = ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`} {...props} />
)
CardTitle.displayName = "CardTitle"

const CardDescription = ({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props} />
)
CardDescription.displayName = "CardDescription"

const CardContent = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`} {...props} />
)
CardContent.displayName = "CardContent"

const CardFooter = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
)
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}
