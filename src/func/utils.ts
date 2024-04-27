import { Vector3 } from "three";

export const getCirclePoints = (radius: number, segments: number) => {
  const points = Array.from({ length: segments }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
  }).concat([[radius, 0, 0]]) as [number, number, number][];
  return points;
};

export const calculateCentroid = (vectors: Vector3[]) => {
  const sum = new Vector3(0, 0, 0);

  vectors.forEach(function (vector) {
    sum.add(vector);
  });

  return sum.divideScalar(vectors.length);
};
