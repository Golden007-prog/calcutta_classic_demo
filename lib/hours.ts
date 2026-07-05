/**
 * Feature 41 — open/closed logic for 12:00–22:00 IST, every day.
 */
const IST_OFFSET_MINUTES = 330;
const OPEN = 12 * 60;
const CLOSE = 22 * 60;

export interface OpenStatus {
  open: boolean;
  /** Human line like "closes in 2h 10m" / "opens at 12 PM". */
  detail: string;
}

export function openStatus(date: Date = new Date()): OpenStatus {
  const istMinutes =
    (((date.getTime() / 60000 + IST_OFFSET_MINUTES) % (24 * 60)) + 24 * 60) %
    (24 * 60);

  if (istMinutes >= OPEN && istMinutes < CLOSE) {
    const left = CLOSE - istMinutes;
    const detail =
      left <= 60
        ? `closing in ${Math.round(left)} min — run!`
        : `open till 10 PM (${Math.floor(left / 60)}h ${Math.round(left % 60)}m left)`;
    return { open: true, detail };
  }

  const untilOpen = istMinutes < OPEN ? OPEN - istMinutes : 24 * 60 - istMinutes + OPEN;
  const detail =
    untilOpen <= 60
      ? `opens in ${Math.round(untilOpen)} min`
      : "opens 12 PM IST";
  return { open: false, detail };
}
