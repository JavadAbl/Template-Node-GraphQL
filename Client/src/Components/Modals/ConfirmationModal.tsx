// src/components/ConfirmationModal.tsx

import React from "react";
import { Modal } from "./Modal";

// Define the specific props for the Confirmation Modal
export interface ConfirmationModalProps {
  /** If true, the modal is visible */
  isOpen: boolean;
  /** Function to call when the modal should close (e.g., on cancel) */
  onClose: () => void;
  /** Function to call when the user clicks the confirm button */
  onConfirm: () => void;
  /** The title of the confirmation dialog */
  title: string;
  /** The main message or description of the confirmation dialog */
  description: React.ReactNode;
  /** Text for the confirm button @default 'Confirm' */
  confirmText?: string;
  /** Text for the cancel button @default 'Cancel' */
  cancelText?: string;
  /** DaisyUI color for the confirm button @default 'primary' */
  confirmButtonColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  /** DaisyUI color for the cancel button @default 'ghost' */
  cancelButtonColor?: "ghost" | "neutral" | "error";
}

/**
 * A pre-styled modal component for confirmation dialogs.
 * It uses the base Modal component and provides a title, description, and two action buttons.
 */
export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonColor = "primary",
  cancelButtonColor = "ghost",
}) => {
  // This handler will call the onConfirm prop and then close the modal.
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      // We don't pass a footer prop, because we will build the action buttons
      // directly inside the Modal's children to have more control.
    >
      {/* The description is the main content of the modal body */}
      <p>{description}</p>

      {/* The action buttons are placed in the modal-action div */}
      <div className="modal-action">
        {/* The cancel/reject button */}
        <button className={`btn btn-${cancelButtonColor}`} onClick={onClose}>
          {cancelText}
        </button>

        {/* The accept/confirm button */}
        <button
          className={`btn btn-${confirmButtonColor}`}
          onClick={handleConfirm}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};
