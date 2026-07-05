/**
 * Feature 21 — the Momo-Meter's "live-ish" seeded formula.
 * Deterministic for any timestamp (no real telemetry): steady steaming
 * rate through the 12:00–22:00 IST day with lunch/evening rushes and a
 * daily seeded wobble, so the number feels alive but is reproducible.
 */

const IST_OFFSET_MINUTES = 330;
const OPEN_MINUTE = 12 * 60;
const CLOSE_MINUTE = 22 * 60;

/** Deterministic pseudo-random in [0,1) from an integer seed. */
function seeded(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function istParts(date: Date): { dayKey: number; minuteOfDay: number } {
  const utcMinutes = date.getTime() / 60000;
  const istMinutes = utcMinutes + IST_OFFSET_MINUTES;
  const dayKey = Math.floor(istMinutes / (24 * 60));
  const minuteOfDay = Math.floor(istMinutes % (24 * 60));
  return { dayKey, minuteOfDay };
}

/** Momos-per-minute at a given IST minute — lunch and evening rushes. */
function rateAt(minuteOfDay: number, dayKey: number): number {
  const hour = minuteOfDay / 60;
  let rate = 1.6; // baseline plates keep the steamer honest
  if (hour >= 12.5 && hour < 14.5) rate = 3.2; // lunch rush
  if (hour >= 17 && hour < 21) rate = 4.1; // the Shyambazar evening
  const weekday = (dayKey + 4) % 7; // 1970-01-01 was a Thursday
  if (weekday === 0 || weekday === 6) rate *= 1.35; // weekend boost
  return rate;
}

export interface MomoMeterReading {
  count: number;
  isSteaming: boolean;
}

export function momoMeter(date: Date = new Date()): MomoMeterReading {
  const { dayKey, minuteOfDay } = istParts(date);

  // Before opening, show yesterday's final count.
  if (minuteOfDay < OPEN_MINUTE) {
    return { count: totalForDay(dayKey - 1), isSteaming: false };
  }

  const end = Math.min(minuteOfDay, CLOSE_MINUTE);
  let count = 0;
  for (let m = OPEN_MINUTE; m < end; m++) {
    count += rateAt(m, dayKey);
  }
  count *= 0.92 + seeded(dayKey) * 0.16; // daily wobble ±8%

  return {
    count: Math.floor(count),
    isSteaming: minuteOfDay < CLOSE_MINUTE,
  };
}

function totalForDay(dayKey: number): number {
  let count = 0;
  for (let m = OPEN_MINUTE; m < CLOSE_MINUTE; m++) count += rateAt(m, dayKey);
  return Math.floor(count * (0.92 + seeded(dayKey) * 0.16));
}
