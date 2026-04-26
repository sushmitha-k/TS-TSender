"use client";

import { forwardRef } from "react";
import clsx from "clsx";
import { InputFieldProps, sizeStyles } from "../types";

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            label,
            error,
            size = "md",
            className,
            containerClassName,
            id,
            variant = "input",
            ...props
        },
        ref
    ) => {
        return (
            <div className={clsx("w-full", containerClassName)}>

                {/* Label */}
                {label && (
                    <label
                        htmlFor={id}
                        className="mb-1 block text-sm font-medium text-zinc-700"
                    >
                        {label}
                    </label>
                )}

                {/* Input */}
                {variant === "textarea" ? (
                    <input
                        ref={ref}
                        id={id}
                        className={clsx(
                            "w-full border bg-white outline-none transition-all",
                            "border-zinc-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
                            "placeholder:text-zinc-400",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            sizeStyles[size],
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                            className
                        )}
                        {...props}
                    />) : (
                    <input
                        className="w-full border rounded-lg px-3 py-2"
                        {...props}
                    />
                )}

                {/* Error */}
                {error && (
                    <p className="mt-1 text-xs text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

InputField.displayName = "InputField";