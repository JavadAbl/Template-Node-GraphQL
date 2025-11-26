export const DaisyUIColors = {
  neutral: "neutral",
  primary: "primary",
  secondary: "secondary",
  accent: "accent",
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
} as const;

export type DaisyUIColors = keyof typeof DaisyUIColors;
