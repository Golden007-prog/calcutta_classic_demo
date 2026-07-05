import type { Metadata } from "next";

import { BudgetFinder, GroupCalculator } from "@/components/foodie/BudgetTools";
import { CompareDrawer } from "@/components/foodie/CompareDrawer";
import { CravingMatcher } from "@/components/foodie/CravingMatcher";
import {
  DailySpecial,
  DaypartBadge,
  FactsTicker,
  Glossary,
  SeasonalSpecial,
} from "@/components/foodie/DiscoverSections";
import { MenuTour } from "@/components/foodie/MenuTour";
import { MomoWheel } from "@/components/foodie/MomoWheel";
import { MoodQuiz } from "@/components/foodie/MoodQuiz";
import { KitchenStory, RecipeTeasers } from "@/components/foodie/StorySections";
import { WeatherBanner } from "@/components/WeatherBanner";

export const metadata: Metadata = {
  title: "Foodie Zone — quizzes, wheels & serious snack science",
  description:
    "Can't decide what to eat? Take the mood quiz, spin the momo wheel, match your cravings, or let the Budget Bite Finder plan your ₹150 like a strategist.",
};

export default function FoodieZonePage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-4 pb-6 pt-12 md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-soft">
          Serious tools for serious snacking
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
          The Foodie Zone
        </h1>
        <p className="mt-3 max-w-xl text-sm text-soft md:text-base">
          Indecision is a solvable problem. Below: one quiz, one wheel, four
          sliders and a budget algorithm — all trained on thirteen dishes.
        </p>
        <div className="mt-3">
          <DaypartBadge />
        </div>
      </header>

      {/* Live context: weather + today's specials */}
      <div className="mx-auto grid max-w-6xl gap-4 px-4 md:px-8">
        <WeatherBanner />
        <div className="grid gap-4 md:grid-cols-2">
          <DailySpecial />
          <SeasonalSpecial />
        </div>
      </div>

      {/* Decision engines */}
      <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 md:grid-cols-2 md:px-8">
        <MoodQuiz />
        <MomoWheel />
        <CravingMatcher />
        <div className="grid gap-6">
          <BudgetFinder />
        </div>
      </div>

      <div className="mx-auto mt-6 grid max-w-6xl gap-6 px-4 md:grid-cols-2 md:px-8">
        <GroupCalculator />
        <Glossary />
      </div>

      <div className="mx-auto mt-6 flex max-w-6xl justify-center px-4 md:px-8">
        <CompareDrawer />
      </div>

      <div className="mt-14">
        <FactsTicker />
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 md:px-8">
        <MenuTour />
        <KitchenStory />
        <RecipeTeasers />
      </div>
    </>
  );
}
