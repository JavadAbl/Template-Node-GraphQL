// src/components/Modal.tsx

import React, { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "../Buttons/Button";

// Props interface remains the same
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

/**
 * A customizable, accessible, and animated modal component.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = "",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);

  // --- Side Effects (No changes here) ---
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "";
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      }, 300); // Match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // --- Render Logic ---

  if (!shouldRender) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4",
  };

  // --- FIX IS HERE ---
  // The handler is now much simpler. It just calls onClose if the prop allows it.
  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <dialog
      className={`modal  ${isOpen ? "modal-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        ref={modalRef}
        className={`modal-box relative transition-all duration-300 ${sizeClasses[size]} ${className}`}
        tabIndex={-1}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between">
            {title && (
              <h3 id="modal-title" className="font-bold text-lg">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <IconButton
                icon={XMarkIcon}
                size="sm"
                color="ghost"
                onClick={onClose}
                aria-label="Close modal"
              />
            )}
          </div>
        )}
        <div className="py-4">{children}</div>
        {footer && <div className="modal-action">{footer}</div>}
      </div>

      {/* --- FIX IS HERE --- */}
      {/* We attach the onClick handler directly to the backdrop. */}
      {/* The <form> tag is kept for semantic consistency with DaisyUI's example. */}
      <form
        method="dialog"
        className="modal-backdrop"
        onClick={handleOverlayClick}
      >
        <button>close</button>
      </form>
    </dialog>
  );
};
