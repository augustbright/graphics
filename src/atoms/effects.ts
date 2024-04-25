import { atom } from "jotai";
import { atomEffect } from "jotai-effect";
import { currentFlowPointAtom, soundEnabledAtom } from "./common";
import { Synth } from "tone";

const synth = new Synth().toDestination();

export const effectsAtom = atom((get) => {
  get(currentFlowPointChangeEffect);
});

const currentFlowPointChangeEffect = atomEffect((get) => {
  const soundEnabled = get(soundEnabledAtom);
  get(currentFlowPointAtom);
  if (!soundEnabled) {
    return;
  }
  synth.triggerAttackRelease("C4", "8n");
});
