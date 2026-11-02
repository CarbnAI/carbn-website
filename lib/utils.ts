import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the brand type scale so `text-h2` isn't mistaken for a colour.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-1",
        "display-2",
        "display-3",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "body-lg",
        "body",
        "body-sm",
        "ui",
        "label",
        "mono",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
