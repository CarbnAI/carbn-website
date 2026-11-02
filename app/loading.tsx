import { CarbnLogo } from "@/components/brand/carbn-logo";

export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <CarbnLogo
        form="mark"
        colorway="volt-on-dark"
        className="loading-mark h-8 w-auto"
        label="Loading"
      />
    </div>
  );
}
