export const SHARE_DATA = {
  title: "Web Models API",
  text: "I'd love to see browsers support this. A website could request a specific open-weight model, and you'd decide whether to allow it. What do you think?",
  url: "https://webmodels.dev/",
};

type ShareEnvironment = {
  share?: (data: typeof SHARE_DATA) => Promise<void>;
  writeText?: (text: string) => Promise<void>;
};

export type ShareOutcome = "shared" | "copied" | "cancelled" | "copy-required" | "manual";

export async function copyProposalLink(environment: ShareEnvironment): Promise<ShareOutcome> {
  if (!environment.writeText) return "manual";
  try {
    await environment.writeText(SHARE_DATA.url);
    return "copied";
  } catch {
    return "manual";
  }
}

export async function shareProposal(environment: ShareEnvironment): Promise<ShareOutcome> {
  if (!environment.share) return copyProposalLink(environment);
  try {
    // Invoke immediately: Web Share needs the click's transient activation.
    await environment.share(SHARE_DATA);
    return "shared";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return "cancelled";
    // A failed native share may consume activation. Offer a fresh Copy click.
    return "copy-required";
  }
}
