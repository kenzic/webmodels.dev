import { sendGAEvent } from "@next/third-parties/google";

export function trackEvent(name: string, parameters: Record<string, string>) {
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;
  sendGAEvent("event", name, parameters);
}
