import { getDefaultStore } from "jotai";
import {
  bpmAtom,
  currentAngleAtom,
  flowEnabledAtom,
  grabPointIdAtom,
  planePointAtom,
  shapesAtom,
} from "../atoms/common";

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

  const grabId = store.get(grabPointIdAtom);
  const planePoint = store.get(planePointAtom);

  if (grabId) {
    store.set(shapesAtom, (shapes) =>
      shapes.map((shape) => ({
        ...shape,
        points: shape.points.map((point) => {
          if (point.id === grabId) {
            return {
              ...point,
              position: planePoint,
            };
          }
          return point;
        }),
      }))
    );
  }
};

export const startLoop = async () => {
  if (started) {
    return;
  }
  started = true;
  runInALoop((delta) => {
    process(delta);
    return true;
  });
};

export const runInALoop = async (fn: (delta: number) => boolean) => {
  let last = performance.now();
  const frame = async () => {
    const now = performance.now();
    const delta = now - last;
    last = now;
    const goOn = fn(delta);

    if (goOn) {
      requestAnimationFrame(frame);
    }
  };
  requestAnimationFrame(frame);
};
