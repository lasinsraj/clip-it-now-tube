
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GradientTextProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function GradientText({ children, className, ...props }: GradientTextProps) {
  return (
    <h1 
      className={cn(
        "bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent",
        className
      )} 
      {...props}
    >
      {children}
    </h1>
  );
}
