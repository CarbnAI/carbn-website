import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

// §4.1 / §4.2: radius 0, 1.5px border, 44px min height. Hover slides 4px up and
// right to reveal a solid shadow; pressing returns it flush. No colour change.
const buttonVariants = cva(
  [
    "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap border-[1.5px] px-4 py-3 md:px-5",
    "text-[16px] leading-[1.2] font-bold font-stretch-[87%] select-none",
    // The shadow sits at zero offset behind the button and extrudes to -4px 4px
    // as the button slides, so the lift reads as depth rather than a jump.
    "transition-[translate,box-shadow] duration-200 ease-carbn active:duration-100",
    "hover:translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0",
    "[&_.lucide-arrow-right]:transition-[translate] [&_.lucide-arrow-right]:duration-200 [&_.lucide-arrow-right]:ease-carbn hover:[&_.lucide-arrow-right]:translate-x-0.5",
    "disabled:pointer-events-none disabled:border-graphite-700 disabled:bg-graphite-900 disabled:text-graphite-500",
    "[&_svg]:size-[18px] [&_svg]:shrink-0 [&_svg]:stroke-[1.5]",
  ],
  {
    variants: {
      variant: {
        primary:
          "border-volt bg-volt text-graphite-950 shadow-flat hover:shadow-hard active:shadow-flat",
        secondary:
          "border-graphite-50 bg-transparent text-graphite-50 shadow-flat hover:shadow-hard active:shadow-flat",
        // For use on a Volt field, where the light-background rules apply.
        ink: "border-graphite-950 bg-graphite-950 text-graphite-50 shadow-flat-ink hover:shadow-hard-ink active:shadow-flat-ink",
        "ink-outline":
          "border-graphite-950 bg-transparent text-graphite-950 shadow-flat-ink hover:shadow-hard-ink active:shadow-flat-ink",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant }), className)} {...props} />
  );
}

export { buttonVariants };
