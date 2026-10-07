import assert from "node:assert/strict";
import test from "node:test";
import { createQrShortcut, QR_SHORTCUT_WINDOW_MS } from "../lib/qr-shortcut.ts";

test("q then r within the window matches", () => {
  const matches = createQrShortcut();
  assert.equal(matches("q", 0), false);
  assert.equal(matches("r", QR_SHORTCUT_WINDOW_MS), true);
});

test("r after the window has passed does not match", () => {
  const matches = createQrShortcut();
  matches("q", 0);
  assert.equal(matches("r", QR_SHORTCUT_WINDOW_MS + 1), false);
});

test("r on its own or before q does not match", () => {
  const matches = createQrShortcut();
  assert.equal(matches("r", 0), false);
  assert.equal(matches("q", 100), false);
});

test("another character between q and r breaks the sequence", () => {
  const matches = createQrShortcut();
  matches("q", 0);
  matches("x", 100);
  assert.equal(matches("r", 200), false);
});

test("named keys such as Shift do not break the sequence, and case is ignored", () => {
  const matches = createQrShortcut();
  matches("Shift", 0);
  matches("Q", 50);
  matches("Shift", 100);
  assert.equal(matches("R", 150), true);
});

test("a match is consumed, so a second r needs a fresh q", () => {
  const matches = createQrShortcut();
  matches("q", 0);
  assert.equal(matches("r", 100), true);
  assert.equal(matches("r", 200), false);
});

test("pressing q again restarts the window", () => {
  const matches = createQrShortcut();
  matches("q", 0);
  matches("q", 1500);
  assert.equal(matches("r", 3000), true);
});
