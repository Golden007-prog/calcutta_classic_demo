"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Feature 85 — UI sounds, OFF by default, toggled in the footer. */
interface SoundState {
  enabled: boolean;
  toggle: () => void;
}

export const useSound = create<SoundState>()(
  persist(
    (set) => ({
      enabled: false,
      toggle: () => set((s) => ({ enabled: !s.enabled })),
    }),
    { name: "cc-sound" },
  ),
);

let ctx: AudioContext | undefined;

function audioContext(): AudioContext | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    ctx ??= new AudioContext();
    return ctx;
  } catch {
    return undefined;
  }
}

/** Short filtered-noise sizzle (wheel spin). */
export function playSizzle() {
  if (!useSound.getState().enabled) return;
  const ac = audioContext();
  if (!ac) return;

  const duration = 0.7;
  const buffer = ac.createBuffer(1, ac.sampleRate * duration, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 1.6;
  }

  const source = ac.createBufferSource();
  source.buffer = buffer;
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 5200;
  filter.Q.value = 0.8;
  const gain = ac.createGain();
  gain.gain.value = 0.11;

  source.connect(filter).connect(gain).connect(ac.destination);
  source.start();
}

/** Soft pop (favorites). */
export function playPop() {
  if (!useSound.getState().enabled) return;
  const ac = audioContext();
  if (!ac) return;

  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(520, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(180, ac.currentTime + 0.12);
  gain.gain.setValueAtTime(0.12, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.14);
  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.15);
}
