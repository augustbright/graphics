import { useAtomValue } from "jotai";
import { currentAngleAtom } from "../atoms/common";
import { Line } from "@react-three/drei";
import { TShape } from "../types";
import { calculateCentroid, calculateFlowPosition } from "../func/shape";

export const Flow = ({ shape }: { shape: TShape }) => {
  const angle = useAtomValue(currentAngleAtom);
  const flowPosition = calculateFlowPosition(shape, angle);
  const centroid = calculateCentroid(shape);
  if (!flowPosition) {
    return null;
  }

  return (
    <>
      <pointLight
        position={flowPosition.clone().add({ x: 0, y: 0, z: 1 })}
        intensity={10}
        color={"red"}
      />
      <mesh position={flowPosition}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>
      {centroid && (
        <>
          <mesh position={centroid}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshBasicMaterial color="red" />
          </mesh>
          <Line
            points={[flowPosition.toArray(), centroid.toArray()]}
            color="red"
          />
        </>
      )}
    </>
  );
};
