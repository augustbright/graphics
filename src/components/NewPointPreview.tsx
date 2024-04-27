import { useAtomValue } from "jotai";
import { planePointAtom } from "../atoms/common";
import { Line } from "@react-three/drei";
import { TShape } from "../types";
import { findClosestSide } from "../func/shape";

export const NewPointPreview = ({ shape }: { shape: TShape }) => {
  const planePoint = useAtomValue(planePointAtom);
  const closest = findClosestSide(shape, planePoint);
  if (!closest) {
    return null;
  }

  const [pointA, pointB, toPoint] = closest;

  return (
    <>
      <Line
        points={[
          [planePoint.x, planePoint.y, planePoint.z],
          [toPoint.x, toPoint.y, toPoint.z],
        ]}
        color="#666"
        lineWidth={1}
        dashed
        dashOffset={0}
        dashScale={10}
      />

      <Line
        points={[planePoint, pointA.position]}
        color="#666"
        lineWidth={1}
        dashOffset={0}
        dashScale={10}
      />

      <Line
        points={[planePoint, pointB.position]}
        color="#666"
        lineWidth={1}
        dashOffset={0}
        dashScale={10}
      />
    </>
  );
};
