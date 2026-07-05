/**
 * Feature 6 — tiny fuzzy matcher with highlight ranges. Subsequence match
 * scored for word-start hits and consecutive runs; no dependency needed
 * for a 13-item menu.
 */
export interface FuzzyResult {
  score: number;
  /** [start, end) index pairs into the original text for <mark> spans. */
  ranges: Array<[number, number]>;
}

export function fuzzyMatch(query: string, text: string): FuzzyResult | null {
  const q = query.trim().toLowerCase();
  if (!q) return { score: 0, ranges: [] };
  const t = text.toLowerCase();

  let qi = 0;
  let score = 0;
  let streak = 0;
  const hits: number[] = [];

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      hits.push(ti);
      streak += 1;
      score += 1 + streak * 2; // consecutive runs compound
      if (ti === 0 || t[ti - 1] === " " || t[ti - 1] === "-") score += 6; // word starts
      qi++;
    } else {
      streak = 0;
    }
  }

  if (qi < q.length) return null; // not all query chars found

  // Collapse adjacent hits into ranges.
  const ranges: Array<[number, number]> = [];
  for (const h of hits) {
    const last = ranges[ranges.length - 1];
    if (last && last[1] === h) last[1] = h + 1;
    else ranges.push([h, h + 1]);
  }

  return { score, ranges };
}

/** Split text into plain/highlighted segments for rendering. */
export function segmentByRanges(
  text: string,
  ranges: Array<[number, number]>,
): Array<{ text: string; hit: boolean }> {
  if (ranges.length === 0) return [{ text, hit: false }];
  const segments: Array<{ text: string; hit: boolean }> = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (start > cursor) segments.push({ text: text.slice(cursor, start), hit: false });
    segments.push({ text: text.slice(start, end), hit: true });
    cursor = end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), hit: false });
  return segments;
}
