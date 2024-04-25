import { getDefaultStore } from "jotai";
import { TVector3 } from "../types";
import {
  closestSideAtom,
  selectedPointIdAtom,
  shapeAtom,
} from "../atoms/common";

export const addPoint = (vector: TVector3): string | null => {
  const id = crypto.randomUUID();
  const store = getDefaultStore();

  const shape = store.get(shapeAtom);
  const closestSide = store.get(closestSideAtom);

  if (shape.length < 2) {
    store.set(shapeAtom, (prev) => [
      ...prev,
      {
        id,
        ...vector,
      },
    ]);
  } else {
    if (!closestSide) {
      return null;
    }
    store.set(shapeAtom, (prev) => {
      const index = prev.findIndex((point) => point.id === closestSide[1].id);
      const next = [...prev];
      next.splice(index, 0, {
        id,
        ...vector,
      });
      return next;
    });
  }

  store.set(selectedPointIdAtom, id);

  return id;
};

export const deletePoint = (id: string) => {
  const store = getDefaultStore();
  store.set(shapeAtom, (prev) => prev.filter((point) => point.id !== id));
};
