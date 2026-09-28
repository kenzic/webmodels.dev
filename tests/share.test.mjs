import assert from "node:assert/strict";
import test from "node:test";
import { copyProposalLink, SHARE_DATA, shareProposal } from "../lib/share.ts";

test("native sharing receives the canonical production URL immediately", async () => {
  let invoked = false;
  const pending = shareProposal({ share: async (data) => { invoked = true; assert.deepEqual(data, SHARE_DATA); } });
  assert.equal(invoked, true, "The native call must preserve the click's user activation.");
  assert.equal(await pending, "shared");
});

test("cancelling native sharing does not write to the clipboard", async () => {
  const outcome = await shareProposal({
    share: async () => { throw new DOMException("Cancelled", "AbortError"); },
    writeText: async () => assert.fail("A cancellation must not copy anything"),
  });
  assert.equal(outcome, "cancelled");
});

test("unavailable native sharing falls back to copying the link", async () => {
  let copied;
  assert.equal(await shareProposal({ writeText: async (text) => { copied = text; } }), "copied");
  assert.equal(copied, "https://webmodels.dev/");
});

test("failed native sharing offers a new user-activated copy action", async () => {
  const outcome = await shareProposal({
    share: async () => { throw new DOMException("Blocked", "NotAllowedError"); },
    writeText: async () => assert.fail("Native failure may consume transient activation"),
  });
  assert.equal(outcome, "copy-required");
});

test("clipboard denial makes the URL available for manual copying", async () => {
  assert.equal(await shareProposal({ writeText: async () => { throw new Error("Denied"); } }), "manual");
  assert.equal(await shareProposal({}), "manual");
});

test("explicit copy works after native sharing failed", async () => {
  let copied;
  assert.equal(await copyProposalLink({ writeText: async (text) => { copied = text; } }), "copied");
  assert.equal(copied, SHARE_DATA.url);
});
