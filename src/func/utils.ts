export const getCirclePoints = (radius: number, segments: number) => {
  const points = Array.from({ length: segments }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
  }).concat([[radius, 0, 0]]) as [number, number, number][];
  return points;
};
