import React from "react";

type InputSize = "sm" | "md" | "lg";
type InputVariant = "input" | "textarea";

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    error?: string;
    size?: InputSize;
    variant?: InputVariant;
    containerClassName?: string;
}

export const sizeStyles: Record<InputSize, string> = {
    sm: "h-8 px-2 text-sm rounded-md",
    md: "h-10 px-3 text-sm rounded-lg",
    lg: "h-12 px-4 text-base rounded-xl",
};

export type FormState = {
  tokenAddress: string;
  recipients: string;
  amounts: string;
};

export type LabelElementProps = {
  label: string;
  value: string | number;
};