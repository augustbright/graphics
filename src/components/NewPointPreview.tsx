import { useAtomValue } from "jotai";
import { closestSideAtom, planePointAtom } from "../atoms/common";
import { Line } from "@react-three/drei";

export const NewPointPreview = () => {
  const closest = useAtomValue(closestSideAtom);
  const planePoint = useAtomValue(planePointAtom);
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
