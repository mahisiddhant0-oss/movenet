import { X } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(", ");

type ModalProps = {
  actions?: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export const Modal = ({
  actions,
  children,
  isOpen,
  onClose,
  title
}: ModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const onCloseRef = useRef(onClose);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements.at(-1);

      if (!firstFocusableElement || !lastFocusableElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusedElementRef.current?.focus();
      previousFocusedElementRef.current = null;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-5" role="presentation">
      <button
        aria-label="Close dialog"
        className="absolute inset-0 bg-movenet-forest/45 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <section
        aria-labelledby="modal-title"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg rounded-3xl border border-movenet-border bg-white p-6 shadow-2xl sm:p-8"
        ref={dialogRef}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-5">
          <h2 className="text-2xl font-bold tracking-tight text-movenet-text" id="modal-title">
            {title}
          </h2>
          <button
            aria-label="Close dialog"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-movenet-border text-movenet-muted transition hover:bg-movenet-mint hover:text-movenet-forest"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="mt-5 text-sm leading-7 text-movenet-muted">{children}</div>

        {actions ? <div className="mt-7 flex justify-end gap-3">{actions}</div> : null}
      </section>
    </div>
  );
};
