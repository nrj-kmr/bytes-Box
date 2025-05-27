import React from "react";
import {
  LucideProps,
} from "lucide-react";

export const Icon = ({ 
  icon: LucideIcon, 
  className, 
  size = 18,
  ...props 
}: { 
  icon: React.ElementType<LucideProps>,
  className?: string,
  size?: number | string
  [key: string]: any
}) => {
  return (
    <LucideIcon
      size={size}
      className={className}
      strokeWidth={1.5}
      {...props}
    />
  );
};