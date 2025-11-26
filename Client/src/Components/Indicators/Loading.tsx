import { type HTMLAttributes } from "react";
import { DaisyUIColors } from "../../Utils/DaisyUiUtils";

/* const DaisyUIColor = {
  Primary: "primary",
  Secondary: "secondary",
  Accent: "accent",
  Info: "info",
  Success: "success",
  Warning: "warning",
  Error: "error",
  Neutral: "neutral",
} as const; */

const DaisyUILoadingSize = {
  XS: "loading-xs",
  SM: "loading-sm",
  MD: "loading-md",
  LG: "loading-lg",
  XL: "loading-xl",
} as const;

const DaisyUILoaderType = {
  Spinner: "loading-spinner",
  Ring: "loading-ring",
  Dots: "loading-dots",
  Bars: "loading-bars",
  Infinity: "loading-infinity", // if installed via plugin or custom
} as const;

const TextSize = {
  XS: "text-xs",
  SM: "text-sm",
  Base: "text-base",
  LG: "text-lg",
  XL: "text-xl",
  XXL: "text-2xl",
} as const;

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  ringColor?: DaisyUIColors;
  textColor?: DaisyUIColors;
  size?: keyof typeof DaisyUILoadingSize;
  loaderType?: keyof typeof DaisyUILoaderType;
  textSize?: keyof typeof TextSize;
  className?: string;
}

export default function Loading({
  text = "در حال بارگذاری...",
  ringColor = DaisyUIColors.primary,
  textColor = DaisyUIColors.primary,
  size = "LG",
  loaderType = "Ring",
  textSize = "Base",
  className = "",
  ...rest
}: LoadingProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-screen gap-3 ${className}`}
      {...rest}
    >
      <span className={`loading ${loaderType} text-${ringColor} ${size}`} />
      <span className={`${textSize} font-medium text-${textColor}`}>
        {text}
      </span>
    </div>
  );
}
