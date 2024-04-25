import { useAtomValue } from "jotai";
import { shapeAtom } from "../atoms/common";
import { ShapePoint } from "./ShapePoint";
import { Line } from "@react-three/drei";
import { useTween } from "../hooks/common";

export const Shape = () => {
  const shape = useAtomValue(shapeAtom);
  const offset = useTween({ start: 2, end: 0, time: 1 });

  return (
    <>
      {shape.map((point) => (
        <ShapePoint key={point.id} point={point} />
      ))}
      {shape.length > 1 && (
        <Line
          points={shape
            .map((point) => [point.x, point.y, point.z])
            .concat([shape[0].x, shape[0].y, shape[0].z])} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
          color="white" // Default
          lineWidth={2} // In pixels (default)
          // segments // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
          dashed
          dashOffset={offset}
        />
      )}
    </>
  );
};
