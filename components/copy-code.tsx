"use client";

import { useState } from "react";

export function CopyCode({ code, label = "Copy JavaScript example" }: { code: string; label?: string }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied");
    } catch {
      setStatus("Select the code to copy it.");
    }
  }
  return (
    <div className="copy-control">
      <span role="status" aria-live="polite">{status}</span>
      <button type="button" onClick={copy} aria-label={label}>Copy <span aria-hidden="true">↗</span></button>
    </div>
  );
}
