import { atom } from "jotai";
import { Vector3 } from "three";
import { TPoint, TShape, TVector3 } from "../types";
import { tVector3ToVector3 } from "../func/utils";

export const planePointAtom = atom<TVector3>(new Vector3());
export const roundPointAtom = atom((get) => {
  const point = get(planePointAtom);
  return {
    x: Math.round(point.x),
    y: Math.round(point.y),
    z: Math.round(point.z),
  };
});

export const shapeAtom = atom<TShape>([]);

export const hoveredPointIdAtom = atom<TPoint["id"] | null>(null);
export const grabPointIdAtom = atom<TPoint["id"] | null>(null);
export const selectedPointIdAtom = atom<TPoint["id"] | null>(null);

export const selectedPointAtom = atom<TPoint | null>((get) => {
  const selectedPointId = get(selectedPointIdAtom);
  return get(shapeAtom).find((point) => point.id === selectedPointId) || null;
});

export const grabPointAtom = atom<TPoint | null>((get) => {
  const grabPointId = get(grabPointIdAtom);
  return get(shapeAtom).find((point) => point.id === grabPointId) || null;
});

export const hoveredPointAtom = atom<TPoint | null>((get) => {
  const hoveredPointId = get(hoveredPointIdAtom);
  return get(shapeAtom).find((point) => point.id === hoveredPointId) || null;
});

export const closestSideAtom = atom<[TPoint, TPoint, Vector3] | null>((get) => {
  const shape = get(shapeAtom);
  if (shape.length < 2) {
    return null;
  }
  const point = get(planePointAtom);

  let closestSide = 0;
  let closestDistance = Infinity;

  for (let i = 0; i < shape.length; i++) {
    const a = shape[i];
    const b = shape[(i + 1) % shape.length];
    const side = new Vector3(b.x - a.x, b.y - a.y, b.z - a.z);
    const toPoint = new Vector3(point.x - a.x, point.y - a.y, point.z - a.z);
    const cross = new Vector3();

    const projection = new Vector3(point.x, point.y, point.z);
    const dot = toPoint.dot(side);
    projection.copy(a).add(side.multiplyScalar(dot / side.lengthSq()));

    const isProjectionWithinSide =
      projection.clone().sub(a).dot(projection.clone().sub(b)) <= 0;

    if (!isProjectionWithinSide) {
      continue;
    }

    cross.crossVectors(side, toPoint);
    const distance = cross.length() / side.length();
    if (distance < closestDistance) {
      closestSide = i;
      closestDistance = distance;
    }
  }

  if (closestDistance === Infinity) {
    return null;
  }

  const projection = new Vector3(point.x, point.y, point.z);
  const a = shape[closestSide];
  const b = shape[(closestSide + 1) % shape.length];
  const side = new Vector3(b.x - a.x, b.y - a.y, b.z - a.z);

  const toPoint = new Vector3(point.x - a.x, point.y - a.y, point.z - a.z);
  const dot = toPoint.dot(side);
  projection.copy(a).add(side.multiplyScalar(dot / side.lengthSq()));

  return [
    shape[closestSide],
    shape[(closestSide + 1) % shape.length],
    projection as Vector3,
  ];
});

export const flowEnabledAtom = atom<boolean>(false);
export const bpmAtom = atom<number>(20);
export const currentAngleAtom = atom<number>(45);

export const shapeLengthsAtom = atom<number[]>((get) => {
  const shape = get(shapeAtom);
  const result = [];
  for (let i = 0; i < shape.length; i++) {
    const a = shape[i];
    const b = shape[(i + 1) % shape.length];
    const side = new Vector3(b.x - a.x, b.y - a.y, b.z - a.z);
    result.push(side.length());
  }
  return result;
});

export const currentSegmentAtom = atom((get) => {
  const shape = get(shapeAtom);
  if (shape.length < 2) {
    return null;
  }
  const angle = get(currentAngleAtom);
  const lengths = get(shapeLengthsAtom);
  const totalLength = lengths.reduce((acc, cur) => acc + cur, 0);
  const pointOnPath = angle * (totalLength / 360);

  let currentSegment = 0;
  let currentSegmentLength = 0;

  for (let i = 0; i < lengths.length; i++) {
    if (currentSegmentLength + lengths[i] > pointOnPath) {
      currentSegment = i;
      break;
    }
    currentSegmentLength += lengths[i];
  }

  const currentSegmentPath = pointOnPath - currentSegmentLength;
  const pA = shape[currentSegment];
  const pB = shape[(currentSegment + 1) % shape.length];

  return {
    currentSegment,
    currentSegmentLength,
    totalLength,
    pointOnPath,
    currentSegmentPath,
    pA,
    pB,
  };
});

export const flowPositionAtom = atom<Vector3 | null>((get) => {
  const currentSegmentData = get(currentSegmentAtom);
  if (!currentSegmentData) {
    return null;
  }

  const { currentSegmentPath, pA, pB } = currentSegmentData;

  const a = tVector3ToVector3(pA);
  const b = tVector3ToVector3(pB);

  const side = new Vector3(b.x - a.x, b.y - a.y, b.z - a.z);
  const direction = side.clone().normalize();
  const position = a.clone().add(direction.multiplyScalar(currentSegmentPath));

  return position;
});

export const currentFlowPointAtom = atom<TPoint | null>((get) => {
  const segmentData = get(currentSegmentAtom);
  if (!segmentData) {
    return null;
  }

  const { pA } = segmentData;

  return pA;
});

export const soundEnabledAtom = atom<boolean>(false);
