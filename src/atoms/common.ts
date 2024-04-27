import { atom } from "jotai";
import { Vector3 } from "three";
import { TPoint, TShape, TVector3 } from "../types";
import { findPointById } from "../func/shape";

export const planePointAtom = atom<TVector3>(new Vector3());

export const shapesAtom = atom<TShape[]>([
  {
    id: "1",
    points: [
      { id: "1", position: new Vector3(0, 0, 0) },
      { id: "2", position: new Vector3(0, 1, 0) },
      { id: "3", position: new Vector3(1, 1, 0) },
      { id: "4", position: new Vector3(1, 0, 0) },
    ],
  },
]);

export const selectedShapeAtom = atom<TShape | null>((get) => {
  const selectedPointId = get(selectedPointIdAtom);
  return (
    get(shapesAtom).find((shape) =>
      shape.points.some((point) => point.id === selectedPointId)
    ) || null
  );
});

export const hoveredPointIdAtom = atom<TPoint["id"] | null>(null);
export const grabPointIdAtom = atom<TPoint["id"] | null>(null);
export const selectedPointIdAtom = atom<TPoint["id"] | null>(null);

export const selectedPointAtom = atom<TPoint | null>((get) =>
  findPointById(get(shapesAtom), get(selectedPointIdAtom))
);

export const grabPointAtom = atom<TPoint | null>((get) =>
  findPointById(get(shapesAtom), get(grabPointIdAtom))
);

export const hoveredPointAtom = atom<TPoint | null>((get) =>
  findPointById(get(shapesAtom), get(hoveredPointIdAtom))
);

export const flowEnabledAtom = atom<boolean>(false);
export const bpmAtom = atom<number>(20);
export const currentAngleAtom = atom<number>(45);

export const soundEnabledAtom = atom<boolean>(false);
