"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

// TODO: rewrite
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="modal-backdrop">
      {open ? (
        <div className="modal">
          {children}
          <button onClick={onDismiss} className="close-button" />
        </div>
      ) : (
        <></>
      )}
    </div>,
    document.getElementById("overlay")!
  );
}
