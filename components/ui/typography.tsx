import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function TypographyTitle({ children, className }: TypographyProps) {
  return (
    <h1 className={cn("text-4xl font-bold tracking-tight", className)}>
      {children}
    </h1>
  )
}

export function TypographySubtitle({ children, className }: TypographyProps) {
  return (
    <h2 className={cn("text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h2>
  )
}

export function TypographyParagraph({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-md leading-7", className)}>
      {children}
    </p>
  )
}

// Additional utility component for custom text sizes
interface TypographyTextProps extends TypographyProps {
  size?: "title" | "subtitle" | "paragraph"
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

export function TypographyText({
  children,
  className,
  size = "paragraph",
  as = "p"
}: TypographyTextProps) {
  const Component = as

  const sizeClasses = {
    title: "text-4xl font-bold tracking-tight",
    subtitle: "text-2xl font-semibold tracking-tight",
    paragraph: "text-md leading-7"
  }

  return (
    <Component className={cn(sizeClasses[size], className)}>
      {children}
    </Component>
  )
}
