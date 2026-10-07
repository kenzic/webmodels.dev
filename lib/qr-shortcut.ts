export const QR_SHORTCUT_WINDOW_MS = 2000;

/**
 * Returns a key handler that reports true when "q" is followed by "r" within
 * the window. Named keys such as Shift are ignored; any other character breaks
 * the sequence.
 */
export function createQrShortcut(windowMs = QR_SHORTCUT_WINDOW_MS) {
  let pressedQAt: number | null = null;

  return (key: string, timestamp: number) => {
    if (key.length !== 1) return false;
    const character = key.toLowerCase();
    if (character === "r" && pressedQAt !== null && timestamp - pressedQAt <= windowMs) {
      pressedQAt = null;
      return true;
    }
    pressedQAt = character === "q" ? timestamp : null;
    return false;
  };
}
