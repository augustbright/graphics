import { getDefaultStore } from "jotai";
import { TVector3 } from "../types";
import {
  closestSideAtom,
  selectedPointIdAtom,
  shapeAtom,
} from "../atoms/common";

export const addPoint = (position: TVector3): string | null => {
  const id = crypto.randomUUID();
  const store = getDefaultStore();

  const { points } = store.get(shapeAtom);
  const closestSide = store.get(closestSideAtom);

  if (points.length < 2) {
    store.set(shapeAtom, (prev) => ({
      ...prev,
      points: [
        ...prev.points,
        {
          id,
          position,
        },
      ],
    }));
  } else {
    if (!closestSide) {
      return null;
    }
    store.set(shapeAtom, (prev) => {
      const index = prev.points.findIndex(
        (point) => point.id === closestSide[1].id
      );
      const next = [...prev.points];
      next.splice(index, 0, {
        id,
        position,
      });
      return {
        ...prev,
        points: next,
      };
    });
  }

  store.set(selectedPointIdAtom, id);

  return id;
};

export const deletePoint = (id: string) => {
  const store = getDefaultStore();
  store.set(shapeAtom, (prev) => ({
    ...prev,
    points: prev.points.filter((point) => point.id !== id),
  }));
};
