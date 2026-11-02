import * as React from "react";
import { cn } from "@/lib/utils";

// §4.1 form inputs: 44px min height, 1.5px Graphite 400 border on dark, 16px text
// (stops iOS zooming on focus), label above at 14px / 500 / Graphite 300.
const control =
  "block w-full min-h-11 border-[1.5px] border-graphite-400 bg-graphite-950 px-3 py-2.5 text-[16px] text-graphite-50 placeholder:text-graphite-400 transition-[border-color] duration-200 ease-carbn hover:border-graphite-300 focus-visible:border-graphite-50 aria-[invalid=true]:border-fault-dark";

export function Field({
  id,
  label,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[14px] font-medium text-graphite-300"
      >
        {label}
        {required ? (
          <span className="text-graphite-400"> (required)</span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p className="mt-2 text-[13px] text-graphite-300">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, "resize-y", className)} {...props} />;
}
