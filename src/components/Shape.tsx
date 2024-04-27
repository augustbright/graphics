import { useAtomValue } from "jotai";
import { shapeAtom } from "../atoms/common";
import { ShapePoint } from "./ShapePoint";
import { Line } from "@react-three/drei";
import { useTween } from "../hooks/common";

export const Shape = () => {
  const { points } = useAtomValue(shapeAtom);
  const offset = useTween({ start: 2, end: 0, time: 1 });

  return (
    <>
      {points.map((point) => (
        <ShapePoint key={point.id} point={point} />
      ))}
      {points.length > 1 && (
        <Line
          points={points
            .map((point) => point.position)
            .concat(points[0].position)}
          color="white"
          lineWidth={2}
          dashed
          dashOffset={offset}
        />
      )}
    </>
  );
};
