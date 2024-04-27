import { TPoint, TShape } from "../types";
import { Vector3 } from "three";

export const withNewPoint = (shape: TShape, point: TPoint) => {
  const { points } = shape;
  const closestSide = findClosestSide(shape, point.position);

  if (points.length < 2) {
    return {
      ...shape,
      points: [...shape.points, point],
    };
  }

  if (!closestSide) {
    return null;
  }
  const index = shape.points.findIndex(
    (point) => point.id === closestSide[1].id
  );
  const next = [...shape.points];
  next.splice(index, 0, point);
  return {
    ...shape,
    points: next,
  };
};

export const findPointById = (shapes: TShape[], id: string | null) => {
  for (const shape of shapes) {
    const point = shape.points.find((point) => point.id === id);
    if (point) {
      return point;
    }
  }
  return null;
};

export const findClosestSide = (shape: TShape, position: Vector3) => {
  const { points } = shape;
  if (points.length < 2) {
    return null;
  }

  let closestSide = 0;
  let closestDistance = Infinity;

  for (let i = 0; i < points.length; i++) {
    const a = points[i].position;
    const b = points[(i + 1) % points.length].position;
    const side = new Vector3(b.x - a.x, b.y - a.y, b.z - a.z);
    const toPoint = new Vector3(
      position.x - a.x,
      position.y - a.y,
      position.z - a.z
    );
    const cross = new Vector3();

    const projection = new Vector3(position.x, position.y, position.z);
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

  const projection = new Vector3(position.x, position.y, position.z);
  const a = points[closestSide].position;
  const b = points[(closestSide + 1) % points.length].position;
  const side = new Vector3(b.x - a.x, b.y - a.y, b.z - a.z);

  const toPoint = new Vector3(
    position.x - a.x,
    position.y - a.y,
    position.z - a.z
  );
  const dot = toPoint.dot(side);
  projection.copy(a).add(side.multiplyScalar(dot / side.lengthSq()));

  return [
    points[closestSide],
    points[(closestSide + 1) % points.length],
    projection as Vector3,
  ] as const;
};

export const calculateShapeLengths = (shape: TShape) => {
  const { points } = shape;

  const result = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i].position;
    const b = points[(i + 1) % points.length].position;
    const side = new Vector3(b.x - a.x, b.y - a.y, b.z - a.z);
    result.push(side.length());
  }
  return result;
};

export const getFlowSegment = (shape: TShape, angle: number) => {
  const { points } = shape;
  if (points.length < 2) {
    return null;
  }
  const lengths = calculateShapeLengths(shape);
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
  const a = points[currentSegment];
  const b = points[(currentSegment + 1) % points.length];

  return {
    currentSegment,
    currentSegmentLength,
    totalLength,
    pointOnPath,
    currentSegmentPath,
    a,
    b,
  };
};

export const calculateFlowPosition = (shape: TShape, angle: number) => {
  const currentSegmentData = getFlowSegment(shape, angle);
  if (!currentSegmentData) {
    return null;
  }

  const { currentSegmentPath, a, b } = currentSegmentData;

  const side = new Vector3(
    b.position.x - a.position.x,
    b.position.y - a.position.y,
    b.position.z - a.position.z
  );
  const direction = side.clone().normalize();
  const position = a.position
    .clone()
    .add(direction.multiplyScalar(currentSegmentPath));

  return position;
};

export const calculateCurrentFlowPoint = (shape: TShape, angle: number) => {
  const currentSegmentData = getFlowSegment(shape, angle);
  if (!currentSegmentData) {
    return null;
  }
  return currentSegmentData.a;
};

export const calculateCentroid = (shape: TShape) => {
  const sum = new Vector3(0, 0, 0);

  shape.points.forEach(function (point) {
    sum.add(point.position);
  });

  return sum.divideScalar(shape.points.length);
};
