import { getDefaultStore } from "jotai";
import {
  selectedPointIdAtom,
  selectedShapeAtom,
  shapesAtom,
} from "../atoms/common";
import { Vector3 } from "three";
import { findClosestSide, withNewPoint } from "./shape";

export const addPoint = (position: Vector3) => {
  const store = getDefaultStore();
  const selectedShape = store.get(selectedShapeAtom);

  if (
    !selectedShape ||
    (selectedShape.points.length > 1 &&
      !findClosestSide(selectedShape, position))
  ) {
    const id = crypto.randomUUID();
    store.set(shapesAtom, (shapes) => [
      ...shapes,
      {
        id: crypto.randomUUID(),
        points: [{ id, position }],
      },
    ]);

    store.set(selectedPointIdAtom, id);

    return;
  }

  store.set(shapesAtom, (shapes) =>
    shapes.map((shape) => {
      if (shape.id !== selectedShape.id) {
        return shape;
      }

      const id = crypto.randomUUID();
      const newShape = withNewPoint(shape, { id, position });
      if (!newShape) {
        return shape;
      }
      store.set(selectedPointIdAtom, id);
      return newShape;
    })
  );
};

export const deletePoint = (id: string) => {
  const store = getDefaultStore();
  store.set(shapesAtom, (shapes) =>
    shapes
      .map((shape) => ({
        ...shape,
        points: shape.points.filter((point) => point.id !== id),
      }))
      .filter((shape) => shape.points.length > 0)
  );
};
