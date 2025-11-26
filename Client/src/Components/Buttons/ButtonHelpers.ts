export const ButtonVariants = {
  neutral: "btn-neutral",
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
} as const;
export type ButtonVariants = keyof typeof ButtonVariants;

export const ButtonSizes = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};
export type ButtonSizes = keyof typeof ButtonSizes;

export const ButtonIconSizes = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export type ButtonIconSizes = keyof typeof ButtonIconSizes;
