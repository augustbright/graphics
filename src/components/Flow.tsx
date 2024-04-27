import { useAtomValue } from "jotai";
import { centroidAtom, flowPositionAtom } from "../atoms/common";
import { Line } from "@react-three/drei";

export const Flow = () => {
  const flowPosition = useAtomValue(flowPositionAtom);
  const centroid = useAtomValue(centroidAtom);
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
