"use client";

import { useMemo, useState } from "react";

import { Glass } from "@/components/ui/Glass";
import { groupOrder, planBudget, type Hunger } from "@/lib/recommend";
import { formatINR } from "@/lib/utils";

/** Feature 19 — Budget Bite Finder: "I have ₹___" → best combination. */
export function BudgetFinder() {
  const [budget, setBudget] = useState(150);
  const plan = useMemo(() => planBudget(budget), [budget]);

  return (
    <Glass variant="panel" className="p-6 md:p-8" id="budget">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Pocket physics</p>
      <h3 className="mt-1 font-display text-2xl font-semibold md:text-3xl">Budget Bite Finder</h3>

      <label className="mt-5 block">
        <span className="flex justify-between text-sm">
          <span>I have…</span>
          <span className="font-display text-lg font-semibold text-momo-gold tabular-nums">
            {formatINR(budget)}
          </span>
        </span>
        <input
          type="range"
          min={20}
          max={500}
          step={10}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="mt-2 w-full accent-momo-gold"
          aria-label="Budget in rupees"
        />
      </label>

      <div aria-live="polite" className="mt-5">
        {plan.picks.length === 0 ? (
          <p className="text-sm text-soft">
            Below ₹20 we can only offer directions and encouragement.
          </p>
        ) : (
          <>
            <ul className="space-y-2 text-sm">
              {plan.picks.map((pick) => (
                <li key={pick.label} className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2">
                  <span>
                    <span className="font-semibold text-momo-gold">{pick.qty} ×</span> {pick.label}
                    {pick.isCombo && (
                      <span className="ml-2 rounded-full bg-leaf/15 px-2 py-0.5 text-[11px] font-semibold text-leaf">
                        combo value
                      </span>
                    )}
                  </span>
                  <span className="tabular-nums text-soft">{formatINR(pick.price * pick.qty)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex justify-between text-sm">
              <span className="text-soft">
                {plan.remaining >= 20
                  ? `₹${plan.remaining} left — that's ${Math.floor(plan.remaining / 20)} more coffee${Math.floor(plan.remaining / 20) > 1 ? "s" : ""}.`
                  : plan.remaining > 0
                    ? `₹${plan.remaining} change for the bus home.`
                    : "Every rupee deployed. Respect."}
              </span>
              <span className="font-display font-semibold text-momo-gold">{formatINR(plan.total)}</span>
            </p>
          </>
        )}
      </div>
    </Glass>
  );
}

/** Features 20 + 30 — group snack calculator with hunger-level selector. */
export function GroupCalculator() {
  const [people, setPeople] = useState(4);
  const [hunger, setHunger] = useState<Hunger>("hungry");
  const suggestion = useMemo(() => groupOrder(people, hunger), [people, hunger]);

  const hungerOptions: Array<{ value: Hunger; label: string }> = [
    { value: "peckish", label: "😌 Peckish" },
    { value: "hungry", label: "😋 Hungry" },
    { value: "famished", label: "🫠 Famished" },
  ];

  return (
    <Glass variant="panel" className="p-6 md:p-8" id="group">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Adda arithmetic</p>
      <h3 className="mt-1 font-display text-2xl font-semibold md:text-3xl">Group snack calculator</h3>

      <label className="mt-5 block">
        <span className="flex justify-between text-sm">
          <span>How many mouths?</span>
          <span className="font-display text-lg font-semibold text-momo-gold tabular-nums">{people}</span>
        </span>
        <input
          type="range"
          min={1}
          max={10}
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          className="mt-2 w-full accent-momo-gold"
          aria-label="Number of people"
        />
      </label>

      <fieldset className="mt-4">
        <legend className="text-sm">Hunger level</legend>
        <div className="mt-2 flex gap-2">
          {hungerOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setHunger(option.value)}
              aria-pressed={hunger === option.value}
              className={`tap-target flex-1 rounded-full border px-3 py-2 text-sm transition-colors ${
                hunger === option.value
                  ? "border-momo-gold bg-momo-gold/15 text-momo-gold"
                  : "border-line text-foreground/75 hover:border-momo-gold/50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" className="mt-5">
        <ul className="space-y-1.5 text-sm">
          {suggestion.lines.map((line) => (
            <li key={line} className="border-b border-line/60 pb-1.5">{line}</li>
          ))}
        </ul>
        <p className="mt-3 flex items-baseline justify-between">
          <span className="text-sm italic text-soft">“{suggestion.note}”</span>
          <span className="font-display text-lg font-semibold text-momo-gold">
            ~{formatINR(suggestion.total)}
          </span>
        </p>
        <p className="mt-2 text-xs text-soft">
          Walk-in order — show this screen at the counter and look confident.
        </p>
      </div>
    </Glass>
  );
}
