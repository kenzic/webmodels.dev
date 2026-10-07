"use client";

import { useEffect, useRef } from "react";
import { createQrShortcut } from "@/lib/qr-shortcut";
import { QR_CODE_URL } from "@/lib/site";

/**
 * QR code for QR_CODE_URL, drawn on a 25 × 25 module grid with a 4-module
 * quiet zone. Regenerate the path if the URL changes:
 * `npx qrcode -t svg -e M -q 0 "<url>"`.
 */
function QrCode() {
  return (
    <svg className="qr-code" viewBox="-4 -4 33 33" shapeRendering="crispEdges" role="img" aria-label={`QR code linking to ${QR_CODE_URL}`}>
      <rect x="-4" y="-4" width="33" height="33" fill="#fff" />
      <path
        stroke="currentColor"
        d="M0 0.5h7m3 0h2m4 0h1m1 0h7M0 1.5h1m5 0h1m7 0h3m1 0h1m5 0h1M0 2.5h1m1 0h3m1 0h1m1 0h1m1 0h2m4 0h1m1 0h1m1 0h3m1 0h1M0 3.5h1m1 0h3m1 0h1m1 0h2m3 0h2m3 0h1m1 0h3m1 0h1M0 4.5h1m1 0h3m1 0h1m1 0h2m1 0h1m4 0h1m1 0h1m1 0h3m1 0h1M0 5.5h1m5 0h1m1 0h1m1 0h3m1 0h3m1 0h1m5 0h1M0 6.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M8 7.5h5m1 0h3M0 8.5h1m1 0h5m3 0h5m3 0h5M1 9.5h3m3 0h2m2 0h3m2 0h2m1 0h1m3 0h1M1 10.5h3m1 0h2m4 0h1m2 0h2m1 0h5m1 0h2M1 11.5h3m1 0h1m2 0h3m1 0h1m4 0h1m1 0h1m4 0h1M1 12.5h1m3 0h2m1 0h2m2 0h4m1 0h4m1 0h3M0 13.5h3m2 0h1m3 0h2m3 0h1m1 0h2m1 0h1m1 0h1m1 0h1M0 14.5h1m1 0h5m1 0h1m1 0h4m1 0h7m1 0h2M0 15.5h1m1 0h1m4 0h1m3 0h1m2 0h4m1 0h2m3 0h1M0 16.5h1m1 0h2m1 0h2m1 0h2m1 0h3m1 0h6m1 0h1M8 17.5h2m2 0h2m1 0h2m3 0h2M0 18.5h7m5 0h3m1 0h1m1 0h1m1 0h1m1 0h3M0 19.5h1m5 0h1m1 0h1m2 0h1m4 0h1m3 0h2m1 0h2M0 20.5h1m1 0h3m1 0h1m1 0h3m2 0h8m1 0h1M0 21.5h1m1 0h3m1 0h1m1 0h4m4 0h1m1 0h1m1 0h5M0 22.5h1m1 0h3m1 0h1m1 0h1m1 0h1m3 0h1m6 0h2m1 0h1M0 23.5h1m5 0h1m9 0h2m1 0h3m2 0h1M0 24.5h7m1 0h1m3 0h3m4 0h6"
      />
    </svg>
  );
}

function isEditable(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select") !== null);
}

/** Opens a QR code for the site when someone types "q" then "r" within two seconds. */
export function QrCodeDialog() {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const matches = createQrShortcut();

    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat || event.isComposing || event.ctrlKey || event.metaKey || event.altKey || isEditable(event.target)) return;
      if (matches(event.key, event.timeStamp) && dialog.current && !dialog.current.open) dialog.current.showModal();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    // A click whose target is the dialog itself landed on the backdrop.
    <dialog ref={dialog} className="qr-dialog" aria-labelledby="qr-dialog-title" onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <div className="qr-dialog-body">
        <div className="qr-dialog-header">
          <h2 id="qr-dialog-title" className="mono-label">SCAN TO VISIT</h2>
          <form method="dialog"><button type="submit" className="qr-dialog-close" aria-label="Close">×</button></form>
        </div>
        <QrCode />
        <a className="qr-dialog-link" href={QR_CODE_URL}>{QR_CODE_URL.replace("https://", "")}</a>
      </div>
    </dialog>
  );
}
