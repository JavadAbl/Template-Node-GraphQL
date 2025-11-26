import React from "react";
import clsx from "clsx";
import { ButtonIconSizes, ButtonSizes, ButtonVariants } from "./ButtonHelpers";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: IconComponent;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: ButtonVariants;
  textClassName?: string;
  iconClassName?: string;
}

export default function Button({
  text,
  icon: Icon,
  size = "md",
  variant,
  iconClassName = "",
  textClassName = "",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "btn",
        variant && ButtonVariants[variant],
        ButtonSizes[size],
        className
      )}
      {...rest}
    >
      {Icon && <Icon className={clsx(ButtonIconSizes[size], iconClassName)} />}
      {text && <span className={clsx("ml-0", textClassName)}>{text}</span>}
    </button>
  );
}
