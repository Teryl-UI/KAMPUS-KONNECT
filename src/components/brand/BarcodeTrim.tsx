import React from "react";

interface BarcodeTrimProps {
  className?: string;
  height?: string;
}

export default function BarcodeTrim({ className = "", height = "h-5" }: BarcodeTrimProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden flex items-center select-none ${className}`}
    >
      <div className={`w-full ${height} barcode-stripe opacity-90`} />
    </div>
  );
}

