import clsx from "clsx";
import React, { useCallback, useEffect, useRef } from "react";
import { ModalProps } from "../types/modalWrapper";

const ModalWrapper: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleClickOutside, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-[90vh] flex items-center justify-center bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-80 z-100 rounded-lg">
      <div
        ref={modalRef}
        className={clsx(
          "relative p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg transition-all",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { ModalWrapper };
