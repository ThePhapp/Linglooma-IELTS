import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// tránh xung đột css
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}