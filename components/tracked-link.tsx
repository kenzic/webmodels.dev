"use client";

import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = Omit<ComponentProps<"a">, "onClick"> & {
  eventName: "read_proposal_click" | "comment_link_click";
  location: "header" | "hero" | "principles" | "closing" | "footer";
};

export function TrackedLink({ eventName, location, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={() => trackEvent(eventName, { link_location: location })}
    />
  );
}
