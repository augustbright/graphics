import { useAtomValue } from "jotai";
import { grabPointIdAtom, selectedPointAtom } from "../atoms/common";
import { Billboard, Line } from "@react-three/drei";
import { getCirclePoints } from "../func/utils";
import { useTween } from "../hooks/common";

export const PointSelection = () => {
  const point = useAtomValue(selectedPointAtom);
  const grabId = useAtomValue(grabPointIdAtom);
  const offset = useTween({ start: 0, end: 2, time: 1 });

  if (!point) {
    return null;
  }
  const isGrabbed = grabId === point.id;

  return (
    <Billboard position={[point.x, point.y, point.z]}>
      <Line
        points={getCirclePoints(1, 16)}
        lineWidth={0.5}
        color={isGrabbed ? "yellow" : "white"}
        dashed
        dashOffset={offset}
      />
    </Billboard>
  );
};
