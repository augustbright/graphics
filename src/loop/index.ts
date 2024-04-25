import { getDefaultStore } from "jotai";
import { bpmAtom, currentAngleAtom, flowEnabledAtom } from "../atoms/common";

let started = false;

const store = getDefaultStore();

const process = (delta: number) => {
  const flowEnabled = store.get(flowEnabledAtom);
  if (flowEnabled) {
    const bpm = store.get(bpmAtom);
    const bps = bpm / 60;
    const bpms = bps / 1000;
    const dBeat = bpms * delta;
    const dAngle = dBeat * 360;

    store.set(currentAngleAtom, (prev) => (prev + dAngle) % 360);
  }
};

export const startLoop = async () => {
  if (started) {
    return;
  }
  started = true;
  let last = performance.now();
  const frame = async () => {
    const now = performance.now();
    const delta = now - last;
    last = now;
    process(delta);

    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};
