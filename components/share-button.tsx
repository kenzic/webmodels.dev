"use client";

import { useId, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { copyProposalLink, SHARE_DATA, shareProposal, type ShareOutcome } from "@/lib/share";

export function ShareButton({ compact = false, variant = "primary", location }: { compact?: boolean; variant?: "primary" | "secondary"; location: "hero" | "closing" }) {
  const [outcome, setOutcome] = useState<ShareOutcome | null>(null);
  const [busy, setBusy] = useState(false);
  const inputId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const showFallback = outcome === "copy-required" || outcome === "manual";

  function environment() {
    return {
      share: typeof navigator.share === "function" ? navigator.share.bind(navigator) : undefined,
      writeText: navigator.clipboard?.writeText.bind(navigator.clipboard),
    };
  }

  function recordCompletedShare(result: ShareOutcome) {
    if (result === "shared" || result === "copied") {
      trackEvent("share_proposal_success", {
        method: result === "shared" ? "native" : "clipboard",
        link_location: location,
      });
    }
  }

  async function share() {
    if (busy) return;
    setBusy(true);
    // Start native sharing before any other work so the click's user activation is preserved.
    const sharing = shareProposal(environment());
    trackEvent("share_proposal_attempt", { link_location: location });
    const result = await sharing;
    setOutcome(result);
    recordCompletedShare(result);
    setBusy(false);
  }

  async function copyLink() {
    const result = await copyProposalLink(environment());
    setOutcome(result);
    recordCompletedShare(result);
  }

  return (
    <div className={`share-control${compact ? " share-control-compact" : ""}`}>
      <button ref={trigger} type="button" className={`button button-${variant}${compact ? " button-small" : ""}`} onClick={share} disabled={busy} aria-expanded={showFallback} aria-controls={showFallback ? `${inputId}-fallback` : undefined}>
        {busy ? "Opening share…" : compact ? "Share proposal" : "Share the proposal"}
        <span aria-hidden="true">↗</span>
      </button>
      <span className="share-status" role="status" aria-live="polite">
        {outcome === "copied" ? "Link copied. Pass it on." : outcome === "shared" ? "Thanks for sharing." : ""}
      </span>
      {showFallback ? (
        <div className="share-fallback" id={`${inputId}-fallback`} role="group" aria-label="Share proposal link">
          <label htmlFor={inputId}>{outcome === "manual" ? "Select and copy this link:" : "Copy the proposal link:"}</label>
          <input id={inputId} value={SHARE_DATA.url} readOnly onFocus={(event) => event.currentTarget.select()} />
          <div className="share-fallback-actions">
            <button type="button" onClick={copyLink}>Copy link</button>
            <button type="button" onClick={() => { setOutcome(null); trigger.current?.focus(); }}>Dismiss</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
