import type { ReactNode } from "react";

type Props = {
  label: ReactNode;
  className?: string;
  minHeight?: string;
};

export function PlaceholderSlot({
  label,
  className = "",
  minHeight = "min-h-[200px]",
}: Props) {
  return (
    <div
      className={`placeholder-slot flex items-center justify-center rounded-xl ${minHeight} px-4 py-6 text-center text-sm ${className}`}
    >
      <span className="font-medium text-gray-500">{label}</span>
    </div>
  );
}
